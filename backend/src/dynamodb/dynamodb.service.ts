import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BatchGetCommand, BatchWriteCommand, DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DYNAMO_DB_DOCUMENT_CLIENT } from './dynamodb.constants';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

export type UserItem = {
  pk: string;
  sk: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  hashedPassword: string;
  createdAt: string;
  dob?: string;
  address?: string;
  specialization?: string;
  photo?: string;
  isActive?: boolean;
};

export type StudentTrainerLinkItem = {
  pk: string;
  sk: string;
  gsi1pk: string;
  gsi1sk: string;
  createdAt: string;
};

export type TrainingItem = {
  pk: string;
  sk: string;
  trainingId: string;
  studentId: string;
  trainerId: string;
  studentName: string;
  trainerName: string;
  date: string;
  trainingName: string;
  type: string;
  duration: number;
  gsi1pk: string;
  gsi1sk: string;
  gsi2pk: string;
  gsi2sk: string;
  createdAt: string;
};

@Injectable()
export class DynamodbService {
  private readonly usersTableName: string;
  private readonly linksTableName: string;
  private readonly trainingsTableName: string;

  constructor(
    @Inject(DYNAMO_DB_DOCUMENT_CLIENT)
    private readonly ddbDocClient: DynamoDBDocumentClient,
    private readonly configService: ConfigService,
  ) {
    this.usersTableName = this.configService.getOrThrow<string>('DYNAMODB_TABLE_USERS');
    this.linksTableName = this.configService.getOrThrow<string>('DYNAMODB_TABLE_LINKS');
    this.trainingsTableName = this.configService.getOrThrow<string>('DYNAMODB_TABLE_TRAININGS');
  }

  async createUser(userData: Omit<UserItem, 'pk' | 'sk' | 'createdAt'>): Promise<UserItem> {
    const userItem: UserItem = {
      ...userData,
      pk: `USER#${userData.userId}`,
      sk: `METADATA#${userData.userId}`,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: this.usersTableName,
      Item: userItem,
    });

    await this.ddbDocClient.send(command);

    const { hashedPassword: _, ...safeUser } = userItem;
    return safeUser as UserItem;
  }

  async getUserByEmail(email: string): Promise<UserItem | null> {
    const command = new QueryCommand({
      TableName: this.usersTableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    });

    const { Items } = await this.ddbDocClient.send(command);
    return (Items?.[0] as UserItem) || null;
  }

  async getUserById(userId: string): Promise<UserItem | null> {
    const command = new GetCommand({
      TableName: this.usersTableName,
      Key: {
        pk: `USER#${userId}`,
        sk: `METADATA#${userId}`,
      },
    });

    const { Item } = await this.ddbDocClient.send(command);
    return (Item as UserItem) || null;
  }

    async updateUser(
    userId: string,
    updateData: Partial<UserItem>,
  ): Promise<UserItem | null> {
    const keys = Object.keys(updateData);
    if (keys.length === 0) {
      return this.getUserById(userId);
    }

    const updateExpression = 'SET ' + keys.map((key) => `#${key} = :${key}`).join(', ');
    const expressionAttributeNames = keys.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = keys.reduce((acc, key) => ({ ...acc, [`:${key}`]: updateData[key] }), {});

    const command = new UpdateCommand({
      TableName: this.usersTableName,
      Key: {
        pk: `USER#${userId}`,
        sk: `METADATA#${userId}`,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      const { Attributes } = await this.ddbDocClient.send(command);
      return Attributes as UserItem;
    } catch (error) {
      console.error('Error updating user in DynamoDB:', error);
      throw new InternalServerErrorException('Could not update user data.');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.usersTableName,
      Key: {
        pk: `USER#${userId}`,
        sk: `METADATA#${userId}`,
      },
    });

    try {
      await this.ddbDocClient.send(command);
    } catch (error) {
      console.error('Error deleting user from DynamoDB:', error);
      throw new InternalServerErrorException('Could not delete user account.');
    }
  }

    async getAllTrainers(): Promise<UserItem[]> {
    const command = new QueryCommand({
      TableName: this.usersTableName,
      IndexName: 'RoleIndex',
      KeyConditionExpression: '#role = :role',
      ExpressionAttributeNames: { '#role': 'role' },
      ExpressionAttributeValues: { ':role': 'trainer' },
    });
    const { Items } = await this.ddbDocClient.send(command);
    return Items as UserItem[];
  }
  
  async assignTrainersToStudent(studentId: string, trainerIds: string[]): Promise<void> {
    const writeRequests = trainerIds.map(trainerId => ({
      PutRequest: {
        Item: {
          pk: `STUDENT#${studentId}`,
          sk: `TRAINER#${trainerId}`,
          gsi1pk: `TRAINER#${trainerId}`,
          gsi1sk: `STUDENT#${studentId}`,
          createdAt: new Date().toISOString(),
        },
      },
    }));

    const command = new BatchWriteCommand({
      RequestItems: {
        [this.linksTableName]: writeRequests,
      },
    });
    await this.ddbDocClient.send(command);
  }

  async getStudentIdsForTrainer(trainerId: string): Promise<string[]> {
    const command = new QueryCommand({
      TableName: this.linksTableName,
      IndexName: 'TrainerStudentsIndex',
      KeyConditionExpression: 'gsi1pk = :pk',
      ExpressionAttributeValues: { ':pk': `TRAINER#${trainerId}` },
    });
    const { Items } = await this.ddbDocClient.send(command);
    if (!Items || Items.length === 0) return [];

    return Items.map(item => item.gsi1sk.split('#')[1]);
  }

  async getTrainerIdsForStudent(studentId: string): Promise<string[]> {
    const command = new QueryCommand({
      TableName: this.linksTableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': `STUDENT#${studentId}` },
    });
    const { Items } = await this.ddbDocClient.send(command);
    if (!Items || Items.length === 0) return [];

    return Items.map(item => item.sk.split('#')[1]);
  }

  async getUsersByIds(userIds: string[]): Promise<UserItem[]> {
    if (!userIds || userIds.length === 0) return [];

    const keysToGet = userIds.map(id => ({
      pk: `USER#${id}`,
      sk: `METADATA#${id}`,
    }));

    const command = new BatchGetCommand({
      RequestItems: {
        [this.usersTableName]: {
          Keys: keysToGet,
          ProjectionExpression: "userId, firstName, lastName, email, specialization, photo, #r, isActive",
          ExpressionAttributeNames: {
            "#r": "role",
          },
        },
      },
    });

    const { Responses } = await this.ddbDocClient.send(command);

    if (!Responses || !Responses[this.usersTableName]) {
      return [];
    }

    return Responses[this.usersTableName] as UserItem[];
  }
  
  async createTraining(trainingData: Omit<TrainingItem, 'pk' | 'sk' | 'gsi1pk' | 'gsi1sk' | 'gsi2pk' | 'gsi2sk' | 'createdAt'>): Promise<TrainingItem> {
    const item: TrainingItem = {
      ...trainingData,
      pk: `TRAINING#${trainingData.trainingId}`,
      sk: `METADATA`,
      gsi1pk: `TRAINER#${trainingData.trainerId}`,
      gsi1sk: `TRAINING#${trainingData.trainingId}`,
      gsi2pk: `STUDENT#${trainingData.studentId}`,
      gsi2sk: `TRAINING#${trainingData.trainingId}`,
      createdAt: new Date().toISOString(),
    };

    await this.ddbDocClient.send(new PutCommand({
      TableName: this.trainingsTableName,
      Item: item,
    }));
    return item;
  }

  async getTrainingsForStudent(studentId: string): Promise<TrainingItem[]> {
    const command = new QueryCommand({
      TableName: this.trainingsTableName,
      IndexName: 'StudentTrainingsIndex',
      KeyConditionExpression: 'gsi2pk = :pk',
      ExpressionAttributeValues: { ':pk': `STUDENT#${studentId}` },
    });
    const { Items } = await this.ddbDocClient.send(command);
    return Items as TrainingItem[];
  }
  
  async getTrainingsForTrainer(trainerId: string): Promise<TrainingItem[]> {
    const command = new QueryCommand({
      TableName: this.trainingsTableName,
      IndexName: 'TrainerTrainingsIndex',
      KeyConditionExpression: 'gsi1pk = :pk',
      ExpressionAttributeValues: { ':pk': `TRAINER#${trainerId}` },
    });
    const { Items } = await this.ddbDocClient.send(command);
    return Items as TrainingItem[];
  }

  async scanAllTrainings(): Promise<any[]> {
    const command = new ScanCommand({
      TableName: this.trainingsTableName,
    });
    const { Items } = await this.ddbDocClient.send(command);
    return Items || [];
  }
}