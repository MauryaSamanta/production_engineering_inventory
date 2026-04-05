import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem
} from "@mui/material";
import { useState } from "react";

const CreateRoom = ({ refreshRooms }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("lab");

  const handleSubmit = async () => {
    await fetch("https://production-engineering-inventory.onrender.com/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code, name, type })
    });

    setCode("");
    setName("");
    setType("lab");

    refreshRooms();
  };

  return (
    <Box sx={{ maxWidth: 400, borderRadius: 1, background: "#f5f6fa97", p:4 }}>
      <Typography variant="h5" mb={2}>
        Create Room
      </Typography>

      <TextField
        fullWidth
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        fullWidth
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="lab">Lab</MenuItem>
        <MenuItem value="classroom">Classroom</MenuItem>
        <MenuItem value="seminar_hall">Seminar Hall</MenuItem>
        <MenuItem value="office">Office</MenuItem>
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
};

export default CreateRoom;