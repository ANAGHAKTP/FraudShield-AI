import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('fraud-rate')
    async getFraudRate(@Request() req: any) {
        return this.analyticsService.getFraudRate(req.user.userId);
    }

    @Get('transactions-count')
    async getTransactionsCount(@Request() req: any) {
        return this.analyticsService.getTransactionsCount(req.user.userId);
    }

    @Get('high-risk')
    async getHighRiskTransactions(@Request() req: any) {
        return this.analyticsService.getHighRiskTransactions(req.user.userId);
    }

    @Get('trend')
    async getTrend(@Request() req: any) {
        return this.analyticsService.getTrend(req.user.userId);
    }
}
