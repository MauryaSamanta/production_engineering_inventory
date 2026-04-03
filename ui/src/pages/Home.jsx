import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import LabTables from "../components/tables/LabTables";
import AdminChangeRequestsDashboard from "../components/Dashboard";
import SearchAssets from "../components/SearchAssets";
import CreateLabModal from "../components/modal/CreateLabModal"; // ✅ IMPORTANT

const Home = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedLabName, setSelectedLabName] = useState(null);
  const [mode, setMode] = useState("home");

  const [labs, setLabs] = useState([]);
  const [openCreate, setOpenCreate] = useState(false); // ✅ modal control

  // 🔥 Fetch labs
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/labs", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setLabs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLabs();
  }, []);

  // ✅ Add lab instantly
  const handleLabCreated = (newLab) => {
    setLabs((prev) => [...prev, newLab]);
  };

  // ✅ Delete lab
  const handleDeleteLab = async (id) => {
    if (!window.confirm("Delete this lab?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/labs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setLabs((prev) => prev.filter((lab) => lab._id !== id));

      // reset if deleted lab is active
      if (selectedLab === id) {
        setSelectedLab(null);
        setSelectedLabName(null);
        setMode("home");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", background: "#f5f6fa", minHeight: "100vh" }}>

      <Sidebar
        labs={labs}
        selectedLab={selectedLab}
        setSelectedLab={setSelectedLab}
        setSelectedLabName={setSelectedLabName}
        setMode={setMode}
        onDeleteLab={handleDeleteLab}

        // 🔥 trigger modal from sidebar
        openCreateModal={() => setOpenCreate(true)}
      />

      <Box sx={{ p: 4, flex: 1 }}>
        
        {mode === "home" && !openCreate && <AdminChangeRequestsDashboard />}
        {mode === "search" && !openCreate && <SearchAssets />}
        {mode === "lab" && selectedLab && !openCreate && (
        <LabTables lab={selectedLab} name={selectedLabName} />
)}
      </Box>

      {/* 🔥 MODAL OUTSIDE SIDEBAR */}
      {openCreate && (
        <CreateLabModal
          onClose={() => setOpenCreate(false)}
          onLabCreated={handleLabCreated}
        />
      )}

    </Box>
  );
};

export default Home;