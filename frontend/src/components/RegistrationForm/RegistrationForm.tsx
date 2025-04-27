import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { studentSchema, trainerSchema } from "../../validators/registrationValidator";
import {
  TextField,
  Box,
  Typography,
  Button,
  Container,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { RegistrationData, Role } from "../../types/auth.types";
import { useAuth } from "../../context/authContext";
import { isTrainer } from "../../utils/isTrainer";
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
    control
  } = useForm<RegistrationData>({
    resolver: joiResolver(schema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {register: authRegister} = useAuth();

  const onSubmit = async (data: RegistrationData) => {
    setError(null);
    console.log("hello from on")

    try {
      const result = await authRegister({ ...data }, variant);
      if (result) setSubmitted(true);
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Registration failed");
    }
  };

  const isTrainerVariant = isTrainer(variant);

  if (submitted) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5" gutterBottom>
          {isTrainerVariant ? "Trainer" : "Student"} registered successfully!
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <Container>
      <Typography variant="h2">
      Registration
      </Typography>
      <Typography variant="subtitle1" sx={{color: 'text.secondary', mb: 5}}>
        {isTrainerVariant ? "Trainer" : "Student"}
      </Typography>
      <Box sx={{display: "flex", gap: 12}}>
        <Box
          component="img"
          src={`/images/${isTrainerVariant ? "trainerRegistration.jpg" : "studentRegistration.jpeg"}`}
          sx={{
            width: '40%',
            objectFit: 'cover',
            borderRadius: 1.5
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)} style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1
        }}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
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
                          margin: 'normal',
                        },
                      }}
                    />)}
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

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
    </>
  );
};
