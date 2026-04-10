import React, { useState } from "react";
import {
  CardHeader,
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
  CircularProgress,
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
import axios from "axios";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

const Login = () => {
  const [role, setRole] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(
        `${api}/auth/login`,
        {
          email: email,
          password: password,
          role: role,
        },
      );

      const user = response.data.user;

      const sessionUser = {
        loggedIn: true,
        role: user.role,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        loginTime: new Date().toISOString(),
        id: user._id,
      };

      sessionStorage.setItem("authUser", JSON.stringify(sessionUser));


      const userRole = user.role?.toLowerCase();

      if (userRole === "doctor") navigate("/doctor-dashboard");
      if (userRole === "pharmacist") navigate("/pharmacists-dashboard");
      if (userRole === "receptionist") navigate("/receptionist-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
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
            <CardHeader
              title="Login"
              sx={{
                textAlign: "center",
                fontWeight: 900,
                mb: 1,
                padding: 0,
              }}
            />
            <CardContent sx={{ p: 0 }}>
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRoleChange}
                fullWidth
                sx={{
                  mb: 2,
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
                    onClick={() => setForgotPasswordOpen(true)}
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
                  disabled={isLoading}
                  endIcon={!isLoading && <LoginIcon fontSize="small" />}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(19, 127, 236, 0.2)",
                    mb: 0,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: "10px", fontSize: "0.85rem" }}
                  >
                    {error}
                  </Alert>
                )}
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

          </Box>
        </Box>
      </main>



      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        role={role}
      />
    </Box>
  );
};

export default Login;
