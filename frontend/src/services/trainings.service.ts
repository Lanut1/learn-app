import { apiFetch } from "../utils/apiHelper";

export interface Training {
  trainingId: string;
  studentId: string;
  trainerId: string;
  date: string;
  trainingName: string;
  type: string;
  studentName: string;
  trainerName: string;
  duration: number;
  createdAt: string;
}

export interface AddTrainingPayload {
  trainingName: string;
  type: string;
  trainerId: string;
  studentId: string;
  duration: number;
  date: string;
}

export const getMyTrainings = async (): Promise<Training[]> => {
  return apiFetch('/trainings/me');
};

export const addTraining = async (
  trainingData: AddTrainingPayload,
): Promise<Training> => {
  return apiFetch('/trainings', {
    method: 'POST',
    body: JSON.stringify(trainingData),
  });
};
