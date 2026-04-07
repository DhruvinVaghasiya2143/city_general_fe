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

const AddService = ({ open, onClose, onSuccess, initialData = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        setFormData({
          name: initialData.name || "",
          description: initialData.description || "",
          imageUrl: initialData.imageUrl || "",
          icon: initialData.icon || "MedicalServicesIcon",
        });
      } else {
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
        });
      }
      setError({});
      setSelectedFile(null);
      setPreviewUrl(initialData?.imageUrl || "");
    }
  }, [open, isEdit, initialData]);

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

    // Pass validation if either a file is selected or a valid URL is provided
    if (!selectedFile && !formData.imageUrl) {
      newError.imageUrl = "Image is required";
    } else if (!selectedFile && formData.imageUrl) {
      if (
        !/^(http|https):\/\/[^ "]+$/.test(formData.imageUrl) &&
        !formData.imageUrl.startsWith("/")
      ) {
        newError.imageUrl = "Enter a valid image URL";
      }
    }
    return newError;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
 
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError({ ...error, imageUrl: "Please select an image file" });
      return;
    }
 
    setSelectedFile(file);
    setError({ ...error, imageUrl: "" });
    
    // Create local preview URL
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    
    // Also update formData.imageUrl to pass validation if we are using it
    setFormData(prev => ({ ...prev, imageUrl: file.name }));
  };

  console.log("formData", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      
      // Use FormData for multipart/form-data request
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      
      if (selectedFile) {
        payload.append("serviceImage", selectedFile);
      } else {
        payload.append("imageUrl", formData.imageUrl);
      }

      const response = await (isEdit
        ? axios.put(`${api}/admin/services/${initialData._id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : axios.post(`${api}/admin/services`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          }));

      if (response.data.success) {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Add Service Error:", err);
      const serverError =
        err.response?.data?.message || `Server error during service ${isEdit ? "update" : "creation"}`;
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
          {isEdit ? "Edit Medical Service" : "Add New Medical Service"}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: "#64748b", fontWeight: 500, display: "block" }}
        >
          {isEdit ? "Update the details for this medical service." : "Enter the details for the new hospital department or service."}
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
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
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
                Service Image
              </Typography>
              <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start" }}>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  variant="outlined"
                  component="span"
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#3b82f6",
                    color: "#3b82f6",
                    "&:hover": { borderColor: "#2563eb", bgcolor: "#eff6ff" },
                  }}
                >
                  {previewUrl ? "Change Image" : "Upload Image"}
                </Button>
                
                {previewUrl && (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                )}
              </Box>
{/*               
              <Typography
                variant="caption"
                sx={{ display: "block", mb: 1, color: "#64748b", fontWeight: 500 }}
              >
                Or paste an image URL directly:
              </Typography>
              <TextField
                fullWidth
                name="imageUrl"
                placeholder="https://example.com/image.png"
                value={formData.imageUrl}
                onChange={handleChange}
                error={!!error.imageUrl}
                helperText={error.imageUrl}
                sx={textFieldStyles}
              /> */}
            </Grid>
          </Grid>
        </Paper>

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
            {isEdit ? "Update Service" : "Save Service"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
