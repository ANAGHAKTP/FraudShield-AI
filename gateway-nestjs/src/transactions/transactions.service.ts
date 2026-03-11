import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { PredictionService } from '../services/prediction.service';

@Injectable()
export class TransactionsService {
    private readonly logger = new Logger(TransactionsService.name);

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly predictionService: PredictionService
    ) { }

    async processTransaction(userId: number, transactionDto: any) {
        const supabase = this.supabaseService.getClient();

        // 1. Store transaction in Supabase
        const { data: txData, error: txError } = await supabase
            .from('Transactions')
            .insert([
                {
                    user_id: userId,
                    amount: transactionDto.amount,
                    merchant: transactionDto.merchant,
                    location: transactionDto.location,
                    device: transactionDto.device,
                },
            ])
            .select()
            .single();

        if (txError) {
            this.logger.error('Failed to insert transaction', txError);
            throw new InternalServerErrorException('Database error handling transaction');
        }

        // 2. Mock 29 features for FastAPI since we lack a real encoder (As per Option A strategy bypass)
        // In production, these 4 fields (Amount, merchant, etc) would be scaled into PCA components.
        const dummyFeatures = [
            transactionDto.amount, -0.072781, 2.536347, 1.378155, -0.338321, 0.462388,
            0.239599, 0.098698, 0.363787, 0.090794, -0.5516, -0.6178, -0.9913,
            -0.3111, 1.4681, -0.4704, 0.2079, 0.0257, 0.4039, 0.2514, -0.0183,
            0.2778, -0.1104, 0.0669, 0.1285, -0.1891, 0.1335, -0.0210, 0.4967
        ];

        // 3. Send features to FastAPI & Receive Fraud Prediction
        let predictionResult;
        try {
            predictionResult = await this.predictionService.predictFraud(dummyFeatures);
        } catch (error) {
            this.logger.error('Failed to communicate with FastAPI Inference API', error);
            throw new InternalServerErrorException('ML Prediction service unavailable');
        }

        // 4. Store prediction
        const { error: predError } = await supabase
            .from('Predictions')
            .insert([
                {
                    transaction_id: txData.id,
                    fraud_probability: predictionResult.fraud_probability,
                    label: predictionResult.label,
                    risk_level: predictionResult.risk_level,
                    top_features: predictionResult.top_features,
                },
            ]);

        if (predError) {
            this.logger.error('Failed to insert prediction', predError);
            // We don't necessarily throw here so the user still gets their processed transaction back, 
            // but we log the analytics failure.
        }

        // 5. Fire high risk alert if probability > 0.8
        if (predictionResult.fraud_probability > 0.8) {
            const { error: alertError } = await supabase
                .from('alerts')
                .insert({
                    transaction_id: txData.id,
                    probability: predictionResult.fraud_probability,
                    risk_level: predictionResult.risk_level,
                    created_at: new Date()
                });

            if (alertError) {
                this.logger.error('Failed to insert fraud alert', alertError);
            }
        }

        return {
            transaction: txData,
            prediction: predictionResult
        };
    }

    async processBatchTransactions(userId: number, transactions: any[]) {
        const supabase = this.supabaseService.getClient();

        // 1. Bulk insert transactions
        const txInserts = transactions.map(tx => ({
            user_id: userId,
            amount: tx.amount,
            merchant: tx.merchant,
            location: tx.location,
            device: tx.device,
        }));

        const { data: txData, error: txError } = await supabase
            .from('Transactions')
            .insert(txInserts)
            .select();

        if (txError) {
            this.logger.error('Failed to bulk insert transactions', txError);
            throw new InternalServerErrorException('Database error handling batch transactions');
        }

        // 2. Mock features for each transaction
        const batchFeatures = txData.map(tx => [
            tx.amount, -0.072781, 2.536347, 1.378155, -0.338321, 0.462388,
            0.239599, 0.098698, 0.363787, 0.090794, -0.5516, -0.6178, -0.9913,
            -0.3111, 1.4681, -0.4704, 0.2079, 0.0257, 0.4039, 0.2514, -0.0183,
            0.2778, -0.1104, 0.0669, 0.1285, -0.1891, 0.1335, -0.0210, 0.4967
        ]);

        // 3. Send features to FastAPI Batch Inference
        let predictionResults: any[] = [];
        try {
            predictionResults = await this.predictionService.predictBatch(batchFeatures);
        } catch (error) {
            this.logger.error('Failed to communicate with FastAPI Inference API (Batch)', error);
            // Optionally, we could clean up the transactions here if ML fails, but we'll leave them.
            throw new InternalServerErrorException('ML Prediction service unavailable');
        }

        // 4. Store all predictions
        const predInserts = predictionResults.map((pred, index) => ({
            transaction_id: txData[index].id,
            fraud_probability: pred.fraud_probability,
            label: pred.label,
            risk_level: pred.risk_level,
            top_features: pred.top_features, // Top features will only be null here until SHAP is upgraded for batch loop
        }));

        const { error: predError } = await supabase
            .from('Predictions')
            .insert(predInserts);

        if (predError) {
            this.logger.error('Failed to bulk insert predictions', predError);
        }

        // 5. Fire high risk alerts if probability > 0.8
        const highRiskAlerts = predInserts
            .filter(pred => pred.fraud_probability > 0.8)
            .map(pred => ({
                transaction_id: pred.transaction_id,
                probability: pred.fraud_probability,
                risk_level: pred.risk_level,
                created_at: new Date()
            }));

        if (highRiskAlerts.length > 0) {
            const { error: alertError } = await supabase
                .from('alerts')
                .insert(highRiskAlerts);

            if (alertError) {
                this.logger.error('Failed to bulk insert fraud alerts', alertError);
            }
        }

        return {
            inserted_count: txData.length,
            high_risk_flagged: highRiskAlerts.length,
            transactions: txData.map((t, idx) => ({ ...t, prediction: predictionResults[idx] }))
        };
    }

    async getUserTransactions(userId: number) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('Transactions')
            .select('*, Predictions(*)')
            .eq('user_id', userId)
            .order('timestamp', { ascending: false });

        if (error) {
            throw new InternalServerErrorException('Failed to fetch transactions');
        }
        return data;
    }

    async getHighRiskTransactions(userId: number) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('Transactions')
            .select('*, Predictions!inner(*)')
            .eq('user_id', userId)
            .eq('Predictions.label', 'fraud') // Filtering explicitly on the fraud label generated by the model
            .order('timestamp', { ascending: false });

        if (error) {
            throw new InternalServerErrorException('Failed to fetch high-risk transactions');
        }
        return data;
    }
}
