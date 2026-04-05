import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ScienceIcon from "@mui/icons-material/Science";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { labs } from "../../data/dummyData";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import ManageSubAdminsDialog from "../../dialogs/ManageSubAdmins";
const Sidebar = ({
  labs,
  refreshLabs,
  setSelectedLab,
  setMode,
  selectedLab,
  setSelectedLabName
})=> {

  const drawerWidth = 270;
const [openUsers, setOpenUsers] = useState(false);
  const { name,role, logout } = useAuth();
  const [openSections, setOpenSections] = useState({
  lab: true,
  classroom: true,
  seminar_hall: true,
  office: true
});

const toggleSection = (type) => {
  setOpenSections((prev) => ({
    ...prev,
    [type]: !prev[type]
  }));
};

  const grouped = {
  lab: [],
  classroom: [],
  seminar_hall: [],
  office: []
};

(labs || []).forEach((room) => {
  if (grouped[room.type]) {
    grouped[room.type].push(room);
  }
});

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
      borderRight: "none",

      // overflow: "hidden",

      /* Hide scrollbar completely */

      scrollbarWidth: "none",
      msOverflowStyle: "none",

      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  }}
>

      {/* TOP SECTION */}

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

  <List sx={{ px: 1 }}>

    <ListItemButton
      onClick={() => setMode("home")}
      sx={{
        borderRadius: 2,
        mb: 1,
        "&:hover": { backgroundColor: "#2a2a40" }
      }}
    >
      {/* <SearchIcon sx={{ mr: 2 }} /> */}
      <DashboardIcon sx={{ mr: 2 }} />
      <ListItemText primary="Dashboard" />
    </ListItemButton>

  </List>
  <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
       <Box sx={{ px: 3, pt: 2 }}>
    <Typography
      variant="caption"
      sx={{ opacity: 0.6, letterSpacing: 1 }}
    >
      UTILITIES
    </Typography>
  </Box>
  {/* SEARCH */}

  <List sx={{ px: 1 }}>

    <ListItemButton
      onClick={() => setMode("search")}
      sx={{
        borderRadius: 2,
        mb: 1,
        "&:hover": { backgroundColor: "#2a2a40" }
      }}
    >
      <SearchIcon sx={{ mr: 2 }} />
      <ListItemText primary="Search Assets" />
    </ListItemButton>

    <ListItemButton
     onClick={() => setMode("create-lab")}
      sx={{
        borderRadius: 2,
        mb: 1,
        "&:hover": { backgroundColor: "#2a2a40" }
      }}
    >
      <AddIcon sx={{ mr: 2 }} />
      <ListItemText primary="Create Labs" />
    </ListItemButton>

  </List>

  <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

  {/* LABS HEADER */}

  {/* <Box sx={{ px: 3, pt: 2 }}>
    <Typography
      variant="caption"
      sx={{ opacity: 0.6, letterSpacing: 1 }}
    >
      LABS
    </Typography>
  </Box> */}

  {/* SCROLLABLE LABS */}

  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      px: 1,
      overflowY: "auto",

"&::-webkit-scrollbar": {
  width: "6px"
},

"&::-webkit-scrollbar-thumb": {
  background: "rgba(255,255,255,0.35)",
  borderRadius: "3px"
}
    }}
  >

    <List>

      {Object.entries(grouped).map(([type, items]) => (
  <Box key={type}>
    
    {items.length > 0 && (
      <Typography
  onClick={() => toggleSection(type)}
  sx={{
    px: 2,
    pt: 2,
    pb: 1,
    fontSize: 12,
    opacity: 0.6,
    cursor: "pointer",
    userSelect: "none"
  }}
>
  {type.toUpperCase()}
</Typography>
    )}

    {openSections[type] && items.map((lab) => (
      <ListItemButton
        key={lab.code}
        onClick={() => {
          setSelectedLab(lab.code);
          setSelectedLabName(lab.name);
          setMode("lab");
        }}
        selected={selectedLab === lab.code}
        sx={{
          borderRadius: 2,
          mb: 1,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.15)"
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.25)"
          }
        }}
      >
        <ScienceIcon sx={{ mr: 2 }} />
        <ListItemText primary={lab.name} />
      </ListItemButton>
    ))}
  </Box>
))}
    </List>

  </Box>

</Box>

      {/* BOTTOM USER PANEL */}

      <Box
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255,255,255,0.15)"
        }}
      >

        <Typography
          variant="body2"
          sx={{ opacity: 0.8 }}
        >
          Logged in as
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
        >
          {name}
        </Typography>

        <Typography
          variant="caption"
          sx={{ opacity: 0.7 }}
        >
          Role: {role}
        </Typography>
        {role==="admin" && (<Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => setOpenUsers(true)}
          sx={{
            mt: 2,
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)"
            }
          }}
        >
          Manage Subadmin
        </Button>)}
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{
            mt: 2,
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)"
            }
          }}
        >
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