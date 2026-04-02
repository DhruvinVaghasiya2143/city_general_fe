import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const ScheduleAppointment = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    doctorId: "",
    date: "",
    concern: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState({});
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        doctorId: "",
        date: "",
        concern: "",
      });
      setError({});
    } else {
      const fetchDoctors = async () => {
        try {
          const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
          const response = await axios.get(`${api}/public/doctors`);
          console.log("Fetched doctors:", response.data);
          const fetchedDoctors = response.data.data || response.data || [];
          setDoctors(Array.isArray(fetchedDoctors) ? fetchedDoctors : []);
        } catch (err) {
          console.error("Error fetching doctors:", err);
        }
      };
      fetchDoctors();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.doctorId) newErrors.doctorId = "Please select a doctor";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.concern) newErrors.concern = "Concern is required";
    return newErrors;
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      setIsBooking(true);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(`${api}/public/appointment`, formData);
      console.log("Appointment booked:", response.data);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      onClose();
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        doctorId: "",
        date: "",
        concern: "",
      });
    } catch (err) {
      console.error("Error booking appointment:", err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: "16px", p: 1 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
        Book Appointment
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 16, color: "#94a3b8" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ pt: 1 }} component="form" onSubmit={handleBookNow}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
            <Box>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                First Name
              </Typography>
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your first name"
                variant="outlined"
                error={!!error.firstName}
                helperText={error.firstName}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Last Name
              </Typography>
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your last name"
                variant="outlined"
                error={!!error.lastName}
                helperText={error.lastName}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Email Address (Optional)
              </Typography>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                error={!!error.email}
                helperText={error.email}
              />
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Select Doctor
              </Typography>
              <TextField
                name="doctorId"
                value={formData.doctorId || ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                select
                error={!!error.doctorId}
                helperText={error.doctorId}
                SelectProps={{
                  displayEmpty: true,
                }}
              >
                <MenuItem value="" disabled>
                  Select a doctor
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem
                    key={doctor._id || doctor.id}
                    value={doctor._id || doctor.id}
                  >
                    {doctor.firstName} {doctor.lastName}{" "}
                    {doctor.specialization || doctor.specialty
                      ? `- ${doctor.specialization || doctor.specialty}`
                      : ""}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Phone Number
              </Typography>
              <TextField
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                placeholder="Enter 10-digit phone"
                variant="outlined"
                type="text"
                inputProps={{ maxLength: 10 }}
                error={!!error.phone}
                helperText={error.phone}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
              Select Date & Time
            </Typography>
            <TextField
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              error={!!error.date}
              helperText={error.date}
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
              Briefly describe your concern
            </Typography>
            <TextField
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              placeholder="Briefly describe your concern"
              variant="outlined"
              error={!!error.concern}
              helperText={error.concern}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
          >
            <Button
              onClick={onClose}
              sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isBooking}
              sx={{
                px: 4,
                borderRadius: "8px",
                fontWeight: 700,
                textTransform: "none",
                minWidth: "160px",
              }}
            >
              {isBooking ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAppointment;
