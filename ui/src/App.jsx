import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import ProtectedRoute from "./auth/protectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateLab from "./pages/CreateLab";

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

            <Route
               path="/create-lab"
                element={
                  <ProtectedRoute>
                    <CreateLab />
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