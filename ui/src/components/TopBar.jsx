import { Box, TextField } from "@mui/material";

const Topbar = () => {
  return (
    <Box
      sx={{
        p: 2,
        background: "#fff",
        borderRadius: 3,
        mb: 3,
        boxShadow: "0px 6px 20px rgba(0,0,0,0.05)"
      }}
    >
      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
      />
    </Box>
  );
};

export default Topbar;