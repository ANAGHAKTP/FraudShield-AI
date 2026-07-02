import { IsNumber, IsNotEmpty, Min, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty()
  @Min(0, { message: 'Amount must be greater than or equal to 0' })
  amount!: number;

  @IsString()
  @IsOptional()
  merchant?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  device?: string;
}
