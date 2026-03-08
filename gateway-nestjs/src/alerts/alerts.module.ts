import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { SupabaseService } from '../supabase.service';

@Module({
    controllers: [AlertsController],
    providers: [AlertsService, SupabaseService],
})
export class AlertsModule { }
