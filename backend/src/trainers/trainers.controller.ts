import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainersService } from './trainers.service';
import { AssignTrainersDto } from './dto/assign-trainer.dto';

@Controller('trainers')
@UseGuards(JwtAuthGuard)
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  getAll() {
    return this.trainersService.getAllTrainers();
  }

  @Get('me')
  getMine(@Request() req) {
    return this.trainersService.getTrainersForStudent(req.user.sub);
  }
  
  @Post('me')
  assignMine(@Request() req, @Body() assignTrainersDto: AssignTrainersDto) {
    return this.trainersService.assignTrainersToStudent(req.user.sub, assignTrainersDto.trainerIds);
  }

  @Get('my-students')
  getMyStudents(@Request() req) {
    return this.trainersService.getStudentsForTrainer(req.user.sub);
  }
}