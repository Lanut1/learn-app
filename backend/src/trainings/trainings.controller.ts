import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';

@Controller('trainings')
@UseGuards(JwtAuthGuard)
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}
  
  @Get('me')
  getMyTrainings(@Request() req) {
    return this.trainingsService.getTrainingsForUser(req.user.sub, req.user.role);
  }

  @Post()
  addTraining(@Request() req, @Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingsService.addTraining(createTrainingDto);
  }
}
