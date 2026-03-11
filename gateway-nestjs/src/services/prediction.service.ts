import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PredictionService {

    private readonly mlApiUrl = process.env.ML_API_URL || 'http://ml-service:8000';

    async predictFraud(features: number[]) {

        const response = await axios.post(
            `${this.mlApiUrl}/predict`,
            { features: features }
        );

        return response.data;
    }

    async predictBatch(transactionsFeatures: number[][]) {

        const payload = {
            transactions: transactionsFeatures.map(features => ({ features }))
        };

        const response = await axios.post(
            `${this.mlApiUrl}/predict-batch`,
            payload
        );

        return response.data;
    }
}