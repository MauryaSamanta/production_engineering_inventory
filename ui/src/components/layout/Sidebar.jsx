import { Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { labs } from "../../data/dummyData";

const Sidebar = ({ setSelectedLab, setMode }) => {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        "& .MuiDrawer-paper": { width: 260 }
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Production Management Inventory System
      </Typography>

      <List>

        <ListItemButton onClick={() => setMode("search")}>
          <ListItemText primary="Search By Serial Number" />
        </ListItemButton>

        {labs.map((lab) => (
          <ListItemButton
            key={lab}
            onClick={() => {
              setSelectedLab(lab);
              setMode("lab");
            }}
          >
            <ListItemText primary={lab} />
          </ListItemButton>
        ))}

      </List>
    </Drawer>
  );
};

export default Sidebar;