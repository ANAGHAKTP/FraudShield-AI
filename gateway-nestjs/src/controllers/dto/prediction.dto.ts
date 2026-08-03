import { IsArray, IsNumber } from 'class-validator';

export class PredictionDto {
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each feature must be a number' })
  features!: number[];
}
