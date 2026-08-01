import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount!: number;
}
