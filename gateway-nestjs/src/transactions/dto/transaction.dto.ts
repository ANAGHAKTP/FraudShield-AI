import { IsNumber, IsPositive } from 'class-validator';

export class TransactionDto {
  @IsNumber({}, { message: 'Amount must be a valid number' })
  @IsPositive({ message: 'Amount must be positive' })
  amount!: number;
}
