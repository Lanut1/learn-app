import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { getTrainingsForTrainer, Training } from "../../../services/trainings.service";
import { Link as RouterLink } from "react-router-dom";

const StudentTrainingView: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [trainerNameFilter, setTrainerNameFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      const data = await getTrainingsForTrainer();
      setTrainings(data);
      setFilteredTrainings(data);
    };

    fetchTrainings();
  }, []);

  const handleSearch = () => {
    let result = trainings;

    if (trainerNameFilter) {
      result = result.filter((training) =>
        training.participantName.toLowerCase().includes(trainerNameFilter.toLowerCase())
      );
    }

    if (specializationFilter) {
      result = result.filter((training) =>
        training.trainingName.toLowerCase().includes(specializationFilter.toLowerCase())
      );
    }

    if (fromDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date, "DD.MM.YYYY").isAfter(fromDate, "day") ||
          dayjs(training.date, "DD.MM.YYYY").isSame(fromDate, "day")
      );
    }

    if (toDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date, "DD.MM.YYYY").isBefore(toDate, "day") ||
          dayjs(training.date, "DD.MM.YYYY").isSame(toDate, "day")
      );
    }

    setFilteredTrainings(result);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ color: "background.paper" }}
          component={RouterLink}
          to="/my-account/trainings/add-training"
        >
          Add Training
        </Button>
      </Box>

      <Box>
        <Typography variant="h3" mb={2}>
          Search Trainings
        </Typography>
        <Box display="flex" justifyContent="space-between" gap={4} alignItems="center" mb={4}>
          <TextField
            value={trainerNameFilter}
            onChange={(e) => setTrainerNameFilter(e.target.value)}
            label="Trainer Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            label="Specialization"
            variant="outlined"
            fullWidth
          />
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(date) => setFromDate(date)}
            sx={{ width: "100%" }}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={(date) => setToDate(date)}
            sx={{ width: "100%" }}
          />
        </Box>
        <Button variant="contained" onClick={handleSearch} size="large" sx={{ mb: 5 }}>
          Search
        </Button>
      </Box>
      <Box>
        <Typography variant="h3" mb={2}>
          My Trainings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Training Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Trainer Name</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>{training.date}</TableCell>
                  <TableCell>{training.trainingName}</TableCell>
                  <TableCell>{training.type}</TableCell>
                  <TableCell>{training.participantName}</TableCell>
                  <TableCell>{training.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default StudentTrainingView;