import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface StatusProps {
  isActive: boolean;
}

const UserStatus: React.FC<StatusProps> = ({ isActive }) => {
  return (
    <Box>
      <Typography variant="h6">Status</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isActive ? (
          <>
            <CheckCircleOutlineIcon sx={{ color: "success.main", marginRight: 1 }} />
            <Typography variant="h6" sx={{ color: "success.main"}}>
              Active
            </Typography>
          </>
        ) : (
          <>
            <CancelOutlinedIcon sx={{ color: "error.main", marginRight: 1 }} />
            <Typography variant="h6" sx={{ color: "error.main" }}>
              Not Active
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserStatus;
