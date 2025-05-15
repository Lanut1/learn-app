export interface Training {
  id: string;
  date: string;
  trainingName: string;
  type: string;
  participantName: string;
  duration: number;
}

const studentTrainingsMockData: Training[] = [
  { id: "1", date: "12.03.2025", trainingName: "JavaScript Course", type: "Webinar", participantName: "Marta Block", duration: 15 },
  { id: "2", date: "15.03.2025", trainingName: "React Basics", type: "Webinar", participantName: "Anna Ivanova", duration: 10 },
  { id: "3", date: "15.03.2025", trainingName: "Node.js Basics", type: "Webinar", participantName: "Emily Smith", duration: 2 },
];

const trainerTrainingsMockData: Training[] = [
  { id: "4", date: "12.03.2025", trainingName: "JavaScript Course", type: "Webinar", participantName: "Matthew Martinez", duration: 15 },
  { id: "5", date: "14.03.2025", trainingName: "Java Basics", type: "Webinar", participantName: "Maria White", duration: 2 },
  { id: "6", date: "15.03.2025", trainingName: "React Basics", type: "Webinar", participantName: "Anna Ivanova", duration: 10 },
  { id: "7", date: "15.03.2025", trainingName: "Node.js Basics", type: "Webinar", participantName: "Emily Smith", duration: 2 },
];

export const getTrainingsForStudent = async (): Promise<Training[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return studentTrainingsMockData;
};

export const getTrainingsForTrainer = async (): Promise<Training[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return trainerTrainingsMockData;
};

export const addTraining = async (training: Omit<Training, "id">): Promise<Training> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTraining = { id: Math.random().toString(36).substring(2, 9), ...training };
  trainerTrainingsMockData.push(newTraining);
  return newTraining;
};
