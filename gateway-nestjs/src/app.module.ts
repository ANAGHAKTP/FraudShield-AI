import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionModule } from './modules/prediction.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [PredictionModule, AuthModule, TransactionsModule, AnalyticsModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
