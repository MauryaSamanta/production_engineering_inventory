import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ConsumablesTable from "./ConsumablesTable";
import NonConsumablesTable from "./NonConsumablesTable";

const LabTables = ({ lab }) => {

  return (
    <div>

      <Typography variant="h5" sx={{ mb: 2 }}>
        {lab}
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Non Consumables</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <NonConsumablesTable />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consumables</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ConsumablesTable />
        </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default LabTables;