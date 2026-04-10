import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import AddDoctor from "./AddDoctor";
import AddService from "./AddService";
import EditUserDialog from "./EditUserDialog";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import DeskIcon from "@mui/icons-material/Desk";
import axios from "axios";
import { TablePagination } from "@mui/material";

const fetchDashboardStats = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_BACKEND_URL}/admin/stats`,
  );
  return response.data;
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    pharmacistCount: 0,
    receptionistCount: 0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isEditService, setIsEditService] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const [isEditUser, setIsEditUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("service");

  const fetchUsers = async () => {
    try {
      const endpoint =
        activeRole === "service"
          ? "services"
          : activeRole === "doctor"
            ? "doctors"
            : activeRole === "patient"
              ? "patients"
              : activeRole === "pharmacist"
                ? "pharmacists"
                : activeRole === "receptionist"
                  ? "receptionists"
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

  const handleEditUserClick = (user) => {
    setCurrentUser(user);
    setIsEditUser(true);
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      if (deleteType === "service") {
        await axios.delete(`${api}/admin/services/${itemToDelete._id}`);
      } else {
        await axios.delete(`${api}/admin/users/${itemToDelete._id}`);
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      fetchUsers();
    } catch (err) {
      console.error(`Error deleting ${deleteType}:`, err);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  const handleSuccess = () => {
    loadStats();
    setPage(0);
    fetchUsers();

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
    {
      title: "Total Pharmacists",
      value: stats.pharmacistCount,
      icon: <LocalPharmacyIcon fontSize="large" sx={{ color: "#0ea5e9" }} />,
      bgcolor: "#e0f2fe",
    },
    {
      title: "Total Receptionists",
      value: stats.receptionistCount,
      icon: <DeskIcon fontSize="large" sx={{ color: "#f97316" }} />,
      bgcolor: "#ffedd5",
    },
  ];

  const showActions =
    activeRole === "service" ||
    activeRole === "doctor" ||
    activeRole === "pharmacist" ||
    activeRole === "receptionist";

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "100vh",
        pt: { xs: 3, sm: 4, md: 6 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
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


        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            flexWrap: { xs: "wrap", md: "nowrap" },
            gridTemplateColumns: { md: "repeat(3, 1fr)" },
            gap: { xs: 1.5, sm: 2, md: 3 },
            justifyContent: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          {statCards.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "1 1 calc(50% - 12px)",
                  sm: "1 1 calc(33.33% - 16px)",
                },
                minWidth: { xs: "140px", sm: "200px" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2, md: 3 },
                  border: "1px solid #e2e8f0",
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: stat.bgcolor,
                    width: { xs: 48, sm: 56, md: 64 },
                    height: { xs: 48, sm: 56, md: 64 },
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#1e293b",
                      fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2rem" },
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      fontSize: {
                        xs: "0.68rem",
                        sm: "0.78rem",
                        md: "0.875rem",
                      },
                      lineHeight: 1.3,
                      mt: 0.3,
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>


        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            User Directory
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Manage all registered platform users.
          </Typography>
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
          <Box sx={{ px: { xs: 1, sm: 2 }, pt: 1 }}>
            <Tabs
              value={activeRole}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  minWidth: { xs: 80, sm: 100, md: 120 },
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 1, sm: 2 },
                },
                "& .Mui-selected": { color: "#3b82f6" },
                "& .MuiTabs-indicator": { bgcolor: "#3b82f6", height: 3 },
              }}
            >
              <Tab label="Doctors" value="doctor" />
              <Tab label="Patients" value="patient" />
              <Tab label="Pharmacists" value="pharmacist" />
              <Tab label="Receptionists" value="receptionist" />
              <Tab label="Admins" value="admin" />
              <Tab label="Services" value="service" />
            </Tabs>
          </Box>
          <Divider />


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
                      {showActions && activeRole !== "service" && (
                        <th>Actions</th>
                      )}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id || (user.userId && user.userId._id)}>
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
                                onClick={() =>
                                  handleDeleteClick(user, "service")
                                }
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
                                {activeRole === "doctor"
                                  ? user.hospitalName
                                  : ""}
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
                          {showActions && activeRole !== "service" && (
                            <td>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleEditUserClick(user)}
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
                                  onClick={() => {
                                    const deleteTarget =
                                      activeRole === "doctor"
                                        ? { ...user, _id: user.userId?._id }
                                        : user;
                                    handleDeleteClick(deleteTarget, "user");
                                  }}
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
                          )}
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        activeRole === "doctor"
                          ? 6
                          : activeRole === "pharmacist" ||
                              activeRole === "receptionist"
                            ? 5
                            : 4
                      }
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
            labelRowsPerPage={isMobile ? "Rows:" : "Rows per page:"}
            labelDisplayedRows={({ from, to, count }) =>
              isMobile
                ? `${from}-${to} / ${count}`
                : `Page ${page + 1} of ${Math.ceil(count / rowsPerPage)} (${from}-${to} of ${count})`
            }
            sx={{
              borderTop: "1px solid #e2e8f0",
              ".MuiTablePagination-toolbar": {
                color: "#64748b",
                fontWeight: 600,
                flexWrap: "wrap",
                minHeight: { xs: "48px", sm: "52px" },
                px: { xs: 1, sm: 2 },
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
            }}
          />
        </Paper>


        <AddDoctor
          open={openAddDoctor}
          onClose={handleClose}
          onSuccess={handleSuccess}
          initialRole={selectedRole}
        />


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

            setOpenAddService(false);
            setIsEditService(false);
            setCurrentService(null);
            fetchUsers();
          }}
        />


        <EditUserDialog
          open={isEditUser}
          onClose={() => {
            setIsEditUser(false);
            setCurrentUser(null);
          }}
          initialData={currentUser}
          onSuccess={() => {
            setIsEditUser(false);
            setCurrentUser(null);
            fetchUsers();
          }}
        />


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
                {deleteType === "service"
                  ? itemToDelete?.name
                  : itemToDelete?.firstName
                    ? `${itemToDelete.firstName} ${itemToDelete.lastName}`
                    : itemToDelete?.userId?.firstName
                      ? `${itemToDelete.userId.firstName} ${itemToDelete.userId.lastName}`
                      : "this user"}
              </Box>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              pt: 1,
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "stretch",
            }}
          >
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                bgcolor: "#ef4444",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "8px",
                px: 3,
                py: 1.2,
                boxShadow: "0 4px 6px -1px rgb(239 68 68 / 0.2)",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { bgcolor: "#dc2626" },
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseDeleteDialog}
              sx={{
                color: "#64748b",
                textTransform: "none",
                fontWeight: 700,
                width: { xs: "100%", sm: "auto" },
                ml: { xs: "0 !important", sm: "inherit" },
                py: 1.2,
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
