import { Box, Typography } from "@mui/material";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box mb={2}>
    <Typography variant="h6">
      {label}
    </Typography>
    <Typography variant="h6" fontWeight={400}>
      {value}
    </Typography>
  </Box>
);

export default InfoItem;
