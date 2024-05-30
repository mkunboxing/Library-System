import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import axios from "axios";
import { useLoading } from "../../LoadingContext";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneNo: "",
    email: "",
    address: "",
    salary: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useLoading();

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendURL}/staff`);
      setStaff(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setLoading(false);
    }finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      age: "",
      phoneNo: "",
      email: "",
      address: "",
      salary: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`${backendURL}/staff/${editId}`, formData);
        fetchStaff();
        setSnackbarMessage("Staff updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating staff:", error);
        setSnackbarMessage("Error updating staff.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      try {
        await axios.post(`${backendURL}/staff`, formData);
        fetchStaff();
        setSnackbarMessage("Staff added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error adding staff:", error);
        setSnackbarMessage("Error adding staff.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
    handleClose();
  };

  const handleEdit = (id) => {
    const staffToEdit = staff.find((staff) => staff._id === id);
    setFormData({
      name: staffToEdit.name,
      age: staffToEdit.age,
      phoneNo: staffToEdit.phoneNo,
      email: staffToEdit.email,
      address: staffToEdit.address,
      salary: staffToEdit.salary,
    });
    setEditId(id);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/staff/${id}`);
      fetchStaff();
      setSnackbarMessage("Staff deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting staff:", error);
      setSnackbarMessage("Error deleting staff.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const columns = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      valueGetter: (params) =>
        `${params.api.getRowIndex(params.row._id) + 1}`,
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleEdit(params.row._id)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row._id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="15px">
      <Box display="flex" flexDirection="column">
        <Box>
          <Header title="STAFF" subtitle="List of Staff Members" />
        </Box>
        <Box>
          <Button color="secondary" variant="contained" onClick={handleOpen}>
            Add New Staff
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell": {
            overflow: `visible !important`,
          },
        }}
      >
        <DataGrid
          rows={staff}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Staff" : "Add New Staff"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Team;
