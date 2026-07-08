import {
  Controller,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { PredictionService } from '../services/prediction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredictionDto } from './dto/prediction.dto';

@Controller('predict')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async predict(@Body() body: PredictionDto) {
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
