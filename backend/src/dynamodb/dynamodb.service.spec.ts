import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbService } from './dynamodb.service';
import { ConfigService } from '@nestjs/config';
import { DYNAMO_DB_DOCUMENT_CLIENT } from './dynamodb.constants';

const mockDocClient = {
  send: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn(),
};

describe('DynamodbService', () => {
  let service: DynamodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DynamodbService,
        {
          provide: DYNAMO_DB_DOCUMENT_CLIENT,
          useValue: mockDocClient,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    mockConfigService.getOrThrow.mockReturnValue('mock-table-name');

    service = module.get<DynamodbService>(DynamodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('getUsersByIds', () => {
    it('should correctly build and send a BatchGetCommand', async () => {
      const userIds = ['user-1', 'user-2'];
      const mockResponse = {
        Responses: {
          'mock-table-name': [{ userId: 'user-1' }, { userId: 'user-2' }],
        },
      };
      mockDocClient.send.mockResolvedValue(mockResponse);

      const result = await service.getUsersByIds(userIds);

      expect(result).toHaveLength(2);
      expect(mockDocClient.send).toHaveBeenCalled();
      
      const sentCommand = mockDocClient.send.mock.calls[0][0];
      expect(sentCommand.input.RequestItems['mock-table-name'].Keys).toHaveLength(2);
    });
  });
});
