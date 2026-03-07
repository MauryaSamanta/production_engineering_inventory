import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { dummyConsumables } from "../../data/dummyData";

const ConsumablesTable = () => {

  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Working</TableCell>
          <TableCell>Broken</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {dummyConsumables.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.item}</TableCell>
            <TableCell>{row.working}</TableCell>
            <TableCell>{row.broken}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  );
};

export default ConsumablesTable;