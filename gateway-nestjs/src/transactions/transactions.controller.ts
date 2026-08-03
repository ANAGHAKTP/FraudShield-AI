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
import { TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Request() req: any, @Body() body: TransactionDto) {
    // req.user is populated natively by the JWT strategy validate() method
    return this.transactionsService.processTransaction(req.user.userId, body);
  }

  @Post('batch')
  async createBatchTransactions(
    @Request() req: any,
    @Body(new ParseArrayPipe({ items: TransactionDto, whitelist: true }))
    body: TransactionDto[],
  ) {
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
