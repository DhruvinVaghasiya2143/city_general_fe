import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  Avatar,
  Pagination,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";

// FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Helper: get initials from a full name
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Helper: format ISO date nicely
const formatLoginTime = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const DoctorsDashboard = () => {
  const [authUser, setAuthUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);
  const [doctorDetails, setDoctorDetails] = React.useState(null);
  const [schedulePage, setSchedulePage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [todayAppointmentsCount, setTodayAppointmentsCount] = React.useState(0);
  const [completedTodayCount, setCompletedTodayCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState("today");

  const handleSchedulePageChange = (event, value) => {
    setSchedulePage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setSchedulePage(1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSchedulePage(1);
  };
  const navigate = useNavigate();

  const [assignedAppointments, setAssignedAppointments] = React.useState([]);
  const [calendarAppointments, setCalendarAppointments] = React.useState([]);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isLoadingCalendar, setIsLoadingCalendar] = React.useState(false);
  const [tooltipAnchorEl, setTooltipAnchorEl] = React.useState(null);
  const [hoveredAppointment, setHoveredAppointment] = React.useState(null);
  const [prescription, setPrescription] = React.useState("");
  const [prescriptionError, setPrescriptionError] = React.useState(false);

  const handleEventMouseEnter = (info) => {
    const apt = calendarAppointments.find((a) => a._id === info.event.id);
    if (apt) {
      setHoveredAppointment(apt);
      setTooltipAnchorEl(info.el);
    }
  };

  const handleEventMouseLeave = () => {
    setTooltipAnchorEl(null);
    setHoveredAppointment(null);
  };

  const fetchCalendarAppointments = async () => {
    if (!user?.id) return;
    try {
      setIsLoadingCalendar(true);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      // Fetch with filter=all and a large limit to get everything for the calendar
      const response = await axios.get(
        `${api}/appointment/appointments/${user.id}?filter=all&limit=1000`,
      );
      setCalendarAppointments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching calendar appointments:", error);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
    fetchCalendarAppointments();
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setPrescription(appointment.prescription || "");
    setPrescriptionError(false);
    setIsDialogOpen(true);
    // Mark as read when opened
    // if (appointment.status === "pending") {
    //   handleMarkAsRead(appointment._id);
    // }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAppointment(null);
    setPrescriptionError(false);
  };

  const isLoggedIn = authUser?.loggedIn;

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/login");
  };
  const getAssignedAppointments = async (
    doctorId,
    page,
    limit,
    currentFilter,
  ) => {
    try {
      console.log("doctorId", doctorId);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(
        `${api}/appointment/appointments/${doctorId}?page=${page}&limit=${limit}&filter=${currentFilter}`,
      );

      setAssignedAppointments(response.data.data);
      setTotalItems(response.data.pagination.totalItems);
      if (response.data.stats) {
        setTodayAppointmentsCount(response.data.stats.todayAppointmentsCount);
        setCompletedTodayCount(response.data.stats.completedTodayCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsCompleted = async (appointmentId) => {
    if (!prescription.trim()) {
      setPrescriptionError(true);
      return;
    }
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      await axios.patch(`${api}/appointment/status/${appointmentId}`, {
        status: "completed",
        prescription: prescription,
      });
      // Refresh the data
      if (user?.id) {
        getAssignedAppointments(user.id, schedulePage, rowsPerPage, filter);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const handleMarkAsRead = async (appointmentId) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      await axios.patch(`${api}/appointment/status/${appointmentId}`, {
        status: "completed",
      });
      // Refresh the data to show latest status
      if (user?.id) {
        getAssignedAppointments(user.id, schedulePage, rowsPerPage, filter);
      }
    } catch (error) {
      console.error("Error updating appointment status to read:", error);
    }
  };

  const getDoctorDetails = async (userId) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(`${api}/doctor/details/${userId}`);
      setDoctorDetails(response.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };
  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const doctorNameData = JSON.parse(sessionStorage.getItem("authUser"));
  const doctorName =
    doctorDetails?.userId?.firstName && doctorDetails?.userId?.lastName
      ? `Dr. ${doctorDetails.userId.firstName} ${doctorDetails.userId.lastName}`
      : doctorNameData?.name || authUser?.name || "Dr. Julian Anderson";

  const doctorSpecialty =
    doctorDetails?.specialty || authUser?.specialty || "Cardiologist";
  const doctorAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJmi3VoVxi5_VlVTb-WIX0MfQ8NZ0vaHUSxmf0cYUqLvtAmHn7NmQdi0j_S0HctCd4XHydAvaRy4MrBGoTUwGvWi6oCajZcaD9qPklhPkmCUWRu1EWtIAhw8tVTHxfAD-9fTHlSUynrVKceHva2JeTF5uu3ab575JUe7b-69nw8vppiR4bLnWAypqJmegkc-scNBwmW2bN7hBxpbyN8AQvK3_6BzUxL2_gQPDLdg7ht1iUnQDBm3JcdvXFsfpybaNelRbrLMRCnsX";

  const user = JSON.parse(sessionStorage.getItem("authUser"));

  // Calculate dynamic stats
  const totalPatientsCount = new Set(
    assignedAppointments.map((apt) => apt.patientId?._id).filter(Boolean),
  ).size;

  React.useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("authUser"));
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  React.useEffect(() => {
    if (user?.id) {
      getAssignedAppointments(user.id, schedulePage, rowsPerPage, filter);
      getDoctorDetails(user.id);
    }
  }, [user?.id, schedulePage, rowsPerPage, filter]);

  console.log("assigned_appointments =>", assignedAppointments);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f7f8",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      {/* <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e2e8f0",
          bgcolor: "white",
          px: { xs: 2, md: 5 },
          py: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "#137fec",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "rgba(19, 127, 236, 0.1)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HealthAndSafetyIcon sx={{ color: "#137fec" }} />
            </Box>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                color: "#0f172a",
              }}
            >
              MedCore
            </Typography>


          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: 256,
              height: 40,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                borderRadius: "8px",
                bgcolor: "#f1f5f9",
                px: 2,
              }}
            >
              <SearchIcon sx={{ color: "#64748b", fontSize: 20 }} />
              <TextField
                variant="standard"
                placeholder="Search patients, records..."
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "1rem",
                    pl: 1,
                    "& input::placeholder": { color: "#64748b" },
                  },
                }}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 2, lg: 3 } }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              component="a"
              href="#"
              sx={{
                color: "#137fec",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderBottom: "2px solid #137fec",
                pb: 0.5,
                textDecoration: "none",
              }}
            >
              Dashboard
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: "#475569",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "#137fec" },
                transition: "color 0.2s",
                textDecoration: "none",
              }}
            >
              Patients
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: "#475569",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "#137fec" },
                transition: "color 0.2s",
                textDecoration: "none",
              }}
            >
              Schedule
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: "#475569",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "#137fec" },
                transition: "color 0.2s",
                textDecoration: "none",
              }}
            >
              Reports
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#f1f5f9",
                color: "#334155",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <NotificationsIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#f1f5f9",
                color: "#334155",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <SettingsIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pl: 2,
              borderLeft: "1px solid #e2e8f0",
            }}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}
              >
                {doctorName}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                {doctorSpecialty}
              </Typography>
            </Box>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={doctorAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid rgba(19, 127, 236, 0.2)",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
              sx={{ mt: 1 }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  setProfileOpen(true);
                }}
                sx={{ gap: 1.5, fontSize: "0.875rem", py: 1.2 }}
              >
                <BadgeIcon fontSize="small" sx={{ color: "#64748b" }} />
                Manage Profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  gap: 1.5,
                  color: "#dc2626",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1.2,
                }}
              >
                <LogoutIcon fontSize="small" />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box> */}

      {/* Main Content Areas */}
      <Box
        component="main"
        sx={{
          p: { xs: 2, md: 3 },
          maxWidth: 1600,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Welcome Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: "1.875rem",
                  fontWeight: 900,
                  color: "#0f172a",
                  lineHeight: 1.25,
                  letterSpacing: "-0.025em",
                }}
              >
                Doctor Dashboard
              </Typography>
              <Typography sx={{ fontSize: "1.125rem", color: "#64748b" }}>
                Welcome back,{" "}
                {doctorName.startsWith("Dr.")
                  ? doctorName.split(" ").slice(1).join(" ")
                  : doctorName}
                . You have {todayAppointmentsCount} appointments today.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<CalendarTodayOutlinedIcon />}
              onClick={handleOpenCalendar}
              sx={{
                bgcolor: "#137fec",
                color: "white",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.5,
                boxShadow: "0 4px 6px -1px rgba(19, 127, 236, 0.2)",
                "&:hover": {
                  bgcolor: "#0f6bd1",
                  boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.4)",
                },
              }}
            >
              View Calendar
            </Button>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        >
          {/* Total Patients */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              borderRadius: "12px",
              p: 3,
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Total Appointments
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(19, 127, 236, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <GroupIcon sx={{ color: "#137fec" }} />
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "1.875rem", fontWeight: 700, color: "#0f172a" }}
            >
              {totalItems.toLocaleString()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#059669",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 16 }} />
              <Typography variant="inherit">+12.5% this month</Typography>
            </Box>
          </Box>

          {/* Completed Today */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              borderRadius: "12px",
              p: 3,
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Completed Today
              </Typography>
              <Box sx={{ p: 1, bgcolor: "#d1fae5", borderRadius: "8px" }}>
                <CheckCircleOutlineIcon sx={{ color: "#059669" }} />
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "1.875rem", fontWeight: 700, color: "#0f172a" }}
            >
              {completedTodayCount} / {todayAppointmentsCount}
            </Typography>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#f1f5f9",
                height: 8,
                borderRadius: 4,
                mt: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#10b981",
                  height: "100%",
                  borderRadius: 4,
                  width: todayAppointmentsCount
                    ? `${(completedTodayCount / todayAppointmentsCount) * 100}%`
                    : "0%",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 260px" },
            gap: 2.5,
          }}
        >
          {/* Schedule Timeline */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Daily Schedule
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "#f1f5f9",
                  p: 0.5,
                  borderRadius: "8px",
                  gap: 0.5,
                }}
              >
                <Button
                  onClick={() => handleFilterChange("today")}
                  sx={{
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    borderRadius: "6px",
                    textTransform: "none",
                    bgcolor: filter === "today" ? "white" : "transparent",
                    color: filter === "today" ? "#137fec" : "#64748b",
                    boxShadow:
                      filter === "today"
                        ? "0 1px 2px rgba(0,0,0,0.05)"
                        : "none",
                    "&:hover": {
                      bgcolor: filter === "today" ? "white" : "#e2e8f0",
                    },
                  }}
                >
                  Today
                </Button>
                <Button
                  onClick={() => handleFilterChange("all")}
                  sx={{
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    borderRadius: "6px",
                    textTransform: "none",
                    bgcolor: filter === "all" ? "white" : "transparent",
                    color: filter === "all" ? "#137fec" : "#64748b",
                    boxShadow:
                      filter === "all" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                    "&:hover": {
                      bgcolor: filter === "all" ? "white" : "#e2e8f0",
                    },
                  }}
                >
                  All
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                p: 3,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        First Name
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Last Name
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Contact Info
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Appointment Date
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Concern
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Registered At
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: "#f8fafc",
                          color: "#64748b",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          borderColor: "#e2e8f0",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignedAppointments.length > 0 ? (
                      assignedAppointments
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((apt, index) => (
                          <TableRow
                            key={apt._id}
                            style={{
                              backgroundColor:
                                apt.status === "completed"
                                  ? "#dcfce7"
                                  : "white",
                            }}
                            hover
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: "#64748b",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {(schedulePage - 1) * rowsPerPage + index + 1}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: "#0f172a",
                                  textTransform: "capitalize",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {apt.patientId?.firstName}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: "#0f172a",
                                  textTransform: "capitalize",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {apt.patientId?.lastName}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                sx={{ fontSize: "0.875rem", color: "#0f172a" }}
                              >
                                {apt.patientId?.email}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "0.75rem", color: "#64748b" }}
                              >
                                {apt.patientId?.phone}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                py: 2,
                                fontWeight: 500,
                                fontSize: "0.875rem",
                              }}
                            >
                              {new Date(apt.date).toLocaleString([], {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </TableCell>
                            <TableCell sx={{ py: 2, maxWidth: 200 }}>
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "#64748b",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {apt.concern || "—"}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography
                                sx={{ fontSize: "0.875rem", color: "#64748b" }}
                              >
                                {new Date(apt.createdAt).toLocaleDateString()}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Chip
                                label={
                                  apt.status === "completed"
                                    ? "Completed"
                                    : apt.status === "cancelled"
                                      ? "Cancelled"
                                      : "Pending"
                                }
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  fontSize: "0.7rem",
                                  bgcolor:
                                    apt.status === "completed"
                                      ? "#dcfce7"
                                      : apt.status === "cancelled"
                                        ? "#fee2e2"
                                        : "#e0f2fe",
                                  color:
                                    apt.status === "completed"
                                      ? "#15803d"
                                      : apt.status === "cancelled"
                                        ? "#991b1b"
                                        : "#0369a1",
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Button
                                size="small"
                                onClick={() => handleViewAppointment(apt)}
                                sx={{
                                  fontWeight: 700,
                                  textTransform: "none",
                                  color: "#137fec",
                                  "&:hover": { bgcolor: "transparent" },
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          sx={{ textAlign: "center", py: 4, color: "#64748b" }}
                        >
                          No appointments scheduled for today.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {totalItems > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f1f5f9",
                    pt: 2,
                  }}
                >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={schedulePage - 1}
                    onPageChange={(e, p) => setSchedulePage(p + 1)}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    labelRowsPerPage="Rows:"
                    sx={{
                      borderBottom: "none",
                      ".MuiTablePagination-toolbar": {
                        minHeight: 40,
                        p: 0,
                      },
                      ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                        {
                          fontSize: "0.75rem",
                          color: "#64748b",
                          fontWeight: 600,
                        },
                      ".MuiTablePagination-actions": {
                        display: "none",
                      },
                    }}
                  />
                  <Pagination
                    count={Math.ceil(totalItems / rowsPerPage)}
                    page={schedulePage}
                    onChange={handleSchedulePageChange}
                    color="primary"
                    size="small"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {/* Recent Patients */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <PersonSearchOutlinedIcon /> Recent Patients
              </Typography>
              <Typography
                component="a"
                href="#"
                sx={{
                  color: "#137fec",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                View All
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              {assignedAppointments.filter((apt) => apt.status === "completed")
                .length > 0 ? (
                assignedAppointments
                  .filter((apt) => apt.status === "completed")
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((apt) => {
                    const patient = apt.patientId;
                    const initials = patient
                      ? getInitials(`${patient.firstName} ${patient.lastName}`)
                      : "??";
                    const lastVisitedStr = new Date(
                      apt.date,
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <Box
                        key={apt._id}
                        sx={{
                          p: 1.5,
                          "&:hover": { bgcolor: "#f8fafc" },
                          transition: "background-color 0.2s",
                          cursor: "pointer",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#dbeafe",
                              color: "#2563eb",
                              fontWeight: 700,
                              width: 40,
                              height: 40,
                              fontSize: "1rem",
                            }}
                          >
                            {initials}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              {patient
                                ? `${patient.firstName} ${patient.lastName}`
                                : "Unknown"}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "0.75rem", color: "#64748b" }}
                            >
                              Visited: {lastVisitedStr}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
              ) : (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                    No recent patients found.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Global Floating Action Component */}
      {/* <IconButton
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          bgcolor: "#137fec",
          color: "white",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
          "&:hover": {
            bgcolor: "#137fec",
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s",
        }}
      >
        <ChatBubbleIcon />
      </IconButton> */}

      {/* ── Profile Drawer ── */}
      <Drawer
        anchor="right"
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 380 },
            borderRadius: "16px 0 0 16px",
          },
        }}
      >
        {authUser && (
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #137fec 0%, #0f6bd1 100%)",
                p: 3,
                pb: 4,
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => setProfileOpen(false)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "white",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                SESSION PROFILE
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  src={doctorAvatar}
                  sx={{
                    width: 72,
                    height: 72,
                    border: "3px solid rgba(255,255,255,0.4)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                    }}
                  >
                    {authUser.name}
                  </Typography>
                  <Chip
                    label={authUser.role}
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {[
                {
                  icon: <BadgeIcon />,
                  label: "Full Name",
                  value: doctorName,
                },

                {
                  icon: <EmailIcon />,
                  label: "Email",
                  value: doctorDetails?.userId?.email || authUser?.email,
                },
                {
                  icon: <WorkIcon />,
                  label: "Specialty",
                  value: doctorSpecialty,
                },
                {
                  icon: <WorkIcon />,
                  label: "Office Number",
                  value: doctorDetails?.officeNumber || "—",
                },
                {
                  icon: <AccessTimeIcon />,
                  label: "Working Hours",
                  value: doctorDetails?.workingHours || "—",
                },
              ].map(({ icon, label, value }) => (
                <Box
                  key={label}
                  sx={{
                    p: 2,
                    bgcolor: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    {React.cloneElement(icon, {
                      sx: { fontSize: "1rem", color: "#64748b" },
                    })}
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      pl: 3,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 3, borderTop: "1px solid #e2e8f0" }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ color: "#dc2626", borderColor: "#fca5a5" }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Appointment Details Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "12px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#0f172a", pb: 1 }}>
          Appointment Details
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 16, top: 16, color: "#64748b" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}
        >
          {selectedAppointment && (
            <>
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Patient Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#0f172a",
                    textTransform: "capitalize",
                  }}
                >
                  {selectedAppointment.patientId?.firstName}{" "}
                  {selectedAppointment.patientId?.lastName}
                </Typography>
              </Box>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Email Address
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    {selectedAppointment.patientId?.email || "—"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    {selectedAppointment.patientId?.phone || "—"}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Appointment Date
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {new Date(selectedAppointment.date).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Registered At
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    {new Date(selectedAppointment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: "#f8fafc",
                  p: 2,
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  Primary Concern
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedAppointment.concern ||
                    "No specific concern provided."}
                </Typography>
              </Box>
              {selectedAppointment.status === "pending" && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 1,
                    }}
                  >
                    Prescription
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Enter medical prescription and advice..."
                    value={prescription}
                    onChange={(e) => {
                      setPrescription(e.target.value);
                      if (e.target.value.trim()) {
                        setPrescriptionError(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleMarkAsCompleted(selectedAppointment?._id);
                      }
                    }}
                    error={prescriptionError}
                    helperText={
                      prescriptionError
                        ? "* if no prescription then please write none"
                        : ""
                    }
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: "0.875rem",
                        bgcolor: "#f8fafc",
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              bgcolor: "#137fec",
              boxShadow: "none",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#0f6bd1", boxShadow: "none" },
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => handleMarkAsCompleted(selectedAppointment?._id)}
            variant="contained"
            disabled={selectedAppointment?.status !== "pending"}
            sx={{
              bgcolor:
                selectedAppointment?.status === "completed"
                  ? "#10b981"
                  : selectedAppointment?.status === "cancelled"
                    ? "#fee2e2"
                    : "#137fec",
              boxShadow: "none",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              height: 40,
              px: 3,
              "&:hover": {
                bgcolor:
                  selectedAppointment?.status === "pending"
                    ? "#0f6bd1"
                    : "inherit",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                bgcolor:
                  selectedAppointment?.status === "cancelled"
                    ? "#fee2e2"
                    : "#f1f5f9",
                color:
                  selectedAppointment?.status === "cancelled"
                    ? "#991b1b"
                    : "#94a3b8",
                border:
                  selectedAppointment?.status === "cancelled"
                    ? "1px solid #fecaca"
                    : "none",
              },
            }}
          >
            {selectedAppointment?.status === "completed"
              ? "Completed"
              : selectedAppointment?.status === "cancelled"
                ? "Appointment Cancelled"
                : "Mark as Completed"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog
        fullWidth
        maxWidth="lg"
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            height: "90vh",
            maxHeight: "900px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            px: { xs: 2, md: 3 },
            py: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}
          >
            My Clinical Appointments
          </Typography>
          <IconButton
            onClick={() => setIsCalendarOpen(false)}
            sx={{ color: "#64748b" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, md: 3 }, bgcolor: "#f8fafc" }}>
          <Box
            sx={{
              height: "100%",
              "& .fc": {
                height: "100%",
                fontFamily: "Inter, sans-serif",
                "--fc-border-color": "#e2e8f0",
                "--fc-button-bg-color": "#fff",
                "--fc-button-border-color": "#e2e8f0",
                "--fc-button-text-color": "#64748b",
                "--fc-button-hover-bg-color": "#f1f5f9",
                "--fc-button-active-bg-color": "#eff6ff",
                "--fc-button-active-border-color": "#3b82f6",
                "--fc-event-bg-color": "#eff6ff",
                "--fc-event-border-color": "#3b82f6",
                "--fc-event-text-color": "#2563eb",
                "--fc-today-bg-color": "rgba(59, 130, 246, 0.05)",
                borderRadius: "12px",
                overflow: "hidden",
                bgcolor: "white",
                p: 2,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              },
              "& .fc-header-toolbar": {
                mb: 3,
                "@media (max-width: 600px)": {
                  flexDirection: "column",
                  gap: 2,
                },
              },
              "& .fc-button": {
                fontWeight: 700,
                textTransform: "capitalize",
                boxShadow: "none !important",
                fontSize: "0.875rem",
                borderRadius: "8px !important",
                mx: "2px",
              },
              "& .fc-col-header-cell-cushion": {
                py: 1.5,
                fontSize: "0.875rem",
                fontWeight: 800,
                color: "#475569",
                textDecoration: "none !important",
              },
              "& .fc-timegrid-slot-label-cushion": {
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: 700,
              },
              "& .fc-event": {
                borderRadius: "8px",
                p: 0.5,
                border: "none !important",
                borderLeft: "5px solid #3b82f6 !important",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  zIndex: 5,
                },
              },
              "& .fc-v-event": {
                bgcolor: "rgba(59, 130, 246, 0.08)",
              },
              "& .fc-timegrid-now-indicator-line": {
                borderTopWidth: "3px",
                borderColor: "#ef4444",
                zIndex: 10,
              },
              "& .fc-timegrid-now-indicator-arrow": {
                borderColor: "#ef4444",
                borderWidth: "6px",
                marginTop: "-5px",
              },
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={calendarAppointments.map((apt) => {
                const endTime = new Date(
                  new Date(apt.date).getTime() + 30 * 60000,
                );
                const isPast = endTime < new Date();

                return {
                  id: apt._id,
                  title: `${apt.patientId?.firstName || "Patient"} - ${apt.concern}`,
                  start: apt.date,
                  end: endTime.toISOString(),
                  backgroundColor: isPast ? "#caccd1" : "#cfe1ff",
                  borderColor: isPast ? "#a0a0a5" : "#137fec",
                  textColor: isPast ? "#4b5563" : "#1e40af",
                  className: isPast ? "fc-event-past" : "",
                };
              })}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              allDaySlot={true}
              nowIndicator={true}
              scrollTime={new Date().toLocaleTimeString("en-US", {
                hour12: false,
              })}
              eventClick={(info) => {
                const apt = calendarAppointments.find(
                  (a) => a._id === info.event.id,
                );
                if (apt) {
                  handleViewAppointment(apt);
                  setIsCalendarOpen(false);
                }
              }}
              height="100%"
              eventMouseEnter={handleEventMouseEnter}
              eventMouseLeave={handleEventMouseLeave}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Calendar Hover Fly-over Popover */}
      <Popover
        sx={{
          pointerEvents: "none",
          "& .MuiPaper-root": {
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            border: "1px solid #e2e8f0",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            minWidth: "280px",
            p: 2.5,
            mt: -1,
          },
        }}
        open={Boolean(tooltipAnchorEl)}
        anchorEl={tooltipAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleEventMouseLeave}
        disableRestoreFocus
      >
        {hoveredAppointment && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 700,
                    mb: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Patient Detail
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    color: "#0f172a",
                    fontWeight: 800,
                  }}
                >
                  {hoveredAppointment.patientId?.firstName}{" "}
                  {hoveredAppointment.patientId?.lastName}
                </Typography>
              </Box>
              <Chip
                label={hoveredAppointment.status}
                size="small"
                sx={{
                  bgcolor:
                    hoveredAppointment.status === "completed"
                      ? "#ecfdf5"
                      : "#eff6ff",
                  color:
                    hoveredAppointment.status === "completed"
                      ? "#10b981"
                      : "#3b82f6",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  fontSize: "0.7rem",
                  height: "22px",
                }}
              />
            </Box>

            <Divider sx={{ mb: 2, borderStyle: "dashed" }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    p: 0.8,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  <EmailIcon sx={{ fontSize: "16px", color: "#64748b" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#334155",
                    fontWeight: 500,
                  }}
                >
                  {hoveredAppointment.patientId?.email}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    p: 0.8,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  <BadgeIcon sx={{ fontSize: "16px", color: "#64748b" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#334155",
                    fontWeight: 500,
                  }}
                >
                  {hoveredAppointment.patientId?.phone || "No phone"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box
                  sx={{
                    p: 0.8,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                    display: "flex",
                    mt: 0.2,
                  }}
                >
                  <ChatBubbleIcon sx={{ fontSize: "16px", color: "#64748b" }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      color: "#94a3b8",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      mt: 0.2,
                    }}
                  >
                    Reason for Visit
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#334155",
                      fontWeight: 500,
                      fontStyle: "italic",
                    }}
                  >
                    "{hoveredAppointment.concern}"
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 2.5,
                p: 1.2,
                bgcolor: "#f1f5f9",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}
              >
                Click appointment block to open details
              </Typography>
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default DoctorsDashboard;
