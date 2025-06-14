import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  TextField,
  Box,
  Typography,
  Button,
  Container,
  MenuItem,
  Alert,
} from "@mui/material";
import { useState } from "react";

import SuccessRegistration, {
  SubmittedData,
} from "../RegistrationSuccess/RegistrationSuccess";
import {
  studentSchema,
  trainerSchema,
} from "../../../validators/registrationValidator";
import { RegistrationData, Role } from "../../../types/auth.types";
import { useAuth } from "../../../context/authContext";
import { isTrainer } from "../../../utils/isTrainer";
import FullPageLoader from "../../PageLoading/PageLoading";
import { DatePicker } from "@mui/x-date-pickers";
import { SPECIALIZATIONS } from "./utils";

const schemaMap = {
  student: studentSchema,
  trainer: trainerSchema,
};

export const RegistrationForm = ({ variant }: { variant: Role }) => {
  const schema = schemaMap[variant];
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegistrationData>({
    resolver: joiResolver(schema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null,
  );
  const { register: authRegister, error, loading } = useAuth();

  const onSubmit = async (data: RegistrationData) => {
    const result = await authRegister({ ...data, role: variant });

    if (result) {
      setSubmitted(true);
      setSubmittedData({
        username: result.user.username,
        password: data.password,
        email: result.user.email,
      });
    }
  };

  const isTrainerVariant = isTrainer(variant);

  if (submitted && submittedData)
    return <SuccessRegistration submittedData={submittedData} />;

  return (
    <>
      <Container>
        <Typography variant="h2">Registration</Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 5 }}>
          {isTrainerVariant ? "Trainer" : "Student"}
        </Typography>
        <Box sx={{ display: "flex", gap: 12 }}>
          <Box
            component="img"
            src={`/images/${isTrainerVariant ? "trainerRegistration.jpg" : "studentRegistration.jpeg"}`}
            sx={{
              width: "40%",
              objectFit: "cover",
              borderRadius: 1.5,
            }}
          />
          {loading && <FullPageLoader />}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {!isTrainerVariant ? (
                <>
                  <Controller
                    control={control}
                    name="dob"
                    defaultValue={undefined}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={field.value || null}
                        label="Date of Birth (optional)"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            margin: "normal",
                          },
                        }}
                      />
                    )}
                  />
                  <TextField
                    label="Address (optional)"
                    fullWidth
                    margin="normal"
                    {...register("address")}
                  />
                </>
              ) : (
                <Controller
                  control={control}
                  name="specialization"
                  render={({ field }) => (
                    <TextField
                      select
                      label="Specialization"
                      fullWidth
                      margin="normal"
                      defaultValue=""
                      {...field}
                      error={!!errors.specialization}
                      helperText={errors.specialization?.message}
                    >
                      {SPECIALIZATIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              )}
            </Box>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
