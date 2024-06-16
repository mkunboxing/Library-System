import React, { useState, useEffect, useRef } from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoading } from "../../LoadingContext";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    amount: "",
    date: new Date(),
    phoneNo: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { setIsLoading } = useLoading();
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState(null);
  const noButtonRef = useRef(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const config = {
    // Include credentials with requests
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      libraryId: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).libraryId
        : null,
    },
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendURL}/invoices`, config);
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      type: "",
      name: "",
      amount: "",
      date: new Date(),
      phoneNo: "",
      email: "",
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

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`${backendURL}/invoices/${editId}`, formData, config);
        fetchInvoices();
        setSnackbarMessage("Invoice updated successfully!");
        setSnackbarSeverity("success");
      } catch (error) {
        console.error("Error updating invoice:", error);
        setSnackbarMessage("Failed to update invoice.");
        setSnackbarSeverity("error");
      }
    } else {
      try {
        await axios.post(`${backendURL}/invoices`, formData, config);
        fetchInvoices();
        setSnackbarMessage("Invoice added successfully!");
        setSnackbarSeverity("success");
      } catch (error) {
        console.error("Error adding invoice:", error);
        setSnackbarMessage("Failed to add invoice.");
        setSnackbarSeverity("error");
      }
    }
    setSnackbarOpen(true);
    handleClose();
  };

  const handleEdit = (id) => {
    const invoiceToEdit = invoices.find((invoice) => invoice._id === id);
    setFormData({
      type: invoiceToEdit.type,
      name: invoiceToEdit.name,
      amount: invoiceToEdit.amount,
      date: new Date(invoiceToEdit.date),
      phoneNo: invoiceToEdit.phoneNo,
      email: invoiceToEdit.email,
    });
    setEditId(id);
    setEditMode(true);
    handleOpen();
  };

  const handleDeleteClick = (id) => {
    setDeleteInvoiceId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${backendURL}/invoices/${deleteInvoiceId}`, config);
      fetchInvoices();
      setSnackbarMessage("Invoice deleted successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      setSnackbarMessage("Failed to delete invoice.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
    setDeleteDialogOpen(false);
    setDeleteInvoiceId(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteInvoiceId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderDeleteDialog = () => (
    <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} maxWidth="xs">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this invoice?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  const columns = [
    {
      field: "srNo",
      headerName: "Sr. No.",
      valueGetter: (params) => `${params.api.getRowIndex(params.row._id) + 1}`,
      width: 80,
    },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.amount}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {new Date(params.row.date).toLocaleDateString()}
        </Typography>
      ),
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
              onClick={() => handleDeleteClick(params.row._id)}
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
    <Box sx={{ overflowY: "hidden" }} m="15px">
      <Box display="flex" flexDirection={"column"}>
        <Box>
          <Header title="INVOICES" subtitle="List of Invoices" />
        </Box>
        <Box>
          <Button color="secondary" variant="contained" onClick={handleOpen}>
            Add New Invoice
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="70vh"
        minWidth={1000}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            // minWidth: "800px",
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
        }}
      >
        <DataGrid rows={invoices} columns={columns} getRowId={(row) => row._id} />
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editMode ? "Edit Invoice" : "Add New Invoice"}</DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="profit">Profit</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
                
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Phone Number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              {editMode ? "Update Invoice" : "Add Invoice"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {renderDeleteDialog()}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Invoices;
