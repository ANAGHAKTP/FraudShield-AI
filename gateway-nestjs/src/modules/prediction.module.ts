import { Module } from '@nestjs/common';
import { PredictionController } from '../controllers/prediction.controller';
import { PredictionService } from '../services/prediction.service';

@Module({
    controllers: [PredictionController],
    providers: [PredictionService],
    exports: [PredictionService],
})
export class PredictionModule { }
