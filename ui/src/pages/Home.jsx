import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import LabTables from "../components/tables/LabTables";
import SearchSerial from "../components/search/SearchSerial";

const Home = () => {

  const [selectedLab, setSelectedLab] = useState(null);
  const [mode, setMode] = useState("lab");

  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar
        setSelectedLab={setSelectedLab}
        setMode={setMode}
      />

      <Box sx={{ p: 4, flex: 1 }}>

        {mode === "search" && <SearchSerial />}

        {mode === "lab" && selectedLab && (
          <LabTables lab={selectedLab} />
        )}

      </Box>

    </Box>
  );
};

export default Home;