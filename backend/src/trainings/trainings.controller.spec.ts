import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTrainingDto } from './dto/create-training.dto';

const mockTrainingsService = {
  getTrainingsForUser: jest.fn(),
  addTraining: jest.fn(),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('TrainingsController', () => {
  let controller: TrainingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingsController],
      providers: [{ provide: TrainingsService, useValue: mockTrainingsService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<TrainingsController>(TrainingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getTrainingsForUser on GET /me', () => {
    const mockRequest = { user: { sub: 'user-id', role: 'student' } };
    controller.getMyTrainings(mockRequest);
    expect(mockTrainingsService.getTrainingsForUser).toHaveBeenCalledWith('user-id', 'student');
  });

  it('should call addTraining on POST /', () => {
    const mockRequest = { user: { sub: 'student-id' } };
    const createDto: CreateTrainingDto = { studentId: 'student-id', trainerId: 'trainer-1', trainingName: 'test', type: 'webinar', duration: 60, date: '2025-01-01' };
    controller.addTraining(mockRequest, createDto);
    expect(mockTrainingsService.addTraining).toHaveBeenCalledWith(createDto);
  });
});