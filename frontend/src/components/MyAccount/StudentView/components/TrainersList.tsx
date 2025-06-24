import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getUserTrainers, Trainer } from "../../../../services/trainers.service";
import { SPECIALIZATION_LABELS } from "../../../Registration/RegistrationForm/utils";

const TrainersList: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserTrainers();
        setTrainers(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  
  return (
    <Box sx={{ minWidth: "30%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        <Typography variant="h3">My Trainers</Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/my-account/add-trainer"
        >
          Add trainer
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 0,
          border: 1,
          borderColor: "background.muted",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>SPECIALIZATION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers?.map((trainer, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {trainer.name}
                </TableCell>
                <TableCell>{SPECIALIZATION_LABELS[trainer.specialization]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainersList;
