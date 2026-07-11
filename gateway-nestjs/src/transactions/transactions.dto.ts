import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount!: number;
}
