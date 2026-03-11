import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { SupabaseModule } from '../supabase.module';
import { PredictionModule } from '../modules/prediction.module';

@Module({
  imports: [SupabaseModule, PredictionModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }