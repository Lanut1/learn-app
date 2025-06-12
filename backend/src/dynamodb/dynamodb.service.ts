import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DYNAMO_DB_DOCUMENT_CLIENT } from './dynamodb.constants';

export type UserItem = {
  pk: string;
  sk: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  hashedPassword: string;
  createdAt: string;
  dob?: string;
  address?: string;
  specialization?: string;
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
}