import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount!: number;
}
