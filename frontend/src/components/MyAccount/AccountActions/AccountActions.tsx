import { Box, Button } from "@mui/material";

const AccountActions = () => {
  return (
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}} my={5}>
      <Box sx={{display: "flex", gap: 2}}>
        <Button variant="contained" size="large">
          Edit profile
        </Button>
        <Button color="success" sx={{color: "background.paper"}} variant="contained" size="large">
          Change Password
        </Button>
      </Box>
      <Button color="error" variant="contained" size="large">
        Delete profile
      </Button>
    </Box>
  )
}

export default AccountActions;
