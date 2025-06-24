export type UserItem = {
  pk: string;
  sk: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  hashedPassword: string;
  createdAt: string;
  dob?: string;
  address?: string;
  specialization?: string;
  photo?: string;
  isActive?: boolean;
};

export type StudentTrainerLinkItem = {
  pk: string;
  sk: string;
  gsi1pk: string;
  gsi1sk: string;
  createdAt: string;
};

export type TrainingItem = {
  pk: string;
  sk: string;
  trainingId: string;
  studentId: string;
  trainerId: string;
  studentName: string;
  trainerName: string;
  date: string;
  trainingName: string;
  type: string;
  duration: number;
  gsi1pk: string;
  gsi1sk: string;
  gsi2pk: string;
  gsi2sk: string;
  createdAt: string;
};
