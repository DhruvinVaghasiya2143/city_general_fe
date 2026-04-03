import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const AddDoctor = ({ open, onClose, onSuccess, initialRole = "doctor" }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    officeNumber: "",
    specialty: "",
    exp: "",
    location: "",
    department: "",
    workingHours: "",
    qualifications: "",
    languages: "",
    consultationFee: "",
    hospitalName: "",
    bio: "",
    role: initialRole,
  });

  React.useEffect(() => {
    if (open) {
      setFormData((prev) => ({ ...prev, role: initialRole }));
      setError({});
    }
  }, [open, initialRole]);

  const handleAddDoctor = async () => {
    try {
      console.log("Sending Data:", formData);

      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(
        `${api}/admin/add-staff`,
        formData,
      );

      console.log("Response:", response.data);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        officeNumber: "",
        specialty: "",
        exp: "",
        location: "",
        department: "",
        workingHours: "",
        qualifications: "",
        languages: "",
        consultationFee: "",
        hospitalName: "",
        bio: "",
        role: "doctor",
      });
      setError({});
    } catch (err) {
      console.error("Add Doctor Error:", err);
      if (err.response && err.response.data) {
        // If server returns a specific error message
        const serverError = err.response.data.message || "An error occurred";
        setError({ submit: serverError });
      } else {
        setError({ submit: "Failed to connect to server" });
      }
    }
  };
  const [error, setError] = useState({});
  console.log("select errors =>", error);
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
    });
  };

  const validateForm = () => {
    let newError = {};
    if (!formData.firstName) {
      newError.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newError.lastName = "Last name is required";
    }
    if (!formData.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Email is invalid";
    }
    if (!formData.password) {
      newError.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password,
      )
    ) {
      newError.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!formData.phone) {
      newError.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newError.phone = "Enter valid 10 digit phone number";
    }
    if (formData.role === "doctor") {
      if (!formData.officeNumber) {
        newError.officeNumber = "Office number is required";
      }
      if (!formData.specialty) {
        newError.specialty = "Specialty is required";
      }
      if (!formData.exp) {
        newError.exp = "Experience is required";
      }
      if (!formData.location) {
        newError.location = "Location is required";
      }
      if (!formData.department) {
        newError.department = "Department is required";
      }
      if (!formData.workingHours) {
        newError.workingHours = "Working hours is required";
      }
      if (!formData.qualifications) {
        newError.qualifications = "Qualifications is required";
      }
      if (!formData.languages) {
        newError.languages = "Languages is required";
      }
      if (!formData.consultationFee) {
        newError.consultationFee = "Consultation fee is required";
      } else if (isNaN(formData.consultationFee)) {
        newError.consultationFee = "Consultation fee must be a number";
      }
      if (!formData.hospitalName) {
        newError.hospitalName = "Hospital name is required";
      }
      if (!formData.bio) {
        newError.bio = "Bio is required";
      }
    }
    if (!formData.role) {
      newError.role = "Role is required";
    }
    console.log(newError);
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    handleAddDoctor();
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#f8fafc",
      "& fieldset": { borderColor: "#e2e8f0" },
    },
    "& .MuiInputLabel-root": {
      color: "#64748b",
      fontWeight: 600,
      fontSize: "0.9rem",
      mb: 1,
      position: "relative",
      transform: "none",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h5"
          component="span"
          sx={{ fontWeight: 800, color: "#1e293b", mb: 0.5, display: "block" }}
        >
          Add New{" "}
          {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "#64748b", fontWeight: 500, display: "block" }}
        >
          Enter the professional and personal details of the new {formData.role}
          .
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: "#f1f5f9", pt: 3 }}>
        {error.submit && (
          <Paper
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "#fef2f2",
              border: "1px solid #fee2e2",
              borderRadius: "8px",
            }}
          >
            <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
              {error.submit}
            </Typography>
          </Paper>
        )}
        {/* Personal Information Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <PersonIcon sx={{ color: "#3b82f6" }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#1e293b" }}
            >
              Personal Information
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!error.firstName}
                    helperText={error.firstName}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!error.lastName}
                    helperText={error.lastName}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!error.email}
                    helperText={error.email}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!error.password}
                    helperText={error.password}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="phone"
                    placeholder="Phone number"
                    type="text"
                    inputProps={{ maxLength: 10 }}
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!error.phone}
                    helperText={error.phone}
                    sx={textFieldStyles}
                  />
                </Grid>
                {formData.role === "doctor" && (
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                    >
                      Office/Room Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="officeNumber"
                      placeholder="e.g. Room 102"
                      value={formData.officeNumber}
                      onChange={handleChange}
                      error={!!error.officeNumber}
                      helperText={error.officeNumber}
                      sx={textFieldStyles}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Professional Details Section */}
        {formData.role === "doctor" && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <BusinessCenterIcon sx={{ color: "#3b82f6" }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#1e293b" }}
              >
                Professional Details
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Specialty
                </Typography>
                <FormControl fullWidth sx={textFieldStyles}>
                  <Select
                    name="specialty"
                    value={formData.specialty}
                    displayEmpty
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select Specialty
                    </MenuItem>
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                    <MenuItem value="Neurology">Neurology</MenuItem>
                    <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                    <MenuItem value="Dermatology">Dermatology</MenuItem>
                    <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
                    <MenuItem value="Oncology">Oncology</MenuItem>
                    <MenuItem value="Gynecology">Gynecology</MenuItem>
                    <MenuItem value="Gastroenterology">
                      Gastroenterology
                    </MenuItem>
                    <MenuItem value="Psychiatry">Psychiatry</MenuItem>
                  </Select>
                  {error.specialty && (
                    <Typography color="error" variant="caption">
                      {error.specialty}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Experience
                </Typography>
                <TextField
                  fullWidth
                  name="exp"
                  placeholder="e.g. 5+ Years"
                  value={formData.exp}
                  onChange={handleChange}
                  error={!!error.exp}
                  helperText={error.exp}
                  sx={textFieldStyles}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Location
                </Typography>
                <TextField
                  fullWidth
                  name="location"
                  placeholder="e.g. Main Hospital"
                  value={formData.location}
                  onChange={handleChange}
                  error={!!error.location}
                  helperText={error.location}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Department
                </Typography>
                <FormControl fullWidth sx={textFieldStyles}>
                  <Select
                    name="department"
                    value={formData.department}
                    displayEmpty
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select Department
                    </MenuItem>
                    <MenuItem value="Emergency">Emergency</MenuItem>
                    <MenuItem value="Outpatient">Outpatient</MenuItem>
                    <MenuItem value="Surgical">Surgical</MenuItem>
                    <MenuItem value="Radiology">Radiology</MenuItem>
                    <MenuItem value="Laboratory">Laboratory</MenuItem>
                    <MenuItem value="Pharma">Pharmacy</MenuItem>
                    <MenuItem value="IntensiveCare">ICU</MenuItem>
                    <MenuItem value="Physiotherapy">Physiotherapy</MenuItem>
                  </Select>
                  {error.department && (
                    <Typography color="error" variant="caption">
                      {error.department}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Working Hours
                </Typography>
                <FormControl fullWidth sx={textFieldStyles}>
                  <Select
                    name="workingHours"
                    value={formData.workingHours}
                    displayEmpty
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select Shift
                    </MenuItem>
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                    <MenuItem value="Night">Night</MenuItem>
                  </Select>
                  {error.workingHours && (
                    <Typography color="error" variant="caption">
                      {error.workingHours}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Qualifications
                </Typography>
                <TextField
                  fullWidth
                  name="qualifications"
                  placeholder="e.g. MD, PhD"
                  value={formData.qualifications}
                  onChange={handleChange}
                  error={!!error.qualifications}
                  helperText={error.qualifications}
                  sx={textFieldStyles}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Languages
                </Typography>
                <FormControl fullWidth sx={textFieldStyles}>
                  <Select
                    name="languages"
                    value={formData.languages}
                    displayEmpty
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select Language
                    </MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Gujarati">Gujarati</MenuItem>
                  </Select>
                  {error.languages && (
                    <Typography color="error" variant="caption">
                      {error.languages}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Consultation Fee
                </Typography>
                <TextField
                  fullWidth
                  name="consultationFee"
                  placeholder="e.g. 500"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  error={!!error.consultationFee}
                  helperText={error.consultationFee}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Hospital Name
                </Typography>
                <TextField
                  fullWidth
                  name="hospitalName"
                  placeholder="e.g. City General"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  error={!!error.hospitalName}
                  helperText={error.hospitalName}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
                >
                  Brief Bio
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="bio"
                  placeholder="Enter doctor's biography..."
                  value={formData.bio}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  error={!!error.bio}
                  helperText={error.bio}
                  sx={textFieldStyles}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        <DialogActions sx={{ pb: 3, pt: 1 }}>
          <Button onClick={onClose} sx={{ fontWeight: 700, color: "#64748b" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              bgcolor: "#3b82f6",
              borderRadius: "8px",
              px: 3,
              py: 1.2,
              fontWeight: 700,
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            Save{" "}
            {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctor;
