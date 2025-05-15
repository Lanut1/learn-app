import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Autocomplete,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useAuth } from "../context/authContext";
import { getUserTrainers } from "../services/trainers.service";
import { addTraining } from "../services/trainings.service";
import FullPageLoader from "../components/PageLoading/PageLoading";
import BreadcrumbsNavigation from "../components/Breadcrumbs/Breadcrumbs";
import { Link as RouterLink} from "react-router-dom";

const AddTrainingPage: React.FC = () => {
  const { currentUser, loading } = useAuth();

  const isStudent = currentUser?.role === "student";

  const [name, setName] = useState("");
  const [trainingDate, setTrainingDate] = useState<Dayjs | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);


  const [trainers, setTrainers] = useState<string[]>([]);
  const [loadingTrainers, setLoadingTrainers] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const userTrainers = await getUserTrainers();
        const trainerNames = userTrainers.map((trainer) => trainer.name);
        setTrainers(trainerNames);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      } finally {
        setLoadingTrainers(false);
      }
    };

    if (isStudent) {
      fetchTrainers();
    }
  }, [isStudent]);

  const handleAddTraining = async () => {
    try {
      await addTraining({
        date: trainingDate?.format("DD.MM.YYYY") ?? "",
        trainingName: name,
        type,
        participantName: selectedTrainer ?? "",
        duration,
      });

      setSnackbarMessage("Training added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setName("");
      setTrainingDate(null);
      setDuration(0);
      setType("");
      setDescription("");
      setSelectedTrainer(null);
    } catch (error) {
      console.error("Error adding training:", error);
      setSnackbarMessage("Failed to add training.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <FullPageLoader />;

  return (
    <Box mx={12} mt={5}>
      <BreadcrumbsNavigation
        breadcrumbItems={[
          { label: "My Account", href: "/my-account" },
          { label: "Trainings", href: "/my-account/trainings" },
          { label: "Add Training" },
        ]}
      />

      <Typography variant="h1" align="center" mb={5}>
        Add Training
      </Typography>

      {isStudent ? (
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4">Training</Typography>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
            />

            <DatePicker
              label="Training Start Date"
              value={trainingDate}
              onChange={(date) => setTrainingDate(date)}
              sx={{ width: "100%" }}
            />

            <TextField
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              type="number"
              variant="outlined"
              fullWidth
            />

            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="Webinar">Webinar</MenuItem>
              <MenuItem value="Workshop">Workshop</MenuItem>
              <MenuItem value="Course">Course</MenuItem>
            </TextField>

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />

            <Box>
              <Typography variant="h6" mb={1}>
                Add trainers
              </Typography>
              {loadingTrainers ? (
                <Typography color="text.secondary">Loading trainers...</Typography>
              ) : (
                <Autocomplete
                  options={trainers}
                  value={selectedTrainer}
                  onChange={(event, newValue) => setSelectedTrainer(newValue)}
                  renderInput={(params) => <TextField {...params} label="Trainer" />}
                />
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="error" size="large" component={RouterLink} to="/my-account/trainings">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTraining}
                disabled={loadingTrainers}
                size="large"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6" color="error" align="center">
          This page is only accessible to students.
        </Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTrainingPage;
