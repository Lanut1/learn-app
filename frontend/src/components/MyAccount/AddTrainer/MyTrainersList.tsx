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
} from "@mui/material";
import { Trainer } from "../../../services/trainers.service";
import { SPECIALIZATION_LABELS } from "../../Registration/RegistrationForm/utils";

interface MyTrainersListProps {
  myTrainers: Trainer[];
}

const MyTrainersList: React.FC<MyTrainersListProps> = ({ myTrainers }) => {
  return (
    <Box sx={{ minWidth: "45%" }}>
      <Typography variant="h3" mb={2}>
        My Trainers
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
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>SPECIALIZATION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myTrainers.map((trainer) => (
              <TableRow key={trainer.id}>
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

export default MyTrainersList;
