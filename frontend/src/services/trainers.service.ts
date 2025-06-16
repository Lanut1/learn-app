import { apiFetch } from "../utils/apiHelper";

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  isActive?: boolean; 
}

export const getAllTrainers = async (): Promise<Trainer[]> => {
  return apiFetch('/trainers');
};

export const getUserTrainers = async (): Promise<Trainer[]> => {
  return apiFetch('/trainers/me');
};

export const addTrainersToUser = async (
  trainerIds: string[],
): Promise<{ success: boolean; addedTrainerIds: string[] }> => {
  const payload = { trainerIds };
  return apiFetch('/trainers/me', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getMyStudents = async (): Promise<Student[]> => {
  return apiFetch('/trainers/my-students');
}
