import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import NonConsumablesTable from "./tables/NonConsumablesTable";

const categories = [
  "Machine",
  "Tool",
  "Computer",
  "Furniture",
  "Office",
  "Automation",
  "Lab Equipment",
  "Scrap"
];

const conditions = [
  "working",
  "not working",
  "under_repair"
];

const SearchAssets = () => {

  const { token } = useAuth();

  const [filters, setFilters] = useState({
    serialNumber: "",
    name: "",
    category: "",
    manufacturer: "",
    situation: "",
    yearOfManufacture: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {

    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));

  };

  const resetFilters = () => {

    setFilters({
      serialNumber: "",
      name: "",
      category: "",
      manufacturer: "",
      situation: "",
      yearOfManufacture: ""
    });

    setResults([]);

  };

  const searchAssets = async () => {

    try {

      setLoading(true);

      const query = new URLSearchParams(filters).toString();

      const res = await fetch(
        `https://production-engineering-inventory.onrender.com/api/assets/search?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setResults(data.assets || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  return (

    <Box sx={{ p: 4 }}>

      {/* PAGE TITLE */}

 


      {/* FILTER CARD */}

      <Card
  sx={{
    borderRadius: 1,
    mb: 3,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  }}
>
       
  <CardContent sx={{ p: 2 }}>
    <Typography variant="h5" sx={{ mb: 3 }}>
        Search Assets
      </Typography>
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap", // Allows items to move to next line if screen is small
      gap: 2,           // Space between elements
      alignItems: "center",
    }}
  >
    {/* Serial Number */}
    <TextField
      size="small"
      label="Serial Number"
      value={filters.serialNumber}
      onChange={(e) => handleChange("serialNumber", e.target.value)}
      sx={{ minWidth: "150px", flex: 1 }} // flex: 1 lets it grow
    />

    {/* Category Dropdown */}
    <TextField
      select
      size="small"
      label="Category"
      value={filters.category}
      onChange={(e) => handleChange("category", e.target.value)}
      sx={{ minWidth: "180px", flex: 1 }} // Higher minWidth prevents "C.."
    >
      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
      ))}
    </TextField>

    {/* Condition Dropdown */}
    <TextField
      select
      size="small"
      label="Condition"
      value={filters.situation}
      onChange={(e) => handleChange("situation", e.target.value)}
      sx={{ minWidth: "180px", flex: 1 }}
    >
      {conditions.map((c) => (
        <MenuItem key={c} value={c}>{c}</MenuItem>
      ))}
    </TextField>

    {/* Manufacturer */}
    <TextField
      size="small"
      label="Manufacturer"
      value={filters.manufacturer}
      onChange={(e) => handleChange("manufacturer", e.target.value)}
      sx={{ minWidth: "150px", flex: 1 }}
    />

    {/* Search Buttons Group */}
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="contained"
        onClick={searchAssets}
        sx={{ height: 40, minWidth: "50px", bgcolor: "#22c55e" }}
      >
        <SearchIcon />
      </Button>
      <Button
        variant="outlined"
        onClick={resetFilters}
        sx={{ height: 40, minWidth: "50px" }}
      >
        <RestartAltIcon />
      </Button>
    </Box>
  </Box>
</CardContent>
</Card>

      {/* RESULTS */}

      {loading && (
        <CircularProgress />
      )}

      {!loading && results.length > 0 && (

        <Card sx={{ borderRadius: 1}}>

          <CardContent>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Results ({results.length})
            </Typography>

            <NonConsumablesTable data={results} showLab/>

          </CardContent>

        </Card>

      )}

      {!loading && results.length === 0 && (

        <Typography color="text.secondary">
          Apply filters and search to view assets
        </Typography>

      )}

    </Box>

  );

};

export default SearchAssets;