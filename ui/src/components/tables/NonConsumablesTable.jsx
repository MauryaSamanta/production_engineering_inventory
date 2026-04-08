import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from "@mui/material";

import { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
import { labs } from "../../data/dummyData";
import {useAuth} from "../../auth/AuthContext"
const NonConsumablesTable = ({ data, showLab=false}) => {

  const { token } = useAuth();

  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
 const [assetId, setAssetId] = useState(null);

const labMap = {};

labs.forEach((l) => {
  labMap[l.code.trim().toUpperCase()] = l.name;
});

console.log(labMap)

  const columns = Object.keys(data[0]).filter((key) => {
  if (key === "__v" || key === "_id" || key === "Type" || key === "Name") return false;

  if (!showLab && key === "Lab") return false;

  return true;
});
  const handleEditOpen = (row) => {
    setEditRow(row);
    setFormData(row);
    setAssetId(row._id);
    setOpen(true);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const submitChangeRequest = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "https://production-engineering-inventory-1.onrender.com/api/changes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            assetId: assetId,
            changeType: "update_asset",
            newData: formData
          })
        }
      );

      await res.json();

      setOpen(false);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>

      <Table>

        <TableHead>
          <TableRow>

            {columns.map((col) => (
              <TableCell key={col}>
                <strong>
                {col}
                </strong>
              </TableCell>
            ))}

            <TableCell>
              <strong>
              Actions
              </strong>
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {data.map((row) => {
               console.log("RAW LAB:", row.lab);

            return (
            
            <TableRow key={row._id}>

              {columns.map((col) => (

                <TableCell key={col}>

                {col === "Lab"
  ? labMap[row[col]?.trim().toUpperCase()] || row[col]
  : typeof row[col] === "object" && row[col] !== null
    ? Object.entries(row[col]).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))
    : row[col]
}

                </TableCell>

              ))}

              <TableCell>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEditOpen(row)}
                >
                  Edit
                </Button>

              </TableCell>

            </TableRow>

)})}

        </TableBody>

      </Table>


      {/* EDIT DIALOG */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >

        <DialogTitle>
          Edit Asset
        </DialogTitle>

        <DialogContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1
            }}
          >

          {columns.map((col) => {

  const value = formData[col];

  /* If column is an object like specs */

  if (typeof value === "object" && value !== null) {

    return (
      <Box key={col} sx={{ border: "1px solid #eee", p: 2, borderRadius: 2 }}>
        <strong>{col}</strong>

        {Object.entries(value).map(([key, val]) => (

          <TextField
            key={key}
            label={key}
            value={val}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [col]: {
                  ...prev[col],
                  [key]: e.target.value
                }
              }))
            }
            fullWidth
            sx={{ mt: 1 }}
          />

        ))}
      </Box>
    );

  }

  /* Normal fields */

  return (

    <TextField
      key={col}
      label={col}
      value={value || ""}
      onChange={(e) =>
        handleChange(col, e.target.value)
      }
      fullWidth
    />

  );

})}

            {/* IMAGE UPLOAD PLACEHOLDER */}

            <Button variant="outlined">
              Upload Image (Coming Soon)
            </Button>

          </Box>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={submitChangeRequest}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Change"}
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );
};

export default NonConsumablesTable;