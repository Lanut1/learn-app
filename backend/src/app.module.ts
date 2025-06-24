import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TrainingsModule } from './trainings/trainings.module';
import { TrainersModule } from './trainers/trainers.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DynamodbModule,
    AuthModule,
    TrainingsModule,
    TrainersModule,
    PasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
