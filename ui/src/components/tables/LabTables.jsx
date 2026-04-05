import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Skeleton
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

import ConsumablesTable from "./ConsumablesTable";
import NonConsumablesTable from "./NonConsumablesTable";

const LabTables = ({ lab, name }) => {

  const [consumables, setConsumables] = useState([]);
  const [nonConsumables, setNonConsumables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAssets = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/assets/lab/${lab}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch assets");
        }

        const data = await res.json();

        setConsumables(data.consumables || []);
        setNonConsumables(data.nonConsumables || []);

      } catch (err) {
        console.error("Error fetching assets:", err);
      } finally {
        setLoading(false);
      }

    };

    if (lab) fetchAssets();

  }, [lab]);

  /* ---------- LOADING STATE ---------- */

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width={250} height={40} sx={{ mb: 2 }} />

        <Skeleton variant="rounded" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={200} sx={{ mb: 3 }} />

        <Skeleton variant="rounded" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={200} />
      </Box>
    );
  }

  /* ---------- NO DATA STATE ---------- */

  if (consumables.length === 0 && nonConsumables.length === 0) {

    return (

      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >

        <Typography
          variant="h6"
          sx={{ color: "text.secondary" }}
        >
          Data yet to be collected for <b>{name}</b>
        </Typography>

      </Box>

    );

  }

  /* ---------- NORMAL VIEW ---------- */

  return (
    <div>

      <Typography variant="h5" sx={{ mb: 2 }}>
        {name}
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Non Consumables</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <NonConsumablesTable data={nonConsumables} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consumables</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ConsumablesTable data={consumables} />
        </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default LabTables;