import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useLoading } from "../../LoadingContext";

import { useAuth } from "../../context/AuthContext";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(null);
  const [promiseArguments, setPromiseArguments] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const noButtonRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { setIsLoading } = useLoading();

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the libraryId from localStorage
        const libraryId = JSON.parse(localStorage.getItem("user")).libraryId;
        const response = await axios.get(`${backendURL}/students`, {
          headers: {
            libraryId: libraryId,
          },
        });

        // Set rows with the response data
        setRows(response.data);
        setLoading(false);
        // Log the libraryId
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      const config = {
        withCredentials: true, // Include credentials with requests
      };
      await axios.put(`${backendURL}/students/${newRow._id}`, newRow, config);
      setSnackbar({
        children: "User successfully Updated",
        severity: "success",
      });
      resolve(newRow);
    } catch (error) {
      setSnackbar({ children: "Error saving user", severity: "error" });
      reject(oldRow);
    } finally {
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    noButtonRef.current?.focus();
  };

  const handleDelete = (id) => {
    setDeleteRowId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const config = {
        withCredentials: true, // Include credentials with requests
      };
      await axios.delete(`${backendURL}/students/${deleteRowId}`, config);
      setRows((prevRows) => prevRows.filter((row) => row._id !== deleteRowId));
      setSnackbar({
        children: "User successfully deleted",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({ children: "Error deleting user", severity: "error" });
    } finally {
      setDeleteDialogOpen(false);
      setDeleteRowId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteRowId(null);
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    // const { newRow, oldRow } = promiseArguments;

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will save the changes.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderDeleteDialog = () => (
    <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} maxWidth="xs">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this user?
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
    {
      field: "registrationNumber",
      headerName: "Reg.No",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.9,
      // minWidth: 100,
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.2,
      editable: true,
      // hide: true,
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      flex: 0.5,
      editable: true,
      // headerAlign: "center",
      // align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.8,
      editable: true,
      hide: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
      editable: true,
      // headerAlign: "center",
      // align: "center",
    },
    {
      field: "preparationType",
      headerName: "Preparation Type",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      editable: true,
    },
    {
      field: "fee",
      headerName: "Fee",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.1,
      editable: true,
    },
    { field: "time", headerName: "Time", flex: 0.5, editable: true },
    { field: "status", headerName: "Status", flex: 0.3, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      headerAlign: "left",
      align: "left",

      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ overflowY: "hidden" }} m={"15px"}>
      <Box display="flex" flexDirection="column">
        <Box>
          <Header
            title="STUDENTS"
            subtitle="List of Students for Future Reference"
          />
        </Box>
        <Box>
          <Button
            onClick={() => navigate("/form")}
            color="secondary"
            variant="contained"
          >
            Add New User
          </Button>
        </Box>
      </Box>
      <Box
        mt={"10px"}
        height={"70vh"}
        // overflow={"visible"}
        // width={"100%"}
        minWidth={800}
        sx={{
          width: "100%",
          overflowX: "auto",
          minWidth: "800px",
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
            {
              // overflow: `visible !important`,
            },
        }}
      >
        {renderConfirmDialog()}
        {renderDeleteDialog()}
        <DataGrid
          // style={{ height: 400, width: '100%', overflow: 'auto' }}
          rows={rows}
          columns={columns}
          density="comfortable"
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          processRowUpdate={processRowUpdate}
          loading={loading}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            pagination: {
              pageSize: 25,
            },
          }}
          rowsPerPageOptions={[25, 50, 100]}
          sx={{
            "@media print": {
              ".MuiDataGrid-main": { color: "black" },
            },
          }}
          componentsProps={{
            toolbar: {
              csvOptions: {
                fields: [
                  "serialNo",
                  "registrationNumber",
                  "name",
                  "age",
                  "phoneNo",
                  "address",
                  "preparationType",
                  "fee",
                  "time",
                ],
              },
            },
          }}
        />

        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={5000}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.children}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
