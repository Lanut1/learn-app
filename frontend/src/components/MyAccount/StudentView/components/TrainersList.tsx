import React from "react";
import { Typography, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

interface TrainersListProps {
  trainers: Array<{ name: string; specialization: string }>;
}

const TrainersList: React.FC<TrainersListProps> = ({ trainers }) => {
  return (
    <Box sx={{minWidth: "30%"}}>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, gap: 2}}>
        <Typography variant="h3">
          My Trainers
        </Typography>
        <Button variant="contained" size="large" component={RouterLink} to="/my-account/add-trainer" >Add trainer</Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 0, border: 1, borderColor: "background.muted" }}>
        <Table>
          <TableHead sx={{bgcolor: "background.default"}}>
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
                <TableCell>{trainer.specialization}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainersList;
