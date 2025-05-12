export type ChangePasswordInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface ChangePasswordFormProps{
  onSubmit: (data: ChangePasswordInputs) => Promise<void>;
  error?: string | null;
  loading?: boolean;
};
