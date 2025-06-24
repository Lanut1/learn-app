import React from "react";
import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { Trainer } from "../../../services/trainers.service";
import { SPECIALIZATION_LABELS } from "../../Registration/RegistrationForm/utils";

interface AllTrainersListProps {
  trainers: Trainer[];
  selectedTrainers: string[];
  disabledTrainers: string[];
  onSelectTrainer: (id: string) => void;
}

const AllTrainersList: React.FC<AllTrainersListProps> = ({
  trainers,
  selectedTrainers,
  disabledTrainers,
  onSelectTrainer,
}) => {
  return (
    <Box sx={{ minWidth: "45%" }}>
      <Typography variant="h3" mb={2}>
        All Trainers
      </Typography>
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
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>SPECIALIZATION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTrainers.includes(trainer.id)}
                    onChange={() => onSelectTrainer(trainer.id)}
                    disabled={disabledTrainers.includes(trainer.id)}
                  />
                </TableCell>
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

export default AllTrainersList;
