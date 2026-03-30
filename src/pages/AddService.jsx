import React, { useState } from "react";
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
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const AddService = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState({});

  React.useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
      });
      setError({});
    }
  }, [open]);

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
    if (!formData.name) {
      newError.name = "Service name is required";
    }
    if (!formData.description) {
      newError.description = "Description is required";
    }
    if (!formData.imageUrl) {
      newError.imageUrl = "Image URL is required";
    } else if (
      !/^(http|https):\/\/[^ "]+$/.test(formData.imageUrl) &&
      !formData.imageUrl.startsWith("/")
    ) {
      // Basic URL validation or local path
      newError.imageUrl =
        "Enter a valid image URL or project path (e.g., /services/...)";
    }
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(
        `${api}/admin/services`,
        formData,
      );

      if (response.data.success) {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Add Service Error:", err);
      const serverError =
        err.response?.data?.message || "Server error during service creation";
      setError({ submit: serverError });
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h5"
          component="span"
          sx={{ fontWeight: 800, color: "#1e293b", mb: 0.5, display: "block" }}
        >
          Add New Medical Service
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "#64748b", fontWeight: 500, display: "block" }}
        >
          Enter the details for the new hospital department or service.
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

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <MedicalServicesIcon sx={{ color: "#3b82f6" }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#1e293b" }}
            >
              Service Information
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Service Name
              </Typography>
              <TextField
                fullWidth
                name="name"
                placeholder="e.g. Cardiology"
                value={formData.name}
                onChange={handleChange}
                error={!!error.name}
                helperText={error.name}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                placeholder="Describe the medical services provided..."
                value={formData.description}
                onChange={handleChange}
                error={!!error.description}
                helperText={error.description}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Image URL
              </Typography>
              <TextField
                fullWidth
                name="imageUrl"
                placeholder="https://example.com/image.png or /services/path.png"
                value={formData.imageUrl}
                onChange={handleChange}
                error={!!error.imageUrl}
                helperText={error.imageUrl}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        </Paper>

        <DialogActions sx={{ pb: 3, pt: 1 }}>
          <Button onClick={onClose} sx={{ fontWeight: 700, color: "#64748b" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
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
            Save Service
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
