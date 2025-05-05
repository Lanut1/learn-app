import { Role } from "../types/auth.types";

export const isTrainer = (variant: Role | undefined) => {
  return variant === 'trainer';
};
