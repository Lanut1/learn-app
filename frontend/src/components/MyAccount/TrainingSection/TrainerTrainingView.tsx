import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  getTrainingsForTrainer,
  Training,
} from "../../../services/trainings.service";
import dayjs, { Dayjs } from "dayjs";
import FullPageLoader from "../../PageLoading/PageLoading";

const TrainerTrainingView: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [nameFilter, setNameFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchTrainings = async () => {
        const data = await getTrainingsForTrainer();
        setTrainings(data);
        setFilteredTrainings(data);
      };
      fetchTrainings();
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    let result = trainings;

    if (nameFilter) {
      result = result.filter((training) =>
        training.participantName
          .toLowerCase()
          .includes(nameFilter.toLowerCase()),
      );
    }

    if (fromDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date, "DD.MM.YYYY").isAfter(fromDate) ||
          dayjs(training.date, "DD.MM.YYYY").isSame(fromDate),
      );
    }

    if (toDate) {
      result = result.filter(
        (training) =>
          dayjs(training.date, "DD.MM.YYYY").isBefore(toDate) ||
          dayjs(training.date, "DD.MM.YYYY").isSame(toDate),
      );
    }

    setFilteredTrainings(result);
  };

  if (loading) return <FullPageLoader />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" gap={4} mb={4}>
        <TextField
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          label="Student Name"
          variant="outlined"
        />
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(date) => setFromDate(date)}
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={(date) => setToDate(date)}
        />
      </Box>
      <Button variant="contained" onClick={handleSearch} size="large">
        Search
      </Button>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Training Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Participant Name</TableCell>
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
  );
};

export default TrainerTrainingView;
