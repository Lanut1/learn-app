import { Module } from '@nestjs/common';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamodbService } from './dynamodb.service';
import { DYNAMO_DB_DOCUMENT_CLIENT } from './dynamodb.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DYNAMO_DB_DOCUMENT_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const clientConfig: DynamoDBClientConfig = {
          region: configService.getOrThrow<string>('AWS_REGION'),
        };

        const endpointUrl = configService.get<string>('DYNAMODB_ENDPOINT');
        console.log('DYNAMODB_ENDPOINT from config:', endpointUrl);
        
        if (endpointUrl) {
          console.log(`Local mode detected. Forcing endpoint to: ${endpointUrl}`);
          clientConfig.endpoint = endpointUrl;
          
          clientConfig.credentials = {
            accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID', 'dummykey'),
            secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY', 'dummysecret'),
          };
        } else {
          console.log('Production mode detected. Using default AWS endpoint.');
        }

        const ddbClient = new DynamoDBClient(clientConfig);
        return DynamoDBDocumentClient.from(ddbClient);
      },
    },
    DynamodbService,
  ],
  exports: [DynamodbService],
})

export class DynamodbModule {}
