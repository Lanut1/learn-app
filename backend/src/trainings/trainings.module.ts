import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
