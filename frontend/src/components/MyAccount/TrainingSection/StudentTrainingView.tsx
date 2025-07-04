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
import {
  getMyTrainings,
  Training,
} from "../../../services/trainings.service";
import { Link as RouterLink } from "react-router-dom";
import FullPageLoader from "../../PageLoading/PageLoading";

const StudentTrainingView: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [trainerNameFilter, setTrainerNameFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const data = await getMyTrainings();
        setTrainings(data);
        setFilteredTrainings(data);
      } catch (error) {
        console.error("Failed to fetch trainings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  const handleSearch = () => {
    let result = trainings;

    if (trainerNameFilter) {
      result = result.filter((training) =>
        training.trainerName
          .toLowerCase()
          .includes(trainerNameFilter.toLowerCase()),
      );
    }

    if (specializationFilter) {
      result = result.filter((training) =>
        training.trainingName
          .toLowerCase()
          .includes(specializationFilter.toLowerCase()),
      );
    }

    if (fromDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date).isSame(fromDate, "day") ||
          dayjs(training.date).isAfter(fromDate, "day")
      );
    }

    if (toDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date).isSame(toDate, "day") ||
          dayjs(training.date).isBefore(toDate, "day")
      );
    }

    setFilteredTrainings(result);
  };

  if (loading) return <FullPageLoader />;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
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
        <Box
          display="flex"
          justifyContent="space-between"
          gap={4}
          alignItems="center"
          mb={4}
        >
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
            label="Training Name"
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
        <Button
          variant="contained"
          onClick={handleSearch}
          size="large"
          sx={{ mb: 5 }}
        >
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
                <TableRow key={training.trainingId}>
                  <TableCell>{training.date}</TableCell>
                  <TableCell>{training.trainingName}</TableCell>
                  <TableCell>{training.type}</TableCell>
                  <TableCell>{training.trainerName}</TableCell>
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
