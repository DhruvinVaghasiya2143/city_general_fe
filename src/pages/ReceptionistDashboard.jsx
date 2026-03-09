import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"; // Closest to person_check
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import PaymentsIcon from "@mui/icons-material/Payments";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const waitlistData = [
  {
    id: 1,
    room: "Room 102",
    dept: "General Consultation",
    doctor: "Dr. James Wilson",
    docStatus: "Available",
    docStatusColor: "#10b981", // green
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNOmbgTtdBz4GcTZ9Uahrmmb8R595py8QwJHRzEEQAjqJJ8Asndb5rCrpS7fKI3a-2_tR4yvk4SMaP0Slvnqj_w49czLHn8lQ5C31A4wo0uc7Hz3tgKLfr6HXWpd6v68167O5BGg6z84ZF87tk151WQITsWFPWtwEWE6KTJxDuFwwHE1KOrRWKWgaoT0kcK5TdN9-ULtzhTXoDPIB50CArXe3xR8txIbFVpo4JtVO2k6PknGFq8uT0Zbxgmit8XsbZSDpVTU2-EbMY",
    patientsWaiting: 3,
    statusLabel: "ON TIME",
    statusColors: { bg: "#d1fae5", text: "#047857" },
    action: "Check In Next",
  },
  {
    id: 2,
    room: "Room 105",
    dept: "Cardiology",
    doctor: "Dr. Sarah Chen",
    docStatus: "In Session",
    docStatusColor: "#f97316", // orange
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaD8nAT_oTf26hoSUqr7l-Sbp5cODplolqSJfSAkC6tthvaT3zQi4HnibrW5qaVR_Ova-AU9W6BFLQKLyJi0B5Z4EoM058Dp2iA8LNHbZ5fqk5Nl0mxSe-QTFzdT5BsSc0GCcBRzEQYr_ngQV-EdieDUoQ9YWC5FuyFU2i7eVh3DK_tlv9IYyrJo7mgHtv4Ow1nBnKBFez2fuNN06GmCqkT-eOzs5eFlWnT1cgRWq3vwDKegqZTjEVOUr_FL67U6rGXVHaEtPOPSpn",
    patientsWaiting: 5,
    statusLabel: "15 MIN DELAY",
    statusColors: { bg: "#ffedd5", text: "#c2410c" },
    action: "Update",
  },
  {
    id: 3,
    room: "Lab A",
    dept: "Blood Work",
    doctor: "Mark Thompson",
    docStatus: "Ready",
    docStatusColor: "#10b981",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8zIt-3qf6Za3VlFzkAsidwmREzJoPk6Gi2irQDNrn81OfC6W4ntnklZFNhLoj6gEFcltRrFhWt0TGWNOm1JW_0JUjMLuLKrvGePfuobpOPGbS5Jscv_Vf2raXE6jifm6LudWDbbZ47CTPVqcq--DxuPAHgKAhjnxVB-JmkcZf9_Q7rq6HeTB_iBVYoc2MlI5_ZOpcpMmdFLEpqK8Hl2rtO2IblN0gmXxtHd-LnYRK-MVeSlBuvO4viKIqQW6ZvO3lMbvqZ8JicqAg",
    patientsWaiting: 2,
    statusLabel: "CLEAR",
    statusColors: { bg: "#d1fae5", text: "#047857" },
    action: "Notify",
  },
  {
    id: 4,
    room: "Room 201",
    dept: "Pediatrics",
    doctor: "Dr. Elena Rodriguez",
    docStatus: "In Session",
    docStatusColor: "#f97316",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3IQUTGTJqhMwS3lYtxhun2bLEQuWlJoYz-spo0IgY1wczeOhmTrgCvExyv1rMJ1r7JmKKZsxFQze7qyJjRuIXM7wOreMLTJrXRM8CV8EosWbFA0q4Am1lqVTIG52_HzvpmWY5FntaySeQHid7snyyS4s6E8blqeA6fTsfBeMx_zGmsDFZPapa5XlQ-5C_R103T7FQrga0whdsoCipYcCFzHZszSK9LO5VbKowQ3WnrZFqSzv4hzjmoSJS0JWJZO1JIDCDPtjhPsoC",
    patientsWaiting: 8,
    statusLabel: "30 MIN DELAY",
    statusColors: { bg: "#fee2e2", text: "#b91c1c" },
    action: "Divert",
  },
];

const checkinData = [
  { id: 1, name: "John Doe", time: "Checked in 5m ago" },
  { id: 2, name: "Alice Cooper", time: "Checked in 12m ago" },
];

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

const ReceptionistDashboard = () => {
  const [authUser, setAuthUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const raw = sessionStorage.getItem("authUser");
    if (raw) {
      try {
        setAuthUser(JSON.parse(raw));
      } catch {
        setAuthUser(null);
      }
    } else {
      setAuthUser(null);
    }
  }, [navigate]);

  const isLoggedIn = authUser?.loggedIn;

  React.useEffect(() => {
    if (authUser) {
      if (authUser.role !== "Receptionist") {
        navigate("/");
      }
    } else if (sessionStorage.getItem("authUser") === null) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const receptionistName = authUser?.name || "Receptionist";

  const receptionistAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDL5KLLiwhq_wghw0HprMVh2wXOc7FzY0NxOZuPmD15q_RbX9Cxcx655rvJiZqbMnVLXgWjQAxtW32SzTZxatw1pT6MyID7RjSQBuiveFVAoGdWUNKvwrvnuiwZB9eZCQ6fcdsDywh346uaYjcRznZXCsyeJQJGnqtE9cln3b3AV6-atz6fp5d8w0BcAbiUafUYJ0yqtrNJbQpv2h-zu5rPI9MaGWY0IDLytzVTMRZs-80BXYQBPkQXjU7QRG6QuEmFOxCr-Ygs6-T";

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
            <MedicalServicesIcon sx={{ fontSize: 24 }} />
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.015em",
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
                    placeholder="Search patients..."
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
          sx={{ display: "flex", alignItems: "center", gap: { xs: 2, lg: 4 } }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 4,
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
              Appointments
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
              Billing
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
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

          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              src={receptionistAvatar}
              sx={{ width: 40, height: 40, border: "1px solid #e2e8f0" }}
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
      </Box> */}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          p: { xs: 2.5, md: 4, lg: 5 },
          maxWidth: 1280,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Page Header */}
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              sx={{
                fontSize: "2.25rem",
                fontWeight: 900,
                color: "#0f172a",
                lineHeight: 1.25,
                letterSpacing: "-0.025em",
              }}
            >
              Receptionist Dashboard
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "#64748b" }}>
              Welcome back, {receptionistName.split(" ").pop()}. Managing
              patient flow for Monday, Oct 24, 2023
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#dcfce7",
                color: "#15803d",
                px: 2,
                py: 0.5,
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#22c55e",
                  borderRadius: "50%",
                }}
              />
              System Live
            </Box>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 5,
          }}
        >
          {/* Today's Appointments */}
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
                Today's Appointments
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(19, 127, 236, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <CalendarTodayIcon sx={{ color: "#137fec", fontSize: 20 }} />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "2.25rem",
                fontWeight: 900,
                color: "#0f172a",
                mt: 1,
              }}
            >
              42
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#16a34a",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 16 }} />
              <Typography variant="inherit">+5% from yesterday</Typography>
            </Box>
          </Box>

          {/* Patients Checked-in */}
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
                Patients Checked-in
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(19, 127, 236, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <PersonAddAlt1Icon sx={{ color: "#137fec", fontSize: 20 }} />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "2.25rem",
                fontWeight: 900,
                color: "#0f172a",
                mt: 1,
              }}
            >
              28
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#16a34a",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 16 }} />
              <Typography variant="inherit">+12% from morning</Typography>
            </Box>
          </Box>

          {/* Patients Currently Waiting */}
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
                Patients Currently Waiting
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(19, 127, 236, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <HourglassEmptyIcon sx={{ color: "#137fec", fontSize: 20 }} />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "2.25rem",
                fontWeight: 900,
                color: "#0f172a",
                mt: 1,
              }}
            >
              14
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#ea580c",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography variant="inherit">Avg wait: 18 mins</Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Grid Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
            gap: 4,
          }}
        >
          {/* Left Sidebar: Quick Actions & Clinic Status */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              order: { xs: 2, lg: 1 },
            }}
          >
            {/* Quick Actions Base Card */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                p: 3,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
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
                  mb: 3,
                }}
              >
                <BoltIcon sx={{ color: "#137fec" }} /> Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    justifyContent: "flex-start",
                    bgcolor: "#137fec",
                    color: "white",
                    height: 48,
                    px: 2.5,
                    borderRadius: "8px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#0f6bd1", boxShadow: "none" },
                  }}
                >
                  Register New Patient
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EventIcon />}
                  sx={{
                    justifyContent: "flex-start",
                    bgcolor: "#f1f5f9",
                    color: "#0f172a",
                    height: 48,
                    px: 2.5,
                    borderRadius: "8px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#e2e8f0", boxShadow: "none" },
                  }}
                >
                  Schedule Appointment
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PaymentsIcon />}
                  sx={{
                    justifyContent: "flex-start",
                    bgcolor: "#f1f5f9",
                    color: "#0f172a",
                    height: 48,
                    px: 2.5,
                    borderRadius: "8px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#e2e8f0", boxShadow: "none" },
                  }}
                >
                  Process Payment
                </Button>
              </Box>
            </Box>

            {/* Clinic Status Overview */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                p: 3,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 2,
                }}
              >
                Clinic Status Overview
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#22c55e",
                        borderRadius: "50%",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#0f172a",
                      }}
                    >
                      Main Lobby
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                    }}
                  >
                    80% Capacity
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#137fec",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#0f172a",
                      }}
                    >
                      Lab Area
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748b",
                    }}
                  >
                    Normal
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#ef4444",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#0f172a",
                      }}
                    >
                      Pediatrics
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#ef4444",
                    }}
                  >
                    High Delay
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Area: Main Feed & Check-ins */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              order: { xs: 1, lg: 2 },
            }}
          >
            {/* Waiting Room & Doctor Status */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Waiting Room & Doctor Status
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: "#22c55e",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    Available
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: "#f97316",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    Busy
                  </Typography>
                </Box>
              </Box>

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
                        Room / Area
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
                        Current Doctor
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
                        Patient Waiting
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
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {waitlistData.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            sx={{ fontWeight: 700, color: "#0f172a" }}
                          >
                            {row.room}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#64748b" }}
                          >
                            {row.dept}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              src={row.avatar}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#0f172a",
                                }}
                              >
                                {row.doctor}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.625rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  color: row.docStatusColor,
                                }}
                              >
                                {row.docStatus}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            py: 2.5,
                            fontWeight: 500,
                            fontSize: "0.875rem",
                          }}
                        >
                          {row.patientsWaiting} Patients
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip
                            label={row.statusLabel}
                            size="small"
                            sx={{
                              bgcolor: row.statusColors.bg,
                              color: row.statusColors.text,
                              fontWeight: 700,
                              fontSize: "0.625rem",
                              borderRadius: "4px",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Button
                            sx={{
                              color: "#137fec",
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              textTransform: "none",
                              p: 0,
                              minWidth: "auto",
                              "&:hover": {
                                background: "transparent",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {row.action}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Recent Check-ins */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                p: 3,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
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
                  mb: 3,
                }}
              >
                <RecentActorsIcon sx={{ color: "#137fec" }} /> Recent Check-ins
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                {checkinData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      border: "1px solid #f1f5f9",
                      borderRadius: "8px",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#e2e8f0",
                        color: "#64748b",
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#64748b" }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: "#137fec" }}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

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
                  src={receptionistAvatar}
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
                  value: authUser.name,
                },
                { icon: <EmailIcon />, label: "Email", value: authUser.email },
                { icon: <WorkIcon />, label: "Role", value: authUser.role },
                {
                  icon: <AccessTimeIcon />,
                  label: "Login Time",
                  value: formatLoginTime(authUser.loginTime),
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
    </Box>
  );
};

export default ReceptionistDashboard;
