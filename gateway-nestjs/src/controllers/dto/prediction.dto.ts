import { IsArray, IsNumber } from 'class-validator';

export class PredictDto {
  @IsArray()
  @IsNumber({}, { each: true })
  features!: number[];
}
