import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsService } from './trainings.service';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';

const mockDynamodbService = {
  getTrainerIdsForStudent: jest.fn(),
  getUserById: jest.fn(),
  createTraining: jest.fn(),
  getTrainingsForStudent: jest.fn(),
  getTrainingsForTrainer: jest.fn(),
};

describe('TrainingsService', () => {
  let service: TrainingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingsService,
        { provide: DynamodbService, useValue: mockDynamodbService },
      ],
    }).compile();

    service = module.get<TrainingsService>(TrainingsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addTraining', () => {
    const createDto: CreateTrainingDto = { studentId: 'student-1', trainerId: 'trainer-1', trainingName: 'test', type: 'webinar', duration: 60, date: '2025-01-01' };

    it('should create a training successfully if student is assigned to trainer', async () => {
      mockDynamodbService.getTrainerIdsForStudent.mockResolvedValue(['trainer-1', 'trainer-2']);
      mockDynamodbService.getUserById
        .mockResolvedValueOnce({ firstName: 'Student', lastName: 'Name' })
        .mockResolvedValueOnce({ firstName: 'Trainer', lastName: 'Name' });
      mockDynamodbService.createTraining.mockResolvedValue({ id: 'new-training' });
      
      const result = await service.addTraining(createDto);

      expect(mockDynamodbService.createTraining).toHaveBeenCalled();
      expect(result).toEqual({ id: 'new-training' });
    });

    it('should throw UnauthorizedException if student is not assigned to trainer', async () => {
      mockDynamodbService.getTrainerIdsForStudent.mockResolvedValue(['trainer-2']);

      await expect(service.addTraining(createDto)).rejects.toThrow(UnauthorizedException);
    });
    
    it('should throw NotFoundException if student or trainer is not found', async () => {
        mockDynamodbService.getTrainerIdsForStudent.mockResolvedValue(['trainer-1']);
        mockDynamodbService.getUserById.mockResolvedValue(null);

        await expect(service.addTraining(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTrainingsForUser', () => {
    it('should call getTrainingsForStudent if role is student', async () => {
      await service.getTrainingsForUser('user-id', 'student');
      expect(mockDynamodbService.getTrainingsForStudent).toHaveBeenCalledWith('user-id');
      expect(mockDynamodbService.getTrainingsForTrainer).not.toHaveBeenCalled();
    });

    it('should call getTrainingsForTrainer if role is trainer', async () => {
      await service.getTrainingsForUser('user-id', 'trainer');
      expect(mockDynamodbService.getTrainingsForTrainer).toHaveBeenCalledWith('user-id');
      expect(mockDynamodbService.getTrainingsForStudent).not.toHaveBeenCalled();
    });
  });
});
