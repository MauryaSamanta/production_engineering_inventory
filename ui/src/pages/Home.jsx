import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import LabTables from "../components/tables/LabTables";
import SearchSerial from "../components/search/SearchSerial";
import AdminChangeRequestsDashboard from "../components/Dashboard";
import SearchAssets from "../components/SearchAssets";

const Home = () => {

  const [selectedLab, setSelectedLab] = useState(null);
    const [selectedLabName, setSelectedLabName] = useState(null);
  const [mode, setMode] = useState("home");

  return (
    <Box
  sx={{
    display: "flex",
    background: "#f5f6fa",
    minHeight: "100vh"
  }}
>

      <Sidebar
        setSelectedLab={setSelectedLab}
        setMode={setMode}
        setSelectedLabName={setSelectedLabName}
      />

      <Box sx={{ p: 4, flex: 1 }}>

        {mode === "search" && <SearchAssets />}

        {mode==="home" && <AdminChangeRequestsDashboard/>}

        {mode === "lab" && selectedLab && (
          <LabTables lab={selectedLab} name={selectedLabName}/>
        )}

      </Box>

    </Box>
  );
};

export default Home;