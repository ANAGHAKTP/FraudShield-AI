import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PredictionService } from '../services/prediction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('predict')
export class PredictionController {

    constructor(private readonly predictionService: PredictionService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async predict(@Body() body: any) {

        return this.predictionService.predictFraud(body.features);

    }

}
