import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { dummyNonConsumables } from "../../data/dummyData";

const NonConsumablesTable = () => {

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
        {dummyNonConsumables.map((row, i) => (
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

export default NonConsumablesTable;