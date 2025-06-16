import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}
