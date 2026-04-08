import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  Tabs,
  Tab,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import AddDoctor from "./AddDoctor";
import AddService from "./AddService";
import axios from "axios";
import { TablePagination } from "@mui/material";

const fetchDashboardStats = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_BACKEND_URL}/admin/stats`,
  );
  return response.data;
};

const AdminDashboard = () => {
  const [openAddDoctor, setOpenAddDoctor] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedRole, setSelectedRole] = useState("doctor");
  const [activeRole, setActiveRole] = useState("doctor");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    doctorCount: 0,
    patientCount: 0,
    adminCount: 0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isEditService, setIsEditService] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const endpoint =
        activeRole === "service"
          ? "services"
          : activeRole === "doctor"
            ? "doctors"
            : activeRole === "patient"
              ? "patients"
              : "admins";
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(
        `${api}/admin/${endpoint}?page=${page}&limit=${rowsPerPage}`,
      );
      setUsers(response.data.users || []);
      setTotalUsers(response.data.total || 0);
    } catch (err) {
      console.error(`Error fetching ${activeRole}s:`, err);
    }
  };

  const loadStats = async () => {
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  React.useEffect(() => {
    loadStats();
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, activeRole]);

  const handleOpen = (role) => {
    setSelectedRole(role);
    setOpenAddDoctor(true);
    handleMenuClose();
  };
  const handleClose = () => setOpenAddDoctor(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    setIsEditService(true);
    setOpenAddService(true);
  };

  const handleDeleteService = (service) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      await axios.delete(`${api}/admin/services/${serviceToDelete._id}`);
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setServiceToDelete(null);
  };
  const handleSuccess = () => {
    // Refresh stats and users after adding a doctor
    loadStats();
    setPage(0);
    fetchUsers();
    console.log("Doctor added successfully");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleTabChange = (event, newValue) => {
    setActiveRole(newValue);
    setPage(0);
  };

  const statCards = [
    {
      title: "Total Doctors",
      value: stats.doctorCount,
      icon: <LocalHospitalIcon fontSize="large" sx={{ color: "#3b82f6" }} />,
      bgcolor: "#eff6ff",
    },
    {
      title: "Total Patients",
      value: stats.patientCount,
      icon: <PeopleIcon fontSize="large" sx={{ color: "#10b981" }} />,
      bgcolor: "#ecfdf5",
    },
    {
      title: "Admin Staff",
      value: stats.adminCount,
      icon: (
        <AdminPanelSettingsIcon fontSize="large" sx={{ color: "#8b5cf6" }} />
      ),
      bgcolor: "#f5f3ff",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "100vh",
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "flex-end",
            gap: 2,
            mb: { xs: 4, md: 6 },
            mt: { xs: 1, md: 0 },
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenAddService(true)}
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#10b981",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 700,
              px: { xs: 2, md: 3 },
              py: 1.2,
              boxShadow: "0 4px 6px -1px rgb(16 185 129 / 0.1)",
              "&:hover": { bgcolor: "#059669" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add New Service
          </Button>
          <Button
            variant="contained"
            onClick={handleMenuClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: "#3b82f6",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 700,
              px: { xs: 2, md: 3 },
              py: 1.2,
              boxShadow: "0 4px 6px -1px rgb(59 130 246 / 0.1)",
              "&:hover": { bgcolor: "#2563eb" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add New Staff
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiMenuItem-root": {
                  fontWeight: 600,
                  color: "#1e293b",
                  fontSize: "0.9rem",
                  py: 1.2,
                  px: 3,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => handleOpen("doctor")}>
              Add Doctor Role
            </MenuItem>
            <MenuItem onClick={() => handleOpen("pharmacist")}>
              Add Pharmacist Role
            </MenuItem>
            <MenuItem onClick={() => handleOpen("receptionist")}>
              Add Receptionist Role
            </MenuItem>
          </Menu>
        </Box>

        {/* Stats Grid */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: stat.bgcolor, width: 64, height: 64 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#1e293b" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", fontWeight: 600 }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* User Directory Table */}
        <Box
          sx={{
            mt: 6,
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            gap: { xs: 1, sm: 2 },
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>
              User Directory
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
              Manage all registered platform users.
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            mb: 6,
          }}
        >
          <Box sx={{ px: 2, pt: 1 }}>
            <Tabs
              value={activeRole}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  minWidth: { xs: 100, sm: 120 },
                  py: 1.5,
                },
                "& .Mui-selected": { color: "#3b82f6" },
                "& .MuiTabs-indicator": { bgcolor: "#3b82f6", height: 3 },
              }}
            >
              <Tab label="Doctors" value="doctor" />
              <Tab label="Patients" value="patient" />
              <Tab label="Admins" value="admin" />
              <Tab label="Services" value="service" />
            </Tabs>
          </Box>
          <Divider />

          {/* Responsive Table View */}
          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <Box
              component="table"
              sx={{
                width: "100%",
                minWidth: { xs: "800px", md: "100%" },
                borderCollapse: "collapse",
                "& th, & td": {
                  p: 2,
                  textAlign: "left",
                  borderBottom: "1px solid #e2e8f0",
                },
                "& th": {
                  bgcolor: "#f8fafc",
                  color: "#64748b",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                },
              }}
            >
              <thead>
                <tr>
                  {activeRole === "service" ? (
                    <>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </>
                  ) : (
                    <>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      {activeRole === "doctor" && (
                        <>
                          <th>Specialty</th>
                          <th>Hospital</th>
                        </>
                      )}
                      {activeRole !== "doctor" && <th>Role</th>}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      {activeRole === "service" ? (
                        <>
                          <td style={{ fontWeight: 600, color: "#1e293b" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <Avatar src={user.imageUrl} variant="rounded" />
                              {user.name}
                            </Box>
                          </td>
                          <td
                            style={{
                              color: "#64748b",
                              maxWidth: "300px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.description}
                          </td>
                          <td>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleEditService(user)}
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 700,
                                  borderRadius: "6px",
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteService(user)}
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 700,
                                  borderRadius: "6px",
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ fontWeight: 600, color: "#1e293b" }}>
                            {activeRole === "doctor"
                              ? `${user.userId?.firstName || ""} ${user.userId?.lastName || ""}`
                              : `${user.firstName || ""} ${user.lastName || ""}`}
                          </td>
                          <td style={{ color: "#64748b" }}>
                            {activeRole === "doctor"
                              ? user.userId?.email
                              : user.email}
                          </td>
                          <td style={{ color: "#64748b" }}>
                            {activeRole === "doctor"
                              ? user.userId?.phone
                              : user.phone}
                          </td>
                          {activeRole === "doctor" && (
                            <>
                              <td>
                                <Box
                                  component="span"
                                  sx={{
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: "6px",
                                    bgcolor: "#eff6ff",
                                    color: "#3b82f6",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  {user.specialty}
                                </Box>
                              </td>
                              <td style={{ color: "#64748b" }}>
                                {user.hospitalName}
                              </td>
                            </>
                          )}
                          {activeRole !== "doctor" && (
                            <td>
                              <Box
                                component="span"
                                sx={{
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: "6px",
                                  bgcolor:
                                    activeRole === "patient"
                                      ? "#ecfdf5"
                                      : "#f5f3ff",
                                  color:
                                    activeRole === "patient"
                                      ? "#10b981"
                                      : "#8b5cf6",
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                {user.role}
                              </Box>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeRole === "doctor" ? 5 : 4}
                      style={{ textAlign: "center", py: 4 }}
                    >
                      No {activeRole}s found in the directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </Box>
          </Box>
          <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelDisplayedRows={({ from, to, count }) =>
              `Page ${page + 1} of ${Math.ceil(count / rowsPerPage)} (${from}-${to} of ${count})`
            }
            sx={{
              borderTop: "1px solid #e2e8f0",
              ".MuiTablePagination-toolbar": {
                color: "#64748b",
                fontWeight: 600,
              },
            }}
          />
        </Paper>

        {/* Add Doctor Dialog */}
        <AddDoctor
          open={openAddDoctor}
          onClose={handleClose}
          onSuccess={handleSuccess}
          initialRole={selectedRole}
        />

        {/* Add Service Dialog */}
        <AddService
          open={openAddService}
          onClose={() => {
            setOpenAddService(false);
            setIsEditService(false);
            setCurrentService(null);
          }}
          isEdit={isEditService}
          initialData={currentService}
          onSuccess={() => {
            console.log("Service saved successfully");
            setOpenAddService(false);
            setIsEditService(false);
            setCurrentService(null);
            fetchUsers();
          }}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: 1,
              maxWidth: "400px",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontWeight: 800,
              color: "#1e293b",
            }}
          >
            <WarningRoundedIcon sx={{ color: "#ef4444", fontSize: "2rem" }} />
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#64748b", fontWeight: 500, lineHeight: 1.6 }}
            >
              Are you sure you want to delete{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "#1e293b" }}>
                {serviceToDelete?.name}
              </Box>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button
              onClick={handleCloseDeleteDialog}
              sx={{
                color: "#64748b",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                bgcolor: "#ef4444",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "8px",
                px: 3,
                boxShadow: "0 4px 6px -1px rgb(239 68 68 / 0.2)",
                "&:hover": { bgcolor: "#dc2626" },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
