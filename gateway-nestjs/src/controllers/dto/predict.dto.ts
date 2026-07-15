import { IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class PredictDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  features: number[];
}
