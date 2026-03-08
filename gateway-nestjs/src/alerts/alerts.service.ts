import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';

@Injectable()
export class AlertsService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getRecentAlerts(userId: number) {
        const supabase = this.supabaseService.getClient();

        // Join with Transactions to only get alerts for this user's transactions
        const { data, error } = await supabase
            .from('alerts')
            .select(`
                probability,
                created_at,
                transaction_id,
                Transactions!inner(user_id)
            `)
            .eq('Transactions.user_id', userId)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            throw new InternalServerErrorException('Failed to fetch recent alerts');
        }

        // Map it back to the expected output payload format
        return data.map((alert: any) => ({
            transaction_id: alert.transaction_id,
            probability: alert.probability,
            created_at: alert.created_at
        }));
    }
}
