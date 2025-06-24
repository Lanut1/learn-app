import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AssignTrainersDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsUUID('4', { each: true, message: 'Each trainerId must be a valid UUID' })
  trainerIds: string[];
}
