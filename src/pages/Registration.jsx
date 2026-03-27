import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Registration = () => {
  const [registrationFormData, setRegistrationFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
  };  

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!registrationFormData.firstName) newErrors.firstName = "First name is required";
    if (!registrationFormData.lastName) newErrors.lastName = "Last name is required";
    if (!registrationFormData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(registrationFormData.email)) newErrors.email = "Invalid email format";
    
    if (!registrationFormData.password) newErrors.password = "Password is required";
    if (!registrationFormData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (registrationFormData.password !== registrationFormData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!role) newErrors.role = "Role is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log("Form submitted");
    const payloadToSend = { ...registrationFormData, role };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        payloadToSend,
      );

      if (response.data.success) {
        navigate("/login");
        
        console.log("registerResponse", response);
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
        }}
      >
        <Grid container spacing={6} alignItems="center" maxWidth={1000}>
          {/* Left Side: Branding/Value Prop */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight={900}
                gutterBottom
                sx={{ letterSpacing: "-0.02em" }}
              >
                Join the future of{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Healthcare.
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 450, lineHeight: 1.6 }}
              >
                Securely manage medical records, appointments, and prescriptions
                in one unified platform designed for professionals and patients.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.main",
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  <VerifiedUserIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    HIPAA Compliant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your data is encrypted with enterprise-grade security
                    standards.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.main",
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  <GroupIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Role-Based Access
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tailored experiences for doctors, pharmacists, and
                    receptionists.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                height: 256,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "primary.main",
                  opacity: 0.2,
                  mixBlendMode: "overlay",
                  zIndex: 1,
                }}
              />
              <Box
                component="img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAe31HS7aP8w-29eXAEy98RbsFNYmDj7GSXl-P7fmz7S-DrWNYRFdi377kR50bzvHncqzk3avcUh4DBgJWW_AzWHPFoqqpzcIrSM5qjNohEvLKDo2xouJhuM1aCflXL69AY5-weuf8u9SFSuZHOO9IizY-j3r967Olj2MPCyOhXy-bpbFZPCUsz-MIBo-2Bk7CEPiUrMTDii-GWKVpVp0hwxomWB7Aza8zWd1JOgR59_CWB8QmEp4j6MKuwSrBJb1E1OssWeD_1MNW"
                alt="Modern healthcare facility"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>

          {/* Right Side: Registration Form */}
          <Grid item xs={12} lg={6} sx={{ width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Box mb={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    fontWeight="bold"
                    underline="hover"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Log In
                  </Link>
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleRegisterUser}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    placeholder="John"
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    onChange={(e) => {
                      setRegistrationFormData({
                        ...registrationFormData,
                        firstName: e.target.value,
                      });
                      if (errors.firstName) {
                        setErrors((prev) => ({ ...prev, firstName: "" }));
                      }
                    }}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    placeholder="Doe"
                    name="lastName"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    onChange={(e) => {
                      setRegistrationFormData({
                        ...registrationFormData,
                        lastName: e.target.value,
                      });
                      if (errors.lastName) {
                        setErrors((prev) => ({ ...prev, lastName: "" }));
                      }
                    }}
                  />
                </Box>

                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  placeholder="name@healthcare.com"
                  name="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={(e) => {
                    setRegistrationFormData({
                      ...registrationFormData,
                      email: e.target.value,
                    });
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                />

                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    label="Role"
                    onChange={(e) => {
                      setRole(e.target.value);
                      if (errors.role) {
                        setErrors((prev) => ({ ...prev, role: "" }));
                      }
                    }}
                    name="role"
                  >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="pharmacist">Pharmacist</MenuItem>
                    <MenuItem value="receptionist">Receptionist</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.5 }}
                    >
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  placeholder="••••••••"
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={(e) => {
                    setRegistrationFormData({
                      ...registrationFormData,
                      password: e.target.value,
                    });
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  placeholder="••••••••"
                  name="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  onChange={(e) => {
                    setRegistrationFormData({
                      ...registrationFormData,
                      confirmPassword: e.target.value,
                    });
                    if (errors.confirmPassword) {
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }
                  }}
                />

                <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" id="terms" />}
                    label={
                      <Typography variant="body2" color="text.secondary">
                        I agree to the{" "}
                        <Link
                          component={RouterLink}
                          to="/terms"
                          color="primary"
                          underline="hover"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          component={RouterLink}
                          to="/privacy"
                          color="primary"
                          underline="hover"
                        >
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 2,
                    fontWeight: "bold",
                    borderRadius: 2,
                    boxShadow: 4,
                  }}
                >
                  Create Account
                </Button>
              </Box>

              <Box
                mt={4}
                pt={3}
                borderTop="1px solid"
                borderColor="divider"
                textAlign="center"
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                >
                  Trusted by leading clinics
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    mt: 2,
                    opacity: 0.5,
                    filter: "grayscale(100%)",
                  }}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 80,
                      bgcolor: "grey.400",
                      borderRadius: 1,
                    }}
                  />
                  <Box
                    sx={{
                      height: 24,
                      width: 80,
                      bgcolor: "grey.400",
                      borderRadius: 1,
                    }}
                  />
                  <Box
                    sx={{
                      height: 24,
                      width: 80,
                      bgcolor: "grey.400",
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Small */}
      <Box
        sx={{
          px: 3,
          py: 4,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 HealthSync Management Systems. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Registration;
