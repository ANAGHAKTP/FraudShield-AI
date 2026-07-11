import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  ParseArrayPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './transactions.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Request() req: any,
    @Body() body: CreateTransactionDto,
  ) {
    // req.user is populated natively by the JWT strategy validate() method
    return this.transactionsService.processTransaction(req.user.userId, body);
  }

  @Post('batch')
  async createBatchTransactions(
    @Request() req: any,
    @Body(new ParseArrayPipe({ items: CreateTransactionDto, whitelist: true }))
    body: CreateTransactionDto[],
  ) {
    if (!Array.isArray(body)) {
      throw new BadRequestException(
        'Payload must be an array of transactions for batch processing',
      );
    }
    return this.transactionsService.processBatchTransactions(
      req.user.userId,
      body,
    );
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
