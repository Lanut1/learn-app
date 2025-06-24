import { Injectable } from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';

@Injectable()
export class TrainersService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async getAllTrainers() {
    const trainers = await this.dynamodbService.getAllTrainers();
    return trainers.map(t => ({
      id: t.userId,
      name: `${t.firstName} ${t.lastName}`,
      specialization: t.specialization,
    }));
  }
  
  async assignTrainersToStudent(studentId: string, trainerIds: string[]) {
    await this.dynamodbService.assignTrainersToStudent(studentId, trainerIds);
    return { success: true, addedTrainerIds: trainerIds };
  }

  async getTrainersForStudent(studentId: string) {
    const trainerIds = await this.dynamodbService.getTrainerIdsForStudent(studentId);
    if (trainerIds.length === 0) return [];

    const trainerProfiles = await this.dynamodbService.getUsersByIds(trainerIds);
    return trainerProfiles.map(t => ({
        id: t.userId,
        name: `${t.firstName} ${t.lastName}`,
        specialization: t.specialization,
    }));
  }

  async getStudentsForTrainer(trainerId: string) {
    const studentIds = await this.dynamodbService.getStudentIdsForTrainer(trainerId);
    if (studentIds.length === 0) return [];

    const studentProfiles = await this.dynamodbService.getUsersByIds(studentIds);
    return studentProfiles.map(p => ({
      id: p.userId,
      name: `${p.firstName} ${p.lastName}`,
      email: p.email,
      isActive: p.isActive || false,
    }));
  }
}
