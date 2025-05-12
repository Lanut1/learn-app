import { useState } from "react";
import ChangePasswordForm from "../components/MyAccount/ChangePasswordForm/ChangePasswordForm";
import { useAuth } from "../context/authContext";
import { ChangePasswordInputs } from "../types/account.types";
import ChangePasswordSuccess from "../components/MyAccount/ChangePasswordForm/ChangePasswordSuccess";

const ChangePasswordPage: React.FC = () => {
  const { changePassword, error, loading } = useAuth();
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<boolean>(false);

  const onSubmit = async (data: ChangePasswordInputs) => {
    try {
      const result = await changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword
      );

      if (result) setPasswordChangeSuccess(true);
    } catch (err) {
      console.error("Error during password change:", err);
      setPasswordChangeSuccess(false);
    }
  };

  return (
    <>
      {passwordChangeSuccess ? (
        <ChangePasswordSuccess/>
      ) : (
        <ChangePasswordForm onSubmit={onSubmit} loading={loading} error={error} />
      )}
    </>
  );
};

export default ChangePasswordPage;
