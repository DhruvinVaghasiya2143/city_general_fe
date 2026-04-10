import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  Chip,
  Drawer,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import ScheduleAppointment from "../pages/ScheduleAppointment";

const PUBLIC_PAGES = [
  { label: "Services", path: "/services" },
  { label: "Doctors", path: "/doctors" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const ROLE_PAGES = {
  Doctor: [
    { label: "Dashboard", path: "/doctor-dashboard" },
    { label: "Patients", path: "#" },
    { label: "Schedule", path: "#" },
    { label: "Reports", path: "#" },
  ],
  Pharmacist: [
    { label: "Overview", path: "/pharmacists-dashboard" },
    { label: "Prescriptions", path: "#" },
    { label: "Stock Control", path: "#" },
    { label: "Analytics", path: "#" },
  ],

  Receptionist: [
    { label: "Dashboard", path: "/receptionist-dashboard" },
    { label: "Patients", path: "#" },
    { label: "Appointments", path: "#" },
    { label: "Billing", path: "#" },
  ],
  Admin: [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Staff", path: "#" },
    { label: "Services", path: "#" },
    { label: "Reports", path: "#" },
  ],
};

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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [authUser, setAuthUser] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  // Read sessionStorage on mount and whenever the component re-renders (e.g. after login navigation)
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
  }, [location.pathname]);

  const isLoggedIn = authUser?.loggedIn;

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  console.log(authUser);
  const receptionistAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDL5KLLiwhq_wghw0HprMVh2wXOc7FzY0NxOZuPmD15q_RbX9Cxcx655rvJiZqbMnVLXgWjQAxtW32SzTZxatw1pT6MyID7RjSQBuiveFVAoGdWUNKvwrvnuiwZB9eZCQ6fcdsDywh346uaYjcRznZXCsyeJQJGnqtE9cln3b3AV6-atz6fp5d8w0BcAbiUafUYJ0yqtrNJbQpv2h-zu5rPI9MaGWY0IDLytzVTMRZs-80BXYQBPkQXjU7QRG6QuEmFOxCr-Ygs6-T";
  const doctorName = authUser?.name || "Dr. Julian Anderson";
  const doctorSpecialty = authUser?.specialty || "Cardiologist";
  const doctorAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJmi3VoVxi5_VlVTb-WIX0MfQ8NZ0vaHUSxmf0cYUqLvtAmHn7NmQdi0j_S0HctCd4XHydAvaRy4MrBGoTUwGvWi6oCajZcaD9qPklhPkmCUWRu1EWtIAhw8tVTHxfAD-9fTHlSUynrVKceHva2JeTF5uu3ab575JUe7b-69nw8vppiR4bLnWAypqJmegkc-scNBwmW2bN7hBxpbyN8AQvK3_6BzUxL2_gQPDLdg7ht1iUnQDBm3JcdvXFsfpybaNelRbrLMRCnsX";

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    setAuthUser(null);
    handleCloseUserMenu();
    navigate("/");
  };

  const handleGoToDashboard = () => {
    handleCloseUserMenu();
    if (!authUser) return;
    const routes = {
      Doctor: "/doctor-dashboard",
      Pharmacist: "/pharmacists-dashboard",
      Receptionist: "/receptionist-dashboard",
      Admin: "/admin-dashboard",
    };
    navigate(routes[authUser.role] || "/");
  };

  const renderContent = () => {
    if (authUser?.role === "Doctor") {
      return (
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
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
                  bgcolor: "#000000",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "22px",
                    fontWeight: "900",
                    lineHeight: 1,
                    mt: -0.2,
                  }}
                >
                  +
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                }}
              >
                CityGeneral
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, lg: 3 },
            }}
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
                sx={{
                  textAlign: "right",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
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
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
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
                  Profile
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
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      );
    } else if (authUser?.role === "Pharmacist") {
      return (
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
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
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#000000",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "22px",
                    fontWeight: "900",
                    lineHeight: 1,
                    mt: -0.2,
                  }}
                >
                  +
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                }}
              >
                CityGeneral
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
                  placeholder="Search prescriptions..."
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, lg: 4 },
            }}
          >
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
                src={authUser?.avatar || undefined}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#137fec",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  border: "1px solid #e2e8f0",
                }}
              >
                {!authUser?.avatar && getInitials(authUser?.name)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
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
      );
    } else if (authUser?.role === "Admin") {
      return (
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
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
                width: 32,
                height: 32,
                bgcolor: "#000000",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "900",
                  lineHeight: 1,
                  mt: -0.2,
                }}
              >
                +
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1e293b",
                letterSpacing: "-0.02em",
              }}
            >
              CityGeneral
            </Typography>
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
                  placeholder="Global search..."
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, lg: 3 },
            }}
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
                href="/admin-dashboard"
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
                Staff
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
                Services
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
                sx={{
                  textAlign: "right",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {authUser?.name}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                  System Administrator
                </Typography>
              </Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={authUser?.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid rgba(19, 127, 236, 0.2)",
                    bgcolor: "#137fec",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  {!authUser?.avatar && getInitials(authUser?.name)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
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
                  Profile
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
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      );
    } else if (authUser?.role === "Receptionist") {
      return (
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
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
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#000000",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "22px",
                    fontWeight: "900",
                    lineHeight: 1,
                    mt: -0.2,
                  }}
                >
                  +
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                }}
              >
                CityGeneral
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, lg: 4 },
            }}
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

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={handleOpenBooking}
                sx={{
                  bgcolor: "#3b82f6",
                  color: "white",
                  fontWeight: 700,
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.2)",
                  "&:hover": { bgcolor: "#2563eb" },
                  whiteSpace: "nowrap",
                }}
              >
                Book Appointment
              </Button>
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
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
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
                Profile
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
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      );
    } else {
      return (
        <AppBar
          position="sticky"
          sx={{
            top: 0,
            zIndex: 1100,
            bgcolor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(226, 232, 240, 0.3)",
          }}
          className="shadow-sm"
          color="inherit"
        >
          <div className="max-w-7xl mx-auto w-full px-4">
            <Toolbar className="flex justify-between">
              {/* Logo */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#000000",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "900",
                        lineHeight: 1,
                        mt: -0.2,
                      }}
                    >
                      +
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      letterSpacing: "-0.02em",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    CityGeneral
                  </Typography>
                </Box>
              </Link>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <IconButton onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {(authUser
                    ? ROLE_PAGES[authUser.role] || []
                    : PUBLIC_PAGES
                  ).map((page) => (
                    <MenuItem
                      key={page.label}
                      onClick={() => {
                        handleCloseNavMenu();
                        if (page.path !== "#") navigate(page.path);
                      }}
                    >
                      {page.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {(authUser
                  ? ROLE_PAGES[authUser.role] || []
                  : PUBLIC_PAGES
                ).map((page) => (
                  <Button
                    key={page.label}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page.path !== "#") navigate(page.path);
                    }}
                    className="text-black hover:text-blue-400"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
              </div>

              {/* Search Bar */}
              {/* <div className="hidden md:flex">
                <TextField
                  size="small"
                  placeholder="Find a doctor"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  variant="outlined"
                  className="bg-gray-200 rounded-md "
                />
              </div> */}

              {/* Right Side */}
              <div className="flex items-center gap-3">
                {!authUser ? (
                  <Button
                    variant="contained"
                    onClick={handleOpenBooking}
                    className="bg-blue-600 hover:bg-blue-700 normal-case hidden md:flex whitespace-nowrap"
                  >
                    Book Appointment
                  </Button>
                ) : (
                  authUser.role === "Doctor" && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        bgcolor: "#dc2626",
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "8px",
                      }}
                      className="hidden sm:flex"
                    >
                      Emergency Alert
                    </Button>
                  )
                )}

                {isLoggedIn ? (
                  <>
                    <Tooltip title={authUser.name}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                        <Avatar
                          src={authUser.avatar || undefined}
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: "#137fec",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            border: "2px solid rgba(19,127,236,0.3)",
                          }}
                        >
                          {!authUser.avatar && getInitials(authUser.name)}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      anchorEl={anchorElUser}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      PaperProps={{
                        sx: {
                          minWidth: 200,
                          borderRadius: "12px",
                          mt: 1,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      {/* User info header */}
                      <Box
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color: "#0f172a",
                          }}
                        >
                          {authUser.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#64748b",
                            mb: 0.5,
                          }}
                        >
                          {authUser.email}
                        </Typography>
                        <Chip
                          label={authUser.role}
                          size="small"
                          sx={{
                            bgcolor: "rgba(19,127,236,0.1)",
                            color: "#137fec",
                            fontWeight: 700,
                            height: 20,
                            fontSize: "0.65rem",
                          }}
                        />
                      </Box>

                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          setProfileOpen(true);
                        }}
                        sx={{ fontSize: "0.875rem", py: 1.2 }}
                      >
                        Profile
                      </MenuItem>

                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          fontSize: "0.875rem",
                          py: 1.2,
                          color: "#dc2626",
                          fontWeight: 600,
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                    sx={{
                      borderColor: "#137fec",
                      color: "#137fec",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        borderColor: "#0f6bd1",
                        bgcolor: "rgba(19, 127, 236, 0.04)",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </Toolbar>
          </div>

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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg, #137fec 0%, #0f6bd1 100%)",
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
                      src={authUser.avatar || undefined}
                      sx={{
                        width: 72,
                        height: 72,
                        border: "3px solid rgba(255,255,255,0.4)",
                        bgcolor: "white",
                        color: "#137fec",
                        fontWeight: 700,
                      }}
                    >
                      {!authUser.avatar && getInitials(authUser.name)}
                    </Avatar>
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
                    {
                      icon: <EmailIcon />,
                      label: "Email",
                      value: authUser.email,
                    },
                    {
                      icon: <WorkIcon />,
                      label: authUser.role === "Doctor" ? "Specialty" : "Role",
                      value: authUser.specialty || authUser.role,
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
                    sx={{
                      color: "#dc2626",
                      borderColor: "#fca5a5",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            )}
          </Drawer>
        </AppBar>
      );
    }
  };

  return (
    <>
      {renderContent()}
      <ScheduleAppointment open={isBookingOpen} onClose={handleCloseBooking} />
    </>
  );
}

export default ResponsiveAppBar;
