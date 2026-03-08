import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';

@Injectable()
export class AnalyticsService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getFraudRate(userId: number) {
        const supabase = this.supabaseService.getClient();

        // 1. Fetch total transactions for user
        const { count: totalCount, error: totalError } = await supabase
            .from('Transactions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (totalError) throw new InternalServerErrorException('Error fetching total transactions');

        // 2. Fetch fraud predictions mapped to user transactions
        // Since Predictions maps to Transactions via transaction_id, we join to filter by user.
        const { count: fraudCount, error: fraudError } = await supabase
            .from('Transactions')
            .select('Predictions!inner(*)', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('Predictions.label', 'fraud');

        if (fraudError) throw new InternalServerErrorException('Error fetching fraud predictions');

        const total = totalCount || 0;
        const fraud = fraudCount || 0;
        const rate = total === 0 ? 0 : fraud / total;

        return {
            total_transactions: total,
            fraud_transactions: fraud,
            fraud_rate: rate,
        };
    }

    async getTransactionsCount(userId: number) {
        const supabase = this.supabaseService.getClient();

        const { count, error } = await supabase
            .from('Transactions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (error) throw new InternalServerErrorException('Error fetching transaction count');

        return { count: count || 0 };
    }

    async getHighRiskTransactions(userId: number, limit: number = 5) {
        const supabase = this.supabaseService.getClient();

        const { data, error } = await supabase
            .from('Transactions')
            .select('*, Predictions!inner(*)')
            .eq('user_id', userId)
            .order('fraud_probability', { foreignTable: 'Predictions', ascending: false })
            .limit(limit);

        if (error) throw new InternalServerErrorException('Error fetching high risk transactions');

        return data;
    }

    async getTrend(userId: number) {
        const supabase = this.supabaseService.getClient();

        // To perform grouping securely, we fetch recent transactions and group them in memory
        // (A more scalable approach uses Supabase RPC procedures or native views)

        // Fetch last 30 days of user transactions
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data, error } = await supabase
            .from('Transactions')
            .select('timestamp, Predictions!inner(label, fraud_probability)')
            .eq('user_id', userId)
            .gte('timestamp', thirtyDaysAgo.toISOString())
            .order('timestamp', { ascending: true });

        if (error) throw new InternalServerErrorException('Error fetching trend data');

        // Group locally by Date
        const trends: Record<string, { total: number; fraud: number }> = {};

        data.forEach((tx) => {
            // Assume timestamp is standard ISO format string
            const dateStr = new Date(tx.timestamp).toISOString().split('T')[0];

            if (!trends[dateStr]) {
                trends[dateStr] = { total: 0, fraud: 0 };
            }

            trends[dateStr].total += 1;

            // Handle array wrap from join
            const prediction = Array.isArray(tx.Predictions) ? tx.Predictions[0] : tx.Predictions;
            if (prediction?.label === 'fraud') {
                trends[dateStr].fraud += 1;
            }
        });

        // Formatting for charting libraries
        return Object.keys(trends).map(date => ({
            date,
            total: trends[date].total,
            fraud: trends[date].fraud
        }));
    }
}
