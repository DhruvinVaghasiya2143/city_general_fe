import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockResetIcon from "@mui/icons-material/LockReset";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

// Static credentials for each role — includes user profile data stored in session
const CREDENTIALS = {
  Doctor: {
    email: "doctor@hospital.com",
    password: "doctor123",
    name: "Dr. Julian Anderson",
    role: "Doctor",
    specialty: "Cardiologist",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJmi3VoVxi5_VlVTb-WIX0MfQ8NZ0vaHUSxmf0cYUqLvtAmHn7NmQdi0j_S0HctCd4XHydAvaRy4MrBGoTUwGvWi6oCajZcaD9qPklhPkmCUWRu1EWtIAhw8tVTHxfAD-9fTHlSUynrVKceHva2JeTF5uu3ab575JUe7b-69nw8vppiR4bLnWAypqJmegkc-scNBwmW2bN7hBxpbyN8AQvK3_6BzUxL2_gQPDLdg7ht1iUnQDBm3JcdvXFsfpybaNelRbrLMRCnsX",
    route: "/doctor-dashboard",
  },
  Pharmacist: {
    email: "pharmacist@hospital.com",
    password: "pharma123",
    name: "Alex Carter",
    role: "Pharmacist",
    specialty: "Senior Pharmacist",
    avatar: "",
    route: "/pharmacists-dashboard",
  },
  Receptionist: {
    email: "receptionist@hospital.com",
    password: "recep123",
    name: "Sarah Mitchell",
    role: "Receptionist",
    specialty: "Head Receptionist",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDL5KLLiwhq_wghw0HprMVh2wXOc7FzY0NxOZuPmD15q_RbX9Cxcx655rvJiZqbMnVLXgWjQAxtW32SzTZxatw1pT6MyID7RjSQBuiveFVAoGdWUNKvwrvnuiwZB9eZCQ6fcdsDywh346uaYjcRznZXCsyeJQJGnqtE9cln3b3AV6-atz6fp5d8w0BcAbiUafUYJ0yqtrNJbQpv2h-zu5rPI9MaGWY0IDLytzVTMRZs-80BXYQBPkQXjU7QRG6QuEmFOxCr-Ygs6-T",
    route: "/receptionist-dashboard",
  },
};

const Login = () => {
  const [role, setRole] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
      setError("");
      setEmail("");
      setPassword("");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = (e) => {
    if (e) e.preventDefault();
    const cred = CREDENTIALS[role];
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (email === cred.email && password === cred.password) {
      // Store authenticated user data in sessionStorage
      const sessionUser = {
        loggedIn: true,
        role: cred.role,
        name: cred.name,
        email: cred.email,
        specialty: cred.specialty,
        avatar: cred.avatar,
        loginTime: new Date().toISOString(),
      };
      sessionStorage.setItem("authUser", JSON.stringify(sessionUser));
      setError("");
      navigate(cred.route);
    } else {
      setError("Invalid credentials. Check the hint below and try again.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f6f7f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "480px" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
              Secure Portal Login
            </Typography>
            <Typography sx={{ color: "#64748b" }}>
              Access your healthcare dashboard. Please enter your credentials.
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              bgcolor: "white",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRoleChange}
                fullWidth
                sx={{
                  mb: 4,
                  bgcolor: "#f1f5f9",
                  p: 0.5,
                  borderRadius: "12px",
                  "& .MuiToggleButton-root": {
                    border: "none",
                    borderRadius: "8px !important",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#64748b",
                    "&.Mui-selected": {
                      bgcolor: "white",
                      color: "primary.main",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      "&:hover": {
                        bgcolor: "white",
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="Doctor">Doctor</ToggleButton>
                <ToggleButton value="Pharmacist">Pharmacist</ToggleButton>
                <ToggleButton value="Receptionist">Receptionist</ToggleButton>
              </ToggleButtonGroup>

              <Box
                component="form"
                onSubmit={handleSignIn}
                noValidate
                sx={{ mt: 1 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g. name@hospital.com"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon
                            sx={{ color: "#94a3b8", fontSize: "20px" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "10px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon
                            sx={{ color: "#94a3b8", fontSize: "20px" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: "#94a3b8" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "10px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        sx={{
                          color: "#cbd5e1",
                          "&.Mui-checked": { color: "primary.main" },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  // onClick={handleSignIn}
                  endIcon={<LoginIcon fontSize="small" />}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(19, 127, 236, 0.2)",
                    mb: 4,
                  }}
                >
                  Sign In
                </Button>

                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: "10px", fontSize: "0.85rem" }}
                  >
                    {error}
                  </Alert>
                )}

                {/* Credential Hint Panel */}
                <Box
                  sx={{
                    bgcolor: "#f1f5f9",
                    borderRadius: "10px",
                    p: 2,
                    mb: 3,
                    border: "1px dashed #cbd5e1",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Demo Credentials — {role}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#334155", display: "block" }}
                  >
                    📧 <strong>{CREDENTIALS[role]?.email}</strong>
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#334155", display: "block" }}
                  >
                    🔑 <strong>{CREDENTIALS[role]?.password}</strong>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    mb: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Divider sx={{ width: "100%", position: "absolute" }} />
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "white",
                      px: 2,
                      zIndex: 1,
                      color: "#94a3b8",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    New to our portal?
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: "#f1f5f9",
                    color: "#334155",
                    "&:hover": { bgcolor: "#e2e8f0" },
                  }}
                >
                  Register New Account
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 4,
              color: "#94a3b8",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedUserIcon sx={{ fontSize: "16px" }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                HIPAA Compliant
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LockResetIcon sx={{ fontSize: "16px" }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                256-bit Encryption
              </Typography>
            </Box>
          </Box>
        </Box>
      </main>

      <footer
        style={{
          padding: "32px 24px",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="caption" sx={{ color: "#64748b" }}>
          © 2024 HealthCare Portal. All patient data is protected under
          international health privacy regulations.
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            "& span": { color: "#e2e8f0" },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            Privacy Policy
          </Typography>
          <Typography component="span" variant="caption">
            •
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            Terms of Service
          </Typography>
          <Typography component="span" variant="caption">
            •
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            Help Center
          </Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default Login;
