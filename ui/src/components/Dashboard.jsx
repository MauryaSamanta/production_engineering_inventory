import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Divider
} from "@mui/material";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const AdminChangeRequestsDashboard = () => {

  const { token, role } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/changes/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setRequests(data.requests || []);
    //   console.log(requests)
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests)
  const approve = async (id) => {

    try {

      setLoadingId(id);

      await fetch(
        `http://localhost:5000/api/changes/approve/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }

  };

  const reject = async (id) => {

    try {

      setLoadingId(id);

      await fetch(
        `http://localhost:5000/api/changes/reject/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRequests((prev) =>
        prev.filter((r) => r._id !== id)
      );

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }

  };

  return (

    <Box sx={{ p: 4 }}>

      <Typography variant="h5" sx={{ mb: 3 }}>
         {role === "admin"
    ? "Pending Update Requests"
    : "Your Update Requests"}
      </Typography>

      {requests.length === 0 && (
        <Typography color="text.secondary">
          No pending requests
        </Typography>
      )}

      <Grid container spacing={3}>

        {requests.map((req) => {

          return (

            <Grid item xs={12} sm={6} md={4} lg={3} key={req._id}>

              <Card
  sx={{
    borderRadius: 3,
    boxShadow: 1,
    height: "100%",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: 4,
      transform: "translateY(-2px)"
    }
  }}
>

                <CardContent sx={{ p: 2 }}>

                  {/* HEADER */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2
                    }}
                  >

                    <Box>

                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {req.assetName || "Asset"}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Serial: {req.serialNumber}
                      </Typography>

                    </Box>

                    <Chip
                      label="Pending"
                      color="warning"
                    />

                  </Box>

                  {/* REQUESTED BY */}

                  <Typography
                    sx={{ mb: 2 }}
                    color="text.secondary"
                  >
                    Requested by <b>{req.requestedBy?.name}</b>
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  {/* FULL FIELD VIEW */}

{(() => {

  const changedFields = req.changes?.map(c => c.field) || [];

  const allFields = Object.keys(req.assetData || {}).filter(
    (f) => f !== "_id" && f !== "__v"
  );

  const unchangedFields = allFields.filter(
    (f) => !changedFields.includes(f)
  );

  return (

    <>
      {/* CHANGED FIELDS FIRST */}

      {req.changes?.map((change) => (

        <Box key={change.field} sx={{ mb: 2 }}>

          <Typography sx={{ fontWeight: 600 }}>
            {change.field}
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={6}>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#fff5f5",
                  border: "1px solid #ffc9c9"
                }}
              >

                <Typography variant="caption" color="error">
                  Previous
                </Typography>

                <Typography>
                  {JSON.stringify(change.previous)}
                </Typography>

              </Box>

            </Grid>

            <Grid item xs={6}>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#f0fff4",
                  border: "1px solid #b2f2bb"
                }}
              >

                <Typography variant="caption" color="success.main">
                  New
                </Typography>

                <Typography>
                  {JSON.stringify(change.updated)}
                </Typography>

              </Box>

            </Grid>

          </Grid>

        </Box>

      ))}

      {/* UNCHANGED FIELDS AFTER */}

      {unchangedFields.map((field) => {

        const value = req.assetData[field];

        return (

          <Box key={field} sx={{ mb: 2 }}>

            <Typography sx={{ fontWeight: 600 }}>
              {field}
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: "#f7f7f7"
              }}
            >

              <Typography>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : value}
              </Typography>

            </Box>

          </Box>

        );

      })}

    </>

  );

})()}

                  <Divider sx={{ mt: 2, mb: 2 }} />

                  {/* ACTION BUTTONS */}

                  {role==="admin" &&(<Box
                    sx={{
                      display: "flex",
                      gap: 2
                    }}
                  >

                    <Button
                      variant="contained"
                      color="success"
                      disabled={loadingId === req._id}
                      onClick={() => approve(req._id)}
                    >
                      {loadingId === req._id ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Approve"
                      )}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      disabled={loadingId === req._id}
                      onClick={() => reject(req._id)}
                    >
                      Reject
                    </Button>

                  </Box>)}

                </CardContent>

              </Card>

            </Grid>

          );

        })}

      </Grid>

    </Box>

  );

};

export default AdminChangeRequestsDashboard;