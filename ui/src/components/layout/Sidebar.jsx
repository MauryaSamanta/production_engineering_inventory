import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ScienceIcon from "@mui/icons-material/Science";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../auth/AuthContext";
import ManageSubAdminsDialog from "../../dialogs/ManageSubAdmins";
import { useState } from "react";

const Sidebar = ({
  labs = [],
  setSelectedLab,
  setMode,
  selectedLab,
  setSelectedLabName,
  onDeleteLab,
  openCreateModal // ✅ comes from Home
}) => {

  const drawerWidth = 270;
  const [openUsers, setOpenUsers] = useState(false);
  const { name, role, logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "linear-gradient(180deg,#7b3fe4,#9333ea)",
          color: "#fff",
          borderRight: "none"
        }
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

        {/* HEADER */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Production Engineering
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Inventory System
          </Typography>
        </Box>

        {/* DASHBOARD */}
        <List sx={{ px: 1 }}>
          <ListItemButton onClick={() => setMode("home")} sx={{ borderRadius: 2, mb: 1 }}>
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

        {/* SEARCH + CREATE */}
        <List sx={{ px: 1 }}>
          <ListItemButton onClick={() => setMode("search")} sx={{ borderRadius: 2, mb: 1 }}>
            <SearchIcon sx={{ mr: 2 }} />
            <ListItemText primary="Search Assets" />
          </ListItemButton>

          {/* 🔥 CREATE LAB BUTTON */}
          <ListItemButton
            onClick={openCreateModal}
            sx={{
              borderRadius: 2,
              mb: 1,
              background: "rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" }
            }}
          >
            ➕ <ListItemText primary="Create Lab" sx={{ ml: 1 }} />
          </ListItemButton>
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

        {/* LABS */}
        <Box sx={{ px: 3, pt: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            LABS
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>
          <List>
            {labs.length === 0 ? (
              <Typography sx={{ px: 2, py: 1 }}>No labs found</Typography>
            ) : (
              labs.map((lab) => (
                <ListItemButton
                  key={lab._id}
                  onClick={() => {
                    setSelectedLab(lab._id);
                    setSelectedLabName(lab.name);
                    setMode("lab");
                  }}
                  selected={selectedLab === lab._id}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScienceIcon sx={{ mr: 2 }} />
                    <ListItemText primary={lab.name} secondary={lab.type} />
                  </Box>

                  {/* DELETE */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLab(lab._id);
                    }}
                    sx={{ cursor: "pointer", color: "#ffb4b4" }}
                  >
                    🗑
                  </Box>
                </ListItemButton>
              ))
            )}
          </List>
        </Box>

      </Box>

      {/* USER */}
      <Box sx={{ p: 3 }}>
        <Typography variant="body2">Logged in as</Typography>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption">Role: {role}</Typography>

        <Button fullWidth onClick={() => setOpenUsers(true)} sx={{ mt: 2 }}>
          Manage Subadmin
        </Button>

        <Button fullWidth startIcon={<LogoutIcon />} onClick={logout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>

      <ManageSubAdminsDialog
        open={openUsers}
        onClose={() => setOpenUsers(false)}
      />
    </Drawer>
  );
};

export default Sidebar;