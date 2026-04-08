import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import LabTables from "../components/tables/LabTables";
import SearchSerial from "../components/search/SearchSerial";
import AdminChangeRequestsDashboard from "../components/Dashboard";
import SearchAssets from "../components/SearchAssets";
import CreateRoom from "../components/CreateRooms";

const Home = () => {

  const [selectedLab, setSelectedLab] = useState(null);
    const [selectedLabName, setSelectedLabName] = useState(null);
  const [mode, setMode] = useState("home");
  const [labs, setLabs] = useState([]);
  const fetchLabs = () => {
  fetch("https://production-engineering-inventory-1.onrender.com/api/rooms") // or /api/labs depending on your backend
    .then(res => res.json())
    .then(data => setLabs(data));
};
useEffect(() => {
  fetchLabs();
}, []);
  return (
    <Box
  sx={{
    display: "flex",
    background: "#f5f6fa",
    minHeight: "100vh",
    width:'100vw'
  }}
>

      <Sidebar
  labs={labs}
  refreshLabs={fetchLabs}
  setSelectedLab={setSelectedLab}
  setMode={setMode}
  setSelectedLabName={setSelectedLabName}
/>

      <Box
  sx={{
    p: 4,
    flex: 1,
    
    background: `
      linear-gradient(
        rgba(250, 249, 246, 0.6),
        rgba(250, 249, 246, 0.6)
      ),
      url("/department.png")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>

        {mode === "search" && <SearchAssets />}

        {mode==="home" && <AdminChangeRequestsDashboard/>}
        {mode==="create-lab" && <CreateRoom refreshRooms={fetchLabs}/>}
        {mode === "lab" && selectedLab && (
          <LabTables lab={selectedLab} name={selectedLabName}/>
        )}

      </Box>

    </Box>
  );
};

export default Home;