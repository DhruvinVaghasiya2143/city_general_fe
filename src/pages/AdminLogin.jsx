import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockResetIcon from "@mui/icons-material/LockReset";
import ShieldIcon from "@mui/icons-material/Shield";
import axios from "axios";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(
        `${api}/auth/login`,
        {
          email: email,
          password: password,
          role: "admin",
        },
      );

      if (response) {
        console.log("loginResponse", response);
        const user = response.data.user;

        const sessionUser = {
          loggedIn: true,
          role: "admin",
          name: user.firstName + " " + user.lastName,
          email: user.email,
          loginTime: new Date().toISOString(),
        };

        sessionStorage.setItem("authUser", JSON.stringify(sessionUser));

        // Admin Dashboard redirect
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
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
            <Box
              sx={{
                display: "inline-flex",
                p: 1.5,
                borderRadius: "16px",
                bgcolor: "primary.main",
                color: "white",
                mb: 2,
                boxShadow: "0 8px 16px rgba(19, 127, 236, 0.2)",
              }}
            >
              <ShieldIcon fontSize="large" />
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, mb: 1, letterSpacing: "-0.02em" }}
            >
              Admin Login
            </Typography>
            <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
              Authorized access only. Please sign in to manage the platform.
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              bgcolor: "white",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box component="form" onSubmit={handleSignIn} noValidate>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Administrator Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="admin@citygeneral.com"
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
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "primary.main" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Secure Password
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
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "primary.main" },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 4,
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
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", fontWeight: 500 }}
                      >
                        Keep session active
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    onClick={() => setForgotPasswordOpen(true)}
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Reset Password?
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  endIcon={<LoginIcon fontSize="small" />}
                  sx={{
                    py: 2,
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 8px 20px rgba(19, 127, 236, 0.25)",
                    mb: error ? 3 : 4,
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 24px rgba(19, 127, 236, 0.3)",
                    },
                  }}
                >
                  Access Dashboard
                </Button>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 4,
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </Alert>
                )}

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
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Administration
                  </Typography>
                </Box>

                <Button
                  component={RouterLink}
                  to="/admin/register"
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#475569",
                    borderColor: "#e2e8f0",
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      borderColor: "#cbd5e1",
                    },
                  }}
                >
                  Register New Administrator
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
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                SECURE ACCESS
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LockResetIcon sx={{ fontSize: "16px" }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                RSA ENCRYPTED
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
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8", fontWeight: 500 }}
        >
          © 2024 City General Hospital Admin Portal. Confidential System -
          Unauthorized Use is Prohibited.
        </Typography>
      </footer>

      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        role="Admin"
      />
    </Box>
  );
};

export default AdminLogin;
