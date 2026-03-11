import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    async createTransaction(@Request() req: any, @Body() body: any) {
        // req.user is populated natively by the JWT strategy validate() method
        return this.transactionsService.processTransaction(req.user.userId, body);
    }

    @Post('batch')
    async createBatchTransactions(@Request() req: any, @Body() body: any[]) {
        if (!Array.isArray(body)) {
            throw new Error("Payload must be an array of transactions for batch processing");
        }
        return this.transactionsService.processBatchTransactions(req.user.userId, body);
    }

    @Get()
    async getUserTransactions(@Request() req: any) {
        return this.transactionsService.getUserTransactions(req.user.userId);
    }

    @Get('high-risk')
    async getHighRiskTransactions(@Request() req: any) {
        return this.transactionsService.getHighRiskTransactions(req.user.userId);
    }

}
