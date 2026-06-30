import {
  Controller,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { PredictionService } from '../services/prediction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredictDto } from './dto/prediction.dto';

@Controller('predict')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async predict(@Body() body: PredictDto) {
    // SECURITY: Explicit DTO and class-validator prevent arbitrary payload injection
    try {
      return await this.predictionService.predictFraud(body.features);
    } catch (error) {
      console.error('Prediction error:', error?.message);
      throw new InternalServerErrorException(
        'ML Prediction service unavailable',
      );
    }
  }
}
