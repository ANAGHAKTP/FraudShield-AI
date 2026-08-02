import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'Amount must be a positive number' })
  amount!: number;
}
