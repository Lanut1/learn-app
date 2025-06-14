import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import FullPageLoader from "../../PageLoading/PageLoading";

const AccountActions = () => {
  const { deleteAccount, loading, error } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    await deleteAccount();
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      my={5}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/my-account/edit-profile"
        >
          Edit profile
        </Button>
        <Button
          color="success"
          sx={{ color: "background.paper" }}
          variant="contained"
          size="large"
          component={RouterLink}
          to="/my-account/change-password"
        >
          Change Password
        </Button>
      </Box>
      <Button
        color="error"
        variant="contained"
        size="large"
        onClick={handleOpen}
      >
        Delete profile
      </Button>

      {error && (
        <Alert severity="error" sx={{ m: 3 }}>
          {error}
        </Alert>
      )}

      {loading && <FullPageLoader />}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Profile Deletion Confirmation
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            We're truly sorry to see you go. Before you proceed with deleting
            your profile, we want you to know that this action is permanent
            and irreversible. You'll lose access to all your account
            information, course progress, certificates, and any learning
            communities you're a part of.
          </Typography>
          <Typography variant="body2">
            If there's anything we can do to improve your experience or if you
            need assistance with any issues you've encountered, please reach
            out to our support team. We're always here to help.
          </Typography>
          <Typography variant="body2" mt={2}>
            If you still wish to delete your account, please click on the
            'Confirm' button below.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountActions;
