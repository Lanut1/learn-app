import { ApiError } from "./auth.service";

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
}

const allTrainersMock: Trainer[] = [
  { id: "1", name: "Elizabeth Watson", specialization: "frontend" },
  { id: "2", name: "Elizabeth Allen", specialization: "fullstack" },
  { id: "3", name: "Caleb Jones", specialization: "backend" },
  { id: "4", name: "Javier Ortiz", specialization: "frontend" },
  { id: "5", name: "Brandon Taylor", specialization: "backend" },
  { id: "6", name: "Elizabeth Lopez", specialization: "fullstack" },
  { id: "7", name: "Matthew Martinez", specialization: "frontend" },
  { id: "8", name: "Elizabeth Hall", specialization: "backend" },
  { id: "9", name: "Maria White", specialization: "frontend" },
];

const myTrainersMock: Trainer[] = [
  { id: "1", name: "Elizabeth Watson", specialization: "frontend" },
  { id: "6", name: "Elizabeth Lopez", specialization: "fullstack" },
  { id: "7", name: "Matthew Martinez", specialization: "frontend" },
  { id: "9", name: "Maria White", specialization: "frontend" },
];

export const getAllTrainers = async (): Promise<Trainer[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return allTrainersMock;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    throw error;
  }
};

export const getUserTrainers = async (): Promise<Trainer[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return myTrainersMock;
  } catch (error) {
    console.error("Error fetching user trainers:", error);
    throw error;
  }
};

export const addTrainersToUser = async (trainerIds: string[]): Promise<{ success: boolean; addedTrainerIds: string[] }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!trainerIds || trainerIds.length === 0) {
      const error: ApiError = {
        status: 400,
        message: "No trainers selected",
        code: "NO_TRAINERS_SELECTED",
      };
      throw error;
    }

    return {
      success: true,
      addedTrainerIds: trainerIds,
    };
  } catch (error) {
    console.error("Error adding trainers:", error);
    throw error;
  }
};
