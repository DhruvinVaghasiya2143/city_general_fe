import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const EditUserDialog = ({ open, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (open && initialData) {
      setFormData({
        firstName: initialData.firstName || initialData.userId?.firstName || "",
        lastName: initialData.lastName || initialData.userId?.lastName || "",
        email: initialData.email || initialData.userId?.email || "",
        phone: initialData.phone || initialData.userId?.phone || "",
      });
      setError({});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (!formData.firstName) newError.firstName = "First name is required";
    if (!formData.lastName) newError.lastName = "Last name is required";
    if (!formData.email) newError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newError.email = "Email is invalid";
    if (!formData.phone) newError.phone = "Phone number is required";
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoading(true);
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      
      // Determine correct ID based on if it's a doctor profile or standard user
      const targetId = initialData.userId?._id ? initialData.userId._id : initialData._id;
      
      const response = await axios.put(`${api}/admin/users/${targetId}`, formData);

      if (response.data.success) {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Edit User Error:", err);
      const serverError = err.response?.data?.message || "Server error during user update";
      setError({ submit: serverError });
    } finally {
      setLoading(false);
    }
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
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          borderRadius: fullScreen ? 0 : "16px",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b", mb: 0.5 }}>
              Edit User Information
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
              Update the details for this staff member or user.
            </Typography>
          </Box>
          {fullScreen && (
            <IconButton onClick={onClose} sx={{ color: "#64748b" }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: "#f1f5f9", pt: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
        {error.submit && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "8px" }}>
            <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
              {error.submit}
            </Typography>
          </Paper>
        )}

        <Paper elevation={0} sx={{ p: 3, borderRadius: "12px", border: "1px solid #e2e8f0", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <PersonIcon sx={{ color: "#3b82f6" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b" }}>
              Contact Details
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                First Name
              </Typography>
              <TextField
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!error.firstName}
                helperText={error.firstName}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                Last Name
              </Typography>
              <TextField
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!error.lastName}
                helperText={error.lastName}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!error.email}
                helperText={error.email}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!error.phone}
                helperText={error.phone}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        </Paper>

        <DialogActions
          sx={{
            pb: 3,
            pt: 1,
            px: 3,
            gap: 1,
            justifyContent: fullScreen ? "stretch" : "flex-end",
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              fontWeight: 700,
              color: "#64748b",
              flex: fullScreen ? 1 : "initial",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            sx={{
              bgcolor: "#3b82f6",
              borderRadius: "8px",
              px: { xs: 2, sm: 4 },
              py: 1.2,
              fontWeight: 700,
              flex: fullScreen ? 2 : "initial",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            {loading ? "Updating..." : "Update User"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
