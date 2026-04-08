import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true)
    try {

      const res = await fetch(
        "https://production-engineering-inventory-1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (data.token) {

        login(data.token, data.role, data.name);

        navigate("/");
        
      } else {
        alert("Login failed");
      }
      setLoading(false)
    } catch (err) {
      console.error(err);
    }

  };

  return (

    <Box
  sx={{
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: `
      linear-gradient(
        rgba(123, 63, 228, 0.75),
        rgba(147, 51, 234, 0.75)
      ),
      url("/department.png")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>

      <Paper
        elevation={6}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          backdropFilter: "blur(6px)"
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 1
          }}
        >
          Jadavpur University Production Engineering Inventory System
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "text.secondary"
          }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(e) => setPassword(e.target.value)}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">

                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>

              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          onClick={handleLogin}
          sx={{
            py: 1.4,
            color:"white",
            borderRadius: 2,
            textTransform: "none",
            fontSize: 16,
            background:
              "linear-gradient(135deg,#7b3fe4,#9333ea)",
            "&:hover": {
              background:
                "linear-gradient(135deg,#6d28d9,#7e22ce)"
            }
          }}
        >
          {loading ? (
    <CircularProgress size={22} sx={{ color: "white" }} />
  ) : (
    "Login"
  )}
        </Button>

      </Paper>

    </Box>

  );
};

export default Login;