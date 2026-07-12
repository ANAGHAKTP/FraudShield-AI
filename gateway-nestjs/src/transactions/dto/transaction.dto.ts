import { IsNumber, IsNotEmpty } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
