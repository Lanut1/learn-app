import React from "react";
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
} from "@mui/material";

interface StudentsListProps {
  students: Array<{ name: string; isActive: boolean }>;
}

const StudentsList: React.FC<StudentsListProps> = ({ students }) => {
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
