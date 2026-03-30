import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Chip,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MedicationIcon from "@mui/icons-material/Medication";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SpeedIcon from "@mui/icons-material/Speed";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VerifiedIcon from "@mui/icons-material/Verified";
import Groups2Icon from "@mui/icons-material/Groups2";
import FilterListIcon from "@mui/icons-material/FilterList";

const NavItem = ({ icon: Icon, label, active, badge }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 2,
      py: 1.5,
      borderRadius: "12px",
      mb: 0.5,
      cursor: "pointer",
      ...(active
        ? {
            bgcolor: "#137fec",
            color: "white",
            boxShadow: "0 4px 6px -1px rgba(19, 127, 236, 0.2)",
          }
        : {
            color: "#475569",
            "&:hover": {
              bgcolor: "#f8fafc",
              "& .MuiSvgIcon-root": { color: "#137fec" },
            },
          }),
      transition: "all 0.2s",
    }}
  >
    <Icon sx={{ fontSize: 24, ...(active ? {} : { color: "inherit" }) }} />
    <Typography sx={{ fontWeight: active ? 600 : 500, fontSize: "0.9rem" }}>
      {label}
    </Typography>
    {badge && (
      <Box
        sx={{
          ml: "auto",
          bgcolor: active ? "rgba(255,255,255,0.2)" : "#f1f5f9",
          color: active ? "white" : "#475569",
          fontSize: "0.625rem",
          fontWeight: 700,
          px: 1,
          py: 0.25,
          borderRadius: "99px",
        }}
      >
        {badge}
      </Box>
    )}
  </Box>
);

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

const PharmacistsPage = () => {
  const [authUser, setAuthUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("authUser"));
    if (storedUser) {
      setAuthUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchPrescriptions = async () => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(`${api}/doctor/prescriptions`);
      setPrescriptions(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/login");
  };

  const pharmacistName = authUser?.name || "Dr. Sarah Mills";

  const pharmacistRole = authUser?.role || "Head Pharmacist";
  const pharmacistAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZNiET0YdMIwGquYxf-z3nhsq03H1b4hj35hFX9rbxm5fTBRGA_HgYpTVC-GanlJs8Hd7g65Yilc0xWHpTxWQZOXbpvCRSpz-h2YUFKkgrGuoWyYx7iEFBp_8bxggJQpRwB6Fn19IjiYvvkbHhKTYqC4te8a5--v_fvV3R2Gi3lmkOgnkAgeMUsVtjWvcY0erBbkzhHKchEIEU64Qco_2_69A_QFk3DrvIf--PsW5r-8oXG-FQMnK5HjDqMA8T_rUc16iJwhVe2lj";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f8fafc",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: 288,
          flexDirection: "column",
          bgcolor: "white",
          borderRight: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        {/* <Box sx={{ p: 3, borderBottom: "1px solid #f8fafc" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#137fec",
            }}
          >
            <HealthAndSafetyIcon sx={{ fontSize: 32 }} />
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
          <Box sx={{ mt: 2, px: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Main Branch
            </Typography>
            <Typography
              sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}
            >
              Station PH-204
            </Typography>
          </Box>
        </Box> */}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <NavItem icon={DashboardIcon} label="Overview" active />
          <NavItem icon={ReceiptLongIcon} label="Prescriptions" badge="24" />
          <NavItem icon={Inventory2Icon} label="Stock Control" />
          <NavItem icon={GroupsIcon} label="Patients" />
          <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />
          <NavItem icon={BarChartIcon} label="Analytics" />
          <NavItem icon={SettingsIcon} label="Settings" />
        </Box>

        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: "#f8fafc",
              borderRadius: "16px",
              p: 2,
              border: "1px solid #f1f5f9",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Avatar
                src={pharmacistAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {pharmacistName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  {pharmacistRole}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setProfileOpen(true)}
                sx={{
                  flex: 1,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "6px",
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                }}
              >
                Profile
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  flex: 1,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "6px",
                  borderColor: "#fee2e2",
                  color: "#ef4444",
                  "&:hover": { bgcolor: "#fef2f2", borderColor: "#fca5a5" },
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "rgba(248, 250, 252, 0.5)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            bgcolor: "white",
            borderBottom: "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.025em",
              }}
            >
              Pharmacist Dashboard Overview
            </Typography>
            <Typography
              sx={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}
            >
              Daily operational summary for October 24, 2023
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              placeholder="Search orders, meds..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "#f1f5f9",
                  borderRadius: "12px",
                  border: "none",
                  "& fieldset": { border: "none" },
                },
              }}
              sx={{ display: { xs: "none", sm: "block" }, width: 256 }}
            />
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                border: "2px solid rgba(19, 127, 236, 0.2)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Avatar
                src={pharmacistAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
              sx={{ mt: 1 }}
              PaperProps={{
                sx: {
                  minWidth: 200,
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
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

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#137fec",
                color: "white",
                fontWeight: 700,
                borderRadius: "12px",
                px: 2,
                py: 1,
                fontSize: "0.875rem",
                textTransform: "none",
                boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.2)",
                "&:hover": { bgcolor: "rgba(19, 127, 236, 0.9)" },
              }}
            >
              New Order
            </Button>
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 4,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#cbd5e1",
              borderRadius: "3px",
            },
          }}
        >
          {/* Top Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {/* Pending Prescriptions */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "24px",
                p: 3,
                border: "1px solid #e2e8f0",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                "&:hover .bg-icon": { transform: "scale(1.1)" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: 0.5,
                    }}
                  >
                    Pending Prescriptions
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      lineHeight: 1,
                    }}
                  >
                    {prescriptions.length}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: "#eff6ff", p: 2, borderRadius: "16px" }}>
                  <ReceiptIcon sx={{ fontSize: 32, color: "#2563eb" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#ecfdf5",
                    color: "#10b981",
                    px: 1,
                    py: 0.5,
                    borderRadius: "8px",
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: "0.875rem", mr: 0.5 }} />
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    12%
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    fontWeight: 500,
                  }}
                >
                  In the last 2 hours
                </Typography>
              </Box>
              <PendingActionsIcon
                className="bg-icon"
                sx={{
                  position: "absolute",
                  right: -16,
                  bottom: -16,
                  fontSize: 140,
                  color: "rgba(0,0,0,0.03)",
                  transition: "transform 0.7s",
                  pointerEvents: "none",
                }}
              />
            </Box>

            {/* Low Stock Alerts */}
            <Box
              sx={{
                bgcolor: "#fff1f2",
                borderRadius: "24px",
                p: 3,
                border: "1px solid rgba(225, 29, 72, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
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
                        color: "#be123c",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        mb: 0.5,
                      }}
                    >
                      Low Stock Alerts
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
                      <Typography
                        sx={{
                          fontSize: "3rem",
                          fontWeight: 900,
                          color: "#e11d48",
                          lineHeight: 1,
                        }}
                      >
                        08
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#fb7185",
                        }}
                      >
                        Items Critical
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#ffe4e6",
                      p: 2,
                      borderRadius: "16px",
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 32, color: "#e11d48" }} />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#9f1239",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  Essential medications like{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Amoxicillin
                  </Box>{" "}
                  and{" "}
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Lisinopril
                  </Box>{" "}
                  are below safety threshold.
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#e11d48",
                  color: "white",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  boxShadow: "0 10px 15px -3px rgba(254, 205, 211, 1)",
                  "&:hover": { bgcolor: "#be123c" },
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                View Inventory Details{" "}
                <ArrowForwardIcon sx={{ fontSize: "0.875rem" }} />
              </Button>
            </Box>

            {/* Medicines Dispensed Today */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "24px",
                p: 3,
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: 0.5,
                    }}
                  >
                    Medicines Dispensed Today
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      lineHeight: 1,
                    }}
                  >
                    128
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: "#ecfdf5", p: 2, borderRadius: "16px" }}>
                  <MedicationIcon sx={{ fontSize: 32, color: "#059669" }} />
                </Box>
              </Box>

              {/* Fake Bar Chart */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 0.5,
                  height: 80,
                }}
              >
                {["40%", "65%", "90%", "50%", "75%", "85%"].map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      bgcolor: "#f1f5f9",
                      height: h,
                      borderRadius: "6px 6px 0 0",
                      "&:hover": { bgcolor: "rgba(19, 127, 236, 0.4)" },
                      transition: "background-color 0.2s",
                    }}
                  />
                ))}
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: "#137fec",
                    height: "100%",
                    borderRadius: "6px 6px 0 0",
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <Typography variant="inherit">08:00</Typography>
                <Typography variant="inherit">Current Hour</Typography>
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
            {/* Left Column Layout: Quick Stats & Recent Transactions */}
            <Box sx={{ gridColumn: { lg: "span 2" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  <AnalyticsIcon sx={{ color: "#137fec" }} /> Quick Stats
                </Typography>
                <Button
                  sx={{
                    color: "#137fec",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Download Detailed Report
                </Button>
              </Box>

              {/* Stats Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                  mb: 4,
                }}
              >
                {[
                  {
                    title: "Avg. Fulfillment Time",
                    value: "8.4",
                    unit: "mins",
                    status: "Efficient - Under target",
                    statusColor: "#10b981",
                    icon: SpeedIcon,
                    iconColor: "#d97706",
                    bg: "#fffbeb",
                  },
                  {
                    title: "Inventory Value",
                    value: "$242,500",
                    unit: "",
                    status: "Audit updated 2h ago",
                    statusColor: "#94a3b8",
                    icon: AccountBalanceWalletIcon,
                    iconColor: "#4f46e5",
                    bg: "#eef2ff",
                  },
                  {
                    title: "Pharmacist Accuracy",
                    value: "99.98%",
                    unit: "",
                    status: "Industry leading performance",
                    statusColor: "#10b981",
                    icon: VerifiedIcon,
                    iconColor: "#9333ea",
                    bg: "#faf5ff",
                  },
                  {
                    title: "Patient Satisfaction",
                    value: "4.9",
                    unit: "/5.0",
                    status: "Based on 1.2k reviews",
                    statusColor: "#f59e0b",
                    icon: Groups2Icon,
                    iconColor: "#475569",
                    bg: "#f8fafc",
                  },
                ].map((stat, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: "white",
                      p: 3,
                      borderRadius: "16px",
                      border: "1px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        bgcolor: stat.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <stat.icon sx={{ color: stat.iconColor, fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          mb: 0.5,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "#0f172a",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        {stat.value}
                        {stat.unit && (
                          <Typography
                            component="span"
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              ml: 0.5,
                            }}
                          >
                            {stat.unit}
                          </Typography>
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: stat.statusColor,
                          mt: 0.5,
                        }}
                      >
                        {stat.status}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Recent Transactions Table */}
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Recent Transactions
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#94a3b8",
                      "&:hover": { bgcolor: "#f8fafc" },
                      borderRadius: "8px",
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead sx={{ bgcolor: "rgba(248, 250, 252, 0.5)" }}>
                      <TableRow>
                        {["ID", "Medication", "Patient", "Status", "Time"].map(
                          (h, i) => (
                            <TableCell
                              key={i}
                              sx={{
                                color: "#94a3b8",
                                fontSize: "0.625rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                py: 1.5,
                                borderBottom: "1px solid #f1f5f9",
                              }}
                            >
                              {h}
                            </TableCell>
                          ),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescriptions.slice(0, 10).map((row) => (
                        <TableRow
                          key={row._id}
                          hover
                          sx={{
                            "&:hover": { bgcolor: "rgba(248, 250, 252, 0.5)" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "#137fec",
                              fontFamily: "monospace",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            #{row._id.slice(-4).toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "#334155",
                              borderBottom: "1px solid #f8fafc",
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.prescription}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#334155",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {row.patientId?.firstName} {row.patientId?.lastName}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <Chip
                              label="Dispensed"
                              sx={{
                                bgcolor: "#ecfdf5",
                                color: "#059669",
                                fontWeight: 700,
                                fontSize: "0.625rem",
                                textTransform: "uppercase",
                                borderRadius: "6px",
                                height: 24,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#94a3b8",
                              fontSize: "0.75rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {new Date(row.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {!loading && prescriptions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                            No prescriptions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            {/* Right Column Layout: Insights & Staff */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Stock Insights */}
              <Box
                sx={{
                  bgcolor: "#0f172a",
                  p: 3,
                  borderRadius: "24px",
                  color: "white",
                  boxShadow: "0 20px 25px -5px rgba(226, 232, 240, 0.5)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#94a3b8",
                    mb: 2,
                  }}
                >
                  Stock Insights
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#f43f5e",
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontSize: "0.875rem", fontWeight: 700 }}
                      >
                        Amoxicillin 500mg
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#94a3b8" }}
                      >
                        Critical: 5 units remaining in rack B4
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#f59e0b",
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontSize: "0.875rem", fontWeight: 700 }}
                      >
                        Lisinopril 10mg
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#94a3b8" }}
                      >
                        Reorder trigger hit: 24 units left
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    color: "white",
                    borderColor: "rgba(255,255,255,0.1)",
                    bgcolor: "rgba(255,255,255,0.1)",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    borderRadius: "12px",
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Manage Replenishment
                </Button>
              </Box>

              {/* Staff on Duty */}
              <Box
                sx={{
                  bgcolor: "white",
                  p: 3,
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#64748b",
                    }}
                  >
                    Staff on Duty
                  </Typography>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#10b981",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#2563eb",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        width: 40,
                        height: 40,
                      }}
                    >
                      JD
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        Jane Doe
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.625rem",
                          fontWeight: 500,
                          color: "#64748b",
                        }}
                      >
                        Assistant Pharmacist
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                      }}
                    >
                      08:00 - 16:00
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#e0e7ff",
                        color: "#4f46e5",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        width: 40,
                        height: 40,
                      }}
                    >
                      RK
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        Robert King
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.625rem",
                          fontWeight: 500,
                          color: "#64748b",
                        }}
                      >
                        Pharmacy Tech
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                      }}
                    >
                      09:00 - 17:00
                    </Typography>
                  </Box>
                </Box>
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
                  src={pharmacistAvatar}
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

export default PharmacistsPage;
