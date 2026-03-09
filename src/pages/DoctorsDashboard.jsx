import React from "react";
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
    if (authUser && authUser.role !== "Doctor") {
      navigate("/");
    }
  }, [authUser, navigate]);


  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const doctorName = authUser?.name || "Dr. Julian Anderson";

  const doctorSpecialty = authUser?.specialty || "Cardiologist";
  const doctorAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJmi3VoVxi5_VlVTb-WIX0MfQ8NZ0vaHUSxmf0cYUqLvtAmHn7NmQdi0j_S0HctCd4XHydAvaRy4MrBGoTUwGvWi6oCajZcaD9qPklhPkmCUWRu1EWtIAhw8tVTHxfAD-9fTHlSUynrVKceHva2JeTF5uu3ab575JUe7b-69nw8vppiR4bLnWAypqJmegkc-scNBwmW2bN7hBxpbyN8AQvK3_6BzUxL2_gQPDLdg7ht1iUnQDBm3JcdvXFsfpybaNelRbrLMRCnsX";

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
          p: { xs: 2.5, md: 5 },
          maxWidth: 1440,
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
              Welcome back, {doctorName.split(" ").pop()}. You have 12
              appointments today.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                height: 44,
                bgcolor: "#137fec",
                color: "white",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "8px",
                px: 3,
                textTransform: "none",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                "&:hover": { bgcolor: "rgba(19, 127, 236, 0.9)" },
              }}
            >
              New Appointment
            </Button>
            <Button
              variant="outlined"
              startIcon={<WarningAmberIcon />}
              sx={{
                height: 44,
                bgcolor: "#fee2e2",
                color: "#dc2626",
                borderColor: "#fecaca",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "8px",
                px: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#fecaca", borderColor: "#fca5a5" },
              }}
            >
              Emergency Alert
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
                Total Patients
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
              1,284
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
              8 / 12
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
                  width: "66%",
                }}
              />
            </Box>
          </Box>

          {/* Pending Reports */}
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
                Pending Reports
              </Typography>
              <Box sx={{ p: 1, bgcolor: "#fef3c7", borderRadius: "8px" }}>
                <DescriptionOutlinedIcon sx={{ color: "#d97706" }} />
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: "1.875rem", fontWeight: 700, color: "#0f172a" }}
            >
              5
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#d97706",
                fontSize: "0.875rem",
                fontWeight: 700,
              }}
            >
              <PriorityHighIcon sx={{ fontSize: 16 }} />
              <Typography variant="inherit">3 urgent reviews</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {/* Schedule Timeline */}
          <Box
            sx={{
              gridColumn: { lg: "span 2" },
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
                <CalendarTodayOutlinedIcon /> Daily Schedule
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "#f1f5f9",
                  p: 0.5,
                  borderRadius: "8px",
                }}
              >
                <Button
                  sx={{
                    minWidth: 0,
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    bgcolor: "white",
                    color: "#0f172a",
                    borderRadius: "6px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    textTransform: "none",
                    "&:hover": { bgcolor: "white" },
                  }}
                >
                  Today
                </Button>
                <Button
                  sx={{
                    minWidth: 0,
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#64748b",
                    textTransform: "none",
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  Weekly
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Timeline Item 1 */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    position: "relative",
                    pb: 3,
                    borderLeft: "2px solid #f1f5f9",
                    ml: 1.5,
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -9,
                      top: 0,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "#137fec",
                      border: "4px solid white",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      minWidth: 60,
                    }}
                  >
                    09:00 AM
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: "#f8fafc",
                      p: 2,
                      borderRadius: "8px",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          Sarah Jenkins
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#64748b" }}
                        >
                          Post-Op Consultation
                        </Typography>
                      </Box>
                      <Chip
                        label="Completed"
                        size="small"
                        sx={{
                          bgcolor: "#d1fae5",
                          color: "#047857",
                          fontWeight: 700,
                          fontSize: "0.625rem",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          height: 24,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Timeline Item 2 - Active */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    position: "relative",
                    pb: 3,
                    borderLeft: "2px solid rgba(19,127,236,0.3)",
                    ml: 1.5,
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -9,
                      top: 0,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "#137fec",
                      border: "4px solid white",
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 900,
                      color: "#137fec",
                      minWidth: 60,
                    }}
                  >
                    10:30 AM
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: "rgba(19, 127, 236, 0.05)",
                      p: 2,
                      borderRadius: "8px",
                      border: "1px solid rgba(19, 127, 236, 0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          Michael Ross
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#64748b" }}
                        >
                          Initial Heart Screening
                        </Typography>
                      </Box>
                      <Chip
                        label="In Progress"
                        size="small"
                        sx={{
                          bgcolor: "#137fec",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.625rem",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          height: 24,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Timeline Item 3 */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    position: "relative",
                    pb: 3,
                    borderLeft: "2px solid #f1f5f9",
                    ml: 1.5,
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -9,
                      top: 0,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "#cbd5e1",
                      border: "4px solid white",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#64748b",
                      minWidth: 60,
                    }}
                  >
                    11:45 AM
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: "#f8fafc",
                      p: 2,
                      borderRadius: "8px",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          Elena Rodriguez
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#64748b" }}
                        >
                          Routine Check-up
                        </Typography>
                      </Box>
                      <Chip
                        label="Scheduled"
                        size="small"
                        sx={{
                          bgcolor: "#e2e8f0",
                          color: "#475569",
                          fontWeight: 700,
                          fontSize: "0.625rem",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          height: 24,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Timeline Item 4 */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    position: "relative",
                    borderLeft: "2px solid transparent",
                    ml: 1.5,
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: -9,
                      top: 0,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "#cbd5e1",
                      border: "4px solid white",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#64748b",
                      minWidth: 60,
                    }}
                  >
                    01:30 PM
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: "#f8fafc",
                      p: 2,
                      borderRadius: "8px",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          David Chen
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#64748b" }}
                        >
                          ECG Review
                        </Typography>
                      </Box>
                      <Chip
                        label="Scheduled"
                        size="small"
                        sx={{
                          bgcolor: "#e2e8f0",
                          color: "#475569",
                          fontWeight: 700,
                          fontSize: "0.625rem",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          height: 24,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Recent Patients */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
              {/* Patient 1 */}
              <Box
                sx={{
                  p: 2,
                  "&:hover": { bgcolor: "#f8fafc" },
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                    SJ
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Sarah Jenkins
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Last visited: Today, 09:00 AM
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: "#94a3b8" }} />
                </Box>
                <Box sx={{ mt: 1.5, display: "flex", gap: 1, pl: 7 }}>
                  <Chip
                    label="Cardiology"
                    size="small"
                    sx={{
                      bgcolor: "#f1f5f9",
                      color: "#475569",
                      fontSize: "0.625rem",
                      height: 20,
                      borderRadius: "4px",
                    }}
                  />
                  <Chip
                    label="High Risk"
                    size="small"
                    sx={{
                      bgcolor: "#f1f5f9",
                      color: "#475569",
                      fontSize: "0.625rem",
                      height: 20,
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Box>

              {/* Patient 2 */}
              <Box
                sx={{
                  p: 2,
                  "&:hover": { bgcolor: "#f8fafc" },
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#f3e8ff",
                      color: "#9333ea",
                      fontWeight: 700,
                      width: 40,
                      height: 40,
                      fontSize: "1rem",
                    }}
                  >
                    MR
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Michael Ross
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Last visited: Now (Active)
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: "#94a3b8" }} />
                </Box>
                <Box sx={{ mt: 1.5, display: "flex", gap: 1, pl: 7 }}>
                  <Chip
                    label="Hypertension"
                    size="small"
                    sx={{
                      bgcolor: "#f1f5f9",
                      color: "#475569",
                      fontSize: "0.625rem",
                      height: 20,
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Box>

              {/* Patient 3 */}
              <Box
                sx={{
                  p: 2,
                  "&:hover": { bgcolor: "#f8fafc" },
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#d1fae5",
                      color: "#059669",
                      fontWeight: 700,
                      width: 40,
                      height: 40,
                      fontSize: "1rem",
                    }}
                  >
                    ER
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Elena Rodriguez
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Last visited: Oct 20, 2023
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: "#94a3b8" }} />
                </Box>
                <Box sx={{ mt: 1.5, display: "flex", gap: 1, pl: 7 }}>
                  <Chip
                    label="Stable"
                    size="small"
                    sx={{
                      bgcolor: "#f1f5f9",
                      color: "#475569",
                      fontSize: "0.625rem",
                      height: 20,
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Box>

              {/* Patient 4 */}
              <Box
                sx={{
                  p: 2,
                  "&:hover": { bgcolor: "#f8fafc" },
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#fef3c7",
                      color: "#d97706",
                      fontWeight: 700,
                      width: 40,
                      height: 40,
                      fontSize: "1rem",
                    }}
                  >
                    DC
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      David Chen
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Last visited: Oct 18, 2023
                    </Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: "#94a3b8" }} />
                </Box>
              </Box>

              {/* Manage All Records action */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#f8fafc",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    bgcolor: "white",
                    borderColor: "#e2e8f0",
                    color: "#334155",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    py: 1,
                    "&:hover": {
                      bgcolor: "#137fec",
                      color: "white",
                      borderColor: "#137fec",
                    },
                  }}
                >
                  Manage All Records
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Global Floating Action Component */}
      <IconButton
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
      </IconButton>

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
                  value: authUser.name,
                },

                { icon: <EmailIcon />, label: "Email", value: authUser.email },
                {
                  icon: <WorkIcon />,
                  label: "Specialty",
                  value: authUser.specialty,
                },
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

export default DoctorsDashboard;
