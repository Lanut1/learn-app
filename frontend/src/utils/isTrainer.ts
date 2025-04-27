import { Role } from "../types/auth.types";

export const isTrainer = (variant: Role) => {
  return variant === 'trainer';
};
