import { Test, TestingModule } from '@nestjs/testing';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const mockTrainersService = {
  getAllTrainers: jest.fn(),
  getTrainersForStudent: jest.fn(),
  assignTrainersToStudent: jest.fn(),
  getStudentsForTrainer: jest.fn(),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('TrainersController', () => {
  let controller: TrainersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainersController],
      providers: [{ provide: TrainersService, useValue: mockTrainersService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<TrainersController>(TrainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllTrainers on GET /', async () => {
    mockTrainersService.getAllTrainers.mockResolvedValue([]);
    await controller.getAll();
    expect(mockTrainersService.getAllTrainers).toHaveBeenCalled();
  });

  it('should call getTrainersForStudent on GET /me', async () => {
    const mockRequest = { user: { sub: 'student-id' } };
    await controller.getMine(mockRequest);
    expect(mockTrainersService.getTrainersForStudent).toHaveBeenCalledWith('student-id');
  });

  it('should call getStudentsForTrainer on GET /my-students', async () => {
    const mockRequest = { user: { sub: 'trainer-id' } };
    await controller.getMyStudents(mockRequest);
    expect(mockTrainersService.getStudentsForTrainer).toHaveBeenCalledWith('trainer-id');
  });

  it('should call assignTrainersToStudent on POST /me', async () => {
    const mockRequest = { user: { sub: 'student-id' } };
    const assignDto = { trainerIds: ['trainer-1'] };
    await controller.assignMine(mockRequest, assignDto);
    expect(mockTrainersService.assignTrainersToStudent).toHaveBeenCalledWith('student-id', assignDto.trainerIds);
  });
});
