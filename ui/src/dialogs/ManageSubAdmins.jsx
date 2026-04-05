import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const ManageSubAdminsDialog = ({ open, onClose }) => {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adding, setAdding] = useState(false);

  const { token, role } = useAuth();

  const fetchUsers = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      setUsers(data.users || []);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  const createSubAdmin = async () => {

    try {

      setAdding(true);

      const res = await fetch("http://localhost:5000/api/users/subadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const newUser = await res.json();

      /* update table instantly */

      setUsers((prev) => [newUser, ...prev]);

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }

  };

  const promoteToAdmin = async (id) => {

    try {

      await fetch(`http://localhost:5000/api/users/promote/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchUsers();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Manage Subadmins
      </DialogTitle>

      <DialogContent>

        {/* CREATE SUBADMIN FORM */}

        {role === "admin" && (

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3
          }}
        >

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={createSubAdmin}
            disabled={adding}
          >
            {adding ? <CircularProgress size={20} /> : "Add"}
          </Button>

        </Box>

        )}

        {/* USERS TABLE */}

        <Box
  sx={{
    maxHeight: 350,
    overflowY: "auto",

    /* sexy scrollbar */

    "&::-webkit-scrollbar": {
      width: "8px"
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px"
    },

    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg,#7b3fe4,#9333ea)",
      borderRadius: "10px"
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "linear-gradient(180deg,#6b32d9,#7e22ce)"
    }
  }}
>
  <Table>

    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>

      {users.map((user) => (

        <TableRow key={user._id}>

          <TableCell>{user.name}</TableCell>

          <TableCell>{user.email}</TableCell>

          <TableCell>
            <Typography
              sx={{
                fontWeight: 600,
                color:
                  user.role === "admin"
                    ? "primary.main"
                    : "text.secondary"
              }}
            >
              {user.role}
            </Typography>
          </TableCell>

          <TableCell align="right">

            {user.role === "subadmin" && role === "admin" && (

              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  promoteToAdmin(user._id)
                }
              >
                Make Admin
              </Button>

            )}

          </TableCell>

        </TableRow>

      ))}

    </TableBody>

  </Table>
</Box>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Close
        </Button>

      </DialogActions>

    </Dialog>

  );

};

export default ManageSubAdminsDialog;