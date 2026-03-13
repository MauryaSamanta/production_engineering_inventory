import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e" // green
    },
    secondary: {
      main: "#4ade80"
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff"
    }
  },

  shape: {
    borderRadius: 14
  },

  typography: {
    fontFamily: "Inter, sans-serif"
  }
});

export default theme;