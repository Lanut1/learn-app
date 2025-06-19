import { IsString, IsNotEmpty, IsInt, Min, IsUUID, IsDateString } from 'class-validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  @IsString()
  trainingName: string;

  @IsNotEmpty()
  @IsString()
  type: string;
  
  @IsNotEmpty()
  @IsUUID('4')
  trainerId: string;

  @IsNotEmpty()
  @IsUUID('4')
  studentId: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsDateString()
  date: string;
}
