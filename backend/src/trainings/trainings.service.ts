import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TrainingsService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async addTraining(createTrainingDto: CreateTrainingDto) {
    const studentId = createTrainingDto.studentId;
    const assignedTrainerIds = await this.dynamodbService.getTrainerIdsForStudent(studentId);
    if (!assignedTrainerIds.includes(createTrainingDto.trainerId)) {
      throw new UnauthorizedException('You are not assigned to this trainer.');
    }
    
    const student = await this.dynamodbService.getUserById(studentId);
    const trainer = await this.dynamodbService.getUserById(createTrainingDto.trainerId);
    if (!student || !trainer) throw new NotFoundException('User or Trainer not found');

    const newTraining = await this.dynamodbService.createTraining({
      trainingId: randomUUID(),
      studentId,
      trainerId: createTrainingDto.trainerId,
      trainingName: createTrainingDto.trainingName,
      type: createTrainingDto.type,
      duration: createTrainingDto.duration,
      date: createTrainingDto.date,
      studentName: `${student.firstName} ${student.lastName}`,
      trainerName: `${trainer.firstName} ${trainer.lastName}`,
    });

    return newTraining;
  }
  
  async getTrainingsForUser(userId: string, role: 'student' | 'trainer') {
    if (role === 'student') {
      return this.dynamodbService.getTrainingsForStudent(userId);
    } else {
      return this.dynamodbService.getTrainingsForTrainer(userId);
    }
  }
}
