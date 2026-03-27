import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SecurityIcon from "@mui/icons-material/Security";
import axios from "axios";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const payload = {
        ...formData,
        role: "admin",
      };

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        payload,
      );

      if (response) {
        console.log("registerResponse", response);
        navigate("/admin/login");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8fafc",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Button
          component={RouterLink}
          to="/admin/login"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "#64748b", fontWeight: 600, textTransform: "none" }}
        >
          Back to Admin Login
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center" maxWidth={1100}>
          {/* Left Content */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              gap: 4,
              pr: 4,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "inline-flex",
                  p: 1.5,
                  borderRadius: "16px",
                  bgcolor: "primary.main",
                  color: "white",
                  mb: 3,
                  boxShadow: "0 8px 16px rgba(19, 127, 236, 0.2)",
                }}
              >
                <AdminPanelSettingsIcon fontSize="large" />
              </Box>
              <Typography
                variant="h2"
                fontWeight={900}
                gutterBottom
                sx={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}
              >
                Elevate System <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  Management.
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 480, lineHeight: 1.6, mt: 2, fontWeight: 500 }}
              >
                Create an administrative account to oversee hospital operations,
                manage staff roles, and ensure platform integrity.
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}
            >
              {[
                {
                  icon: <SecurityIcon />,
                  title: "Master Control",
                  desc: "Configure global system settings and security protocols.",
                },
                {
                  icon: <VerifiedUserIcon />,
                  title: "Staff Oversight",
                  desc: "Monitor and manage accounts for doctors and pharmacists.",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Box
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      p: 1.5,
                      borderRadius: 3,
                      display: "flex",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={800}
                      color="#1e293b"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#64748b"
                      fontWeight={500}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Form Side */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "32px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 20px 50px rgba(0,0,0,0.04)",
                bgcolor: "white",
              }}
            >
              <Box mb={4}>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  gutterBottom
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  Register Admin
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Configure credentials for a new system administrator.
                </Typography>
              </Box>

              {serverError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                  {serverError}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Administrative Email"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />

                <TextField
                  label="Administrative Phone Number"
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />

                <TextField
                  label="Access Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "12px" },
                  }}
                />

                <TextField
                  label="Confirm Access Password"
                  type="password"
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />

                <Box sx={{ mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      py: 2,
                      fontWeight: 800,
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 8px 20px rgba(19, 127, 236, 0.25)",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 12px 24px rgba(19, 127, 236, 0.35)",
                      },
                    }}
                  >
                    Finalize Registration
                  </Button>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mt: 4,
                  textAlign: "center",
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                System Access Agreement: By registering, you agree to uphold
                City General's data protection and confidentiality standards.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminRegistration;
