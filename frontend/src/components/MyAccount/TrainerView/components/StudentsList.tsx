import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getMyStudents, Student } from "../../../../services/trainers.service";

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyStudents();
        setStudents(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while fetching students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
      <Typography variant="h3" gutterBottom>
        My Students
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
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {student.name}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: student.isActive ? "success.main" : "error.main",
                    }}
                  >
                    {student.isActive ? "ACTIVE" : "NOT ACTIVE"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentsList;
