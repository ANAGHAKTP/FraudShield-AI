import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;
    private readonly logger = new Logger(SupabaseService.name);

    constructor() {
        // Determine connection based on environment variables. 
        // Fallback to empty string preventing complete crash if env is missing, but will throw on query.
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_KEY || '';

        if (!supabaseUrl || !supabaseKey) {
            this.logger.warn('Supabase URL or Key is missing from environment variables. Database operations will fail.');
        }

        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }
}
