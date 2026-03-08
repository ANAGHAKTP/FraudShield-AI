import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('alerts')
@UseGuards(JwtAuthGuard)
export class AlertsController {
    constructor(private readonly alertsService: AlertsService) { }

    @Get()
    async getRecentAlerts(@Request() req: any) {
        // Technically, alerts might belong to a tenant or user, 
        // to simplify based on the goal: return recent alerts
        return this.alertsService.getRecentAlerts(req.user.userId);
    }
}
