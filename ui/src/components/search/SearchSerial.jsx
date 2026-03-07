import { Box, TextField, Typography } from "@mui/material";

const SearchSerial = () => {
  return (
    <Box>
      <Typography variant="h5">Search Asset</Typography>

      <TextField
        fullWidth
        label="Enter Serial Number"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default SearchSerial;