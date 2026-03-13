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
        // Note: Providing required 'status' and 'timestamp' columns
        const { data: txData, error: txError } = await supabase
            .from('transactions')
            .insert([
                {
                    user_id: userId,
                    amount: transactionDto.amount,
                    status: 'PENDING',
                    timestamp: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (txError) {
            this.logger.error('Failed to insert transaction', txError);
            throw new InternalServerErrorException('Database error handling transaction');
        }

        // 2. Mock 30 features for FastAPI (Time, V1-V28, Amount)
        const dummyFeatures = [
            0.0, // Time
            -0.072781, 2.536347, 1.378155, -0.338321, 0.462388,
            0.239599, 0.098698, 0.363787, 0.090794, -0.5516, -0.6178, -0.9913,
            -0.3111, 1.4681, -0.4704, 0.2079, 0.0257, 0.4039, 0.2514, -0.0183,
            0.2778, -0.1104, 0.0669, 0.1285, -0.1891, 0.1335, -0.0210, 0.4967,
            transactionDto.amount // Amount
        ];

        // 3. Send features to FastAPI & Receive Fraud Prediction
        let predictionResult;
        try {
            predictionResult = await this.predictionService.predictFraud(dummyFeatures);
        } catch (error) {
            this.logger.error('Failed to communicate with FastAPI Inference API', error);
            throw new InternalServerErrorException('ML Prediction service unavailable');
        }

        // 4. Store prediction (align with schema.sql)
        const { error: predError } = await supabase
            .from('predictions')
            .insert([
                {
                    transaction_id: txData.id,
                    risk_score: predictionResult.fraud_probability,
                    fraud_status: predictionResult.label === 'fraud',
                },
            ]);

        if (predError) {
            this.logger.error('Failed to insert prediction', predError);
        }

        // 5. Update transaction status based on risk
        const finalStatus = predictionResult.fraud_probability > 0.8 ? 'DECLINED' : 
                          predictionResult.fraud_probability > 0.4 ? 'REVIEW' : 'APPROVED';
        
        await supabase
            .from('transactions')
            .update({ status: finalStatus })
            .eq('id', txData.id);

        return {
            transaction: { ...txData, status: finalStatus },
            prediction: predictionResult
        };
    }

    async processBatchTransactions(userId: number, transactions: any[]) {
        const supabase = this.supabaseService.getClient();

        // 1. Bulk insert transactions
        const txInserts = transactions.map(tx => ({
            user_id: userId,
            amount: tx.amount,
            status: 'PENDING',
            timestamp: new Date().toISOString(),
        }));

        const { data: txData, error: txError } = await supabase
            .from('transactions')
            .insert(txInserts)
            .select();

        if (txError) {
            this.logger.error('Failed to bulk insert transactions', txError);
            throw new InternalServerErrorException('Database error handling batch transactions');
        }

        // 2. Mock features for each transaction (30 features)
        const batchFeatures = txData.map(tx => [
            0.0, // Time
            -0.072781, 2.536347, 1.378155, -0.338321, 0.462388,
            0.239599, 0.098698, 0.363787, 0.090794, -0.5516, -0.6178, -0.9913,
            -0.3111, 1.4681, -0.4704, 0.2079, 0.0257, 0.4039, 0.2514, -0.0183,
            0.2778, -0.1104, 0.0669, 0.1285, -0.1891, 0.1335, -0.0210, 0.4967,
            tx.amount // Amount
        ]);

        // 3. Send features to FastAPI Batch Inference
        let predictionResults: any[] = [];
        try {
            predictionResults = await this.predictionService.predictBatch(batchFeatures);
        } catch (error) {
            this.logger.error('Failed to communicate with FastAPI Inference API (Batch)', error);
            throw new InternalServerErrorException('ML Prediction service unavailable');
        }

        // 4. Store all predictions
        const predInserts = predictionResults.map((pred, index) => ({
            transaction_id: txData[index].id,
            risk_score: pred.fraud_probability,
            fraud_status: pred.label === 'fraud',
        }));

        const { error: predError } = await supabase
            .from('predictions')
            .insert(predInserts);

        if (predError) {
            this.logger.error('Failed to bulk insert predictions', predError);
        }

        // 5. Update transaction statuses based on risk
        for (let i = 0; i < txData.length; i++) {
            const pred = predictionResults[i];
            const finalStatus = pred.fraud_probability > 0.8 ? 'DECLINED' : 
                               pred.fraud_probability > 0.4 ? 'REVIEW' : 'APPROVED';
            
            await supabase
                .from('transactions')
                .update({ status: finalStatus })
                .eq('id', txData[i].id);
        }

        return {
            inserted_count: txData.length,
            transactions: txData.map((t, idx) => ({ ...t, prediction: predictionResults[idx] }))
        };
    }

    async getUserTransactions(userId: number) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('transactions')
            .select('*, predictions(*)')
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
            .from('transactions')
            .select('*, predictions!inner(*)')
            .eq('user_id', userId)
            .eq('predictions.label', 'fraud') // Filtering explicitly on the fraud label generated by the model
            .order('timestamp', { ascending: false });

        if (error) {
            throw new InternalServerErrorException('Failed to fetch high-risk transactions');
        }
        return data;
    }
}
