import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import ProtectedRoute from "./auth/protectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;