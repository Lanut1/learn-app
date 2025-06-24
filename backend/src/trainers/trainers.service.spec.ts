import { Test, TestingModule } from '@nestjs/testing';
import { TrainersService } from './trainers.service';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { UserItem } from 'src/dynamodb/dynamodb.types';

const mockDynamodbService = {
  getAllTrainers: jest.fn(),
  getTrainerIdsForStudent: jest.fn(),
  getStudentIdsForTrainer: jest.fn(),
  getUsersByIds: jest.fn(),
  assignTrainersToStudent: jest.fn(),
};

const mockUserItems: UserItem[] = [
  { 
    pk: 'USER#trainer-1',
    sk: 'METADATA#trainer-1',
    userId: 'trainer-1', 
    firstName: 'John', 
    lastName: 'Doe', 
    specialization: 'frontend', 
    role: 'trainer',
    email: 'john.doe@test.com',
    username: 'johndoe',
    hashedPassword: 'hashed_password_1',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  { 
    pk: 'USER#trainer-2',
    sk: 'METADATA#trainer-2',
    userId: 'trainer-2', 
    firstName: 'Jane', 
    lastName: 'Smith', 
    specialization: 'backend', 
    role: 'trainer',
    email: 'jane.smith@test.com',
    username: 'janesmith',
    hashedPassword: 'hashed_password_2',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  { 
    pk: 'USER#student-1',
    sk: 'METADATA#student-1',
    userId: 'student-1', 
    firstName: 'Peter', 
    lastName: 'Jones', 
    role: 'student',
    email: 'peter.jones@test.com',
    username: 'peterjones',
    hashedPassword: 'hashed_password_3',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

describe('TrainersService', () => {
  let service: TrainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainersService,
        { provide: DynamodbService, useValue: mockDynamodbService },
      ],
    }).compile();

    service = module.get<TrainersService>(TrainersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTrainers', () => {
    it('should fetch all trainers and format them correctly', async () => {
      const trainers = mockUserItems.filter(u => u.role === 'trainer');
      mockDynamodbService.getAllTrainers.mockResolvedValue(trainers);

      const result = await service.getAllTrainers();
      expect(mockDynamodbService.getAllTrainers).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'trainer-1',
        name: 'John Doe',
        specialization: 'frontend',
      });
    });
  });

  describe('getTrainersForStudent', () => {
    it('should return an empty array if a student has no trainers', async () => {
      mockDynamodbService.getTrainerIdsForStudent.mockResolvedValue([]);
      const result = await service.getTrainersForStudent('student-id');
 
      expect(result).toEqual([]);
      expect(mockDynamodbService.getUsersByIds).not.toHaveBeenCalled();
    });

    it('should fetch and format the correct trainers for a student', async () => {
      const trainerIds = ['trainer-1', 'trainer-2'];
      const trainerProfiles = mockUserItems.filter(u => trainerIds.includes(u.userId));
      mockDynamodbService.getTrainerIdsForStudent.mockResolvedValue(trainerIds);
      mockDynamodbService.getUsersByIds.mockResolvedValue(trainerProfiles);

      const result = await service.getTrainersForStudent('student-id');

      expect(mockDynamodbService.getTrainerIdsForStudent).toHaveBeenCalledWith('student-id');
      expect(mockDynamodbService.getUsersByIds).toHaveBeenCalledWith(trainerIds);
      expect(result).toHaveLength(2);
      expect(result[1].name).toEqual('Jane Smith');
    });
  });
  
  describe('getStudentsForTrainer', () => {
    it('should fetch and format assigned students for a trainer', async () => {
        const studentIds = ['student-1'];
        const studentProfiles = mockUserItems.filter(u => studentIds.includes(u.userId));
        mockDynamodbService.getStudentIdsForTrainer.mockResolvedValue(studentIds);
        mockDynamodbService.getUsersByIds.mockResolvedValue(studentProfiles);

        const result = await service.getStudentsForTrainer('trainer-id');

        expect(mockDynamodbService.getStudentIdsForTrainer).toHaveBeenCalledWith('trainer-id');
        expect(mockDynamodbService.getUsersByIds).toHaveBeenCalledWith(studentIds);
        expect(result[0]).toEqual(expect.objectContaining({
            id: 'student-1',
            name: 'Peter Jones',
            email: 'peter.jones@test.com',
            isActive: true
        }));
    });
  });

  describe('assignTrainersToStudent', () => {
    it('should call the dynamodb service to assign trainers', async () => {
      const studentId = 'student-id';
      const trainerIds = ['trainer-1'];

      const result = await service.assignTrainersToStudent(studentId, trainerIds);

      expect(mockDynamodbService.assignTrainersToStudent).toHaveBeenCalledWith(studentId, trainerIds);
      expect(result).toEqual({ success: true, addedTrainerIds: trainerIds });
    });
  });
});
