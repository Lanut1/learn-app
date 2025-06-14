import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DYNAMO_DB_DOCUMENT_CLIENT } from './dynamodb.constants';

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

@Injectable()
export class DynamodbService {
  private readonly usersTableName: string;

  constructor(
    @Inject(DYNAMO_DB_DOCUMENT_CLIENT)
    private readonly ddbDocClient: DynamoDBDocumentClient,
    private readonly configService: ConfigService,
  ) {
    this.usersTableName = this.configService.getOrThrow<string>('DYNAMODB_TABLE_USERS');
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
}