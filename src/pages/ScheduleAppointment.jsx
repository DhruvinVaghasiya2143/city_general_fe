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

const defaultSchedule = [
  { startTime: "09:00", endTime: "09:30" },
  { startTime: "09:30", endTime: "10:00" },
  { startTime: "10:00", endTime: "10:30" },
  { startTime: "10:30", endTime: "11:00" },
  { startTime: "11:00", endTime: "11:30" },
  { startTime: "11:30", endTime: "12:00" },
  { startTime: "13:00", endTime: "13:30" },
  { startTime: "13:30", endTime: "14:00" },
  { startTime: "14:00", endTime: "14:30" },
  { startTime: "14:30", endTime: "15:00" },
  { startTime: "15:00", endTime: "15:30" },
  { startTime: "15:30", endTime: "16:00" },
  { startTime: "16:00", endTime: "16:30" },
  { startTime: "16:30", endTime: "17:00" },
  { startTime: "17:00", endTime: "17:30" },
  { startTime: "17:30", endTime: "18:00" },
  { startTime: "18:00", endTime: "18:30" },
  { startTime: "18:30", endTime: "19:00" },
  { startTime: "19:00", endTime: "19:30" },
  { startTime: "19:30", endTime: "20:00" },
];

const ScheduleAppointment = ({
  open,
  onClose,
  onSuccess,
  doctorId: initialDoctorId = "",
  hideDoctorSelection = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    doctorId: "",
    date: "",
    timeSlot: "",
    concern: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState({});
  const [isBooking, setIsBooking] = useState(false);
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (!open) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        doctorId: "",
        date: "",
        timeSlot: "",
        concern: "",
      });
      setDoctorSchedule([]);
      setBookedSlots([]);
      setError({});
    } else {
      if (initialDoctorId) {
        setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
      }

      const fetchDoctors = async () => {
        if (hideDoctorSelection) return;
        try {
          const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
          const response = await axios.get(`${api}/public/doctors`);

          const fetchedDoctors = response.data.data || response.data || [];
          setDoctors(Array.isArray(fetchedDoctors) ? fetchedDoctors : []);
        } catch (err) {

        }
      };
      fetchDoctors();
    }
  }, [open, initialDoctorId, hideDoctorSelection]);

  useEffect(() => {
    let ignore = false;
    const fetchScheduleAndBookings = async () => {
      if (!formData.doctorId) {
        setBookedSlots([]);
        setDoctorSchedule([]);
        return;
      }

      try {
        const api = import.meta.env.VITE_API_BASE_BACKEND_URL;


        const doctorRes = await axios.get(
          `${api}/public/doctors/${formData.doctorId}`,
        );
        if (!ignore) {
          setDoctorSchedule(doctorRes.data.schedule || []);
        }


        if (formData.date) {
          const selectedDateStr = formData.date.split("T")[0];
          const bookingsRes = await axios.get(
            `${api}/public/appointments-by-doctor/${formData.doctorId}?date=${selectedDateStr}&limit=100`,
          );
          if (!ignore) {
            setBookedSlots(bookingsRes.data.data || []);
          }
        } else {
          if (!ignore) {
            setBookedSlots([]);
          }
        }
      } catch (err) {
        if (!ignore) {

        }
      }
    };

    fetchScheduleAndBookings();
    return () => {
      ignore = true;
    };
  }, [formData.doctorId, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSlotClick = (slot, isBooked) => {

    const matchesBooked = bookedSlots.some((apt) => {
      const aptDate = new Date(apt.date);

      const aptDayStr = `${aptDate.getFullYear()}-${(aptDate.getMonth() + 1).toString().padStart(2, "0")}-${aptDate.getDate().toString().padStart(2, "0")}`;
      const selectedDateStr = formData.date.split("T")[0];

      const aptTime = `${aptDate.getHours().toString().padStart(2, "0")}:${aptDate.getMinutes().toString().padStart(2, "0")}`;
      const matchesDoctor =
        typeof apt.doctorId === "string"
          ? apt.doctorId === formData.doctorId
          : apt.doctorId?._id === formData.doctorId;
      return (
        aptTime === slot.startTime &&
        aptDayStr === selectedDateStr &&
        matchesDoctor
      );
    });

    if (matchesBooked) {
      setError((prev) => ({
        ...prev,
        timeSlot: "This slot is already booked please select another slot",
      }));

    }

    let datePart = "";
    if (formData.date) {
      datePart = formData.date.split("T")[0];
    } else {
      datePart = new Date().toISOString().split("T")[0];
    }

    const daySplit = datePart.split("-");
    const timeSplit = slot.startTime.split(":");
    const slotDate = new Date(
      parseInt(daySplit[0]),
      parseInt(daySplit[1]) - 1,
      parseInt(daySplit[2]),
      parseInt(timeSplit[0]),
      parseInt(timeSplit[1]),
    );

    setFormData((prev) => ({
      ...prev,
      date: slotDate.toISOString(),
      timeSlot: slot.startTime,
    }));


    if (!matchesBooked && (error.timeSlot || error.date)) {
      setError((prev) => ({ ...prev, timeSlot: "", date: "" }));
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
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot";
    } else {

      const isStillBooked = bookedSlots.some((apt) => {
        const aptDate = new Date(apt.date);

        const aptDayStr = `${aptDate.getFullYear()}-${(aptDate.getMonth() + 1).toString().padStart(2, "0")}-${aptDate.getDate().toString().padStart(2, "0")}`;
        const selectedDateStr = formData.date.split("T")[0];

        const aptTime = `${aptDate.getHours().toString().padStart(2, "0")}:${aptDate.getMinutes().toString().padStart(2, "0")}`;
        const matchesDoctor =
          typeof apt.doctorId === "string"
            ? apt.doctorId === formData.doctorId
            : apt.doctorId?._id === formData.doctorId;
        return (
          aptTime === formData.timeSlot &&
          aptDayStr === selectedDateStr &&
          matchesDoctor
        );
      });
      if (isStillBooked) {
        newErrors.timeSlot =
          "This slot is already booked please select another slot";
      }
    }
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now.setMinutes(now.getMinutes() - 1)) {
        newErrors.date = "Appointment time cannot be in the past";
      }
    }
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



      if (onSuccess) {
        onSuccess();
      }

      onClose();

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
            {!hideDoctorSelection && (
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
                    Select doctor
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
            )}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Select Date
              </Typography>
              <TextField
                name="date"
                value={formData.date ? formData.date.split("T")[0] : ""}
                onChange={(e) => {
                  const newDateStr = e.target.value;
                  setFormData((prev) => {
                    const next = { ...prev };
                    if (prev.timeSlot) {
                      const daySplit = newDateStr.split("-");
                      const timeSplit = prev.timeSlot.split(":");
                      const nextDate = new Date(
                        parseInt(daySplit[0]),
                        parseInt(daySplit[1]) - 1,
                        parseInt(daySplit[2]),
                        parseInt(timeSplit[0]),
                        parseInt(timeSplit[1]),
                      );
                      next.date = nextDate.toISOString();
                    } else {
                      next.date = newDateStr;
                    }
                    return next;
                  });
                }}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!error.date}
                helperText={error.date}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                sx={{

                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                Select Time Slot
              </Typography>
              <TextField
                name="timeSlot"
                value={formData.timeSlot || ""}
                onChange={(e) => {
                  const selectedStartTime = e.target.value;
                  const slot = defaultSchedule.find(
                    (s) => s.startTime === selectedStartTime,
                  );
                  if (slot) {
                    handleSlotClick(slot, false);
                  }
                }}
                fullWidth
                variant="outlined"
                select
                error={!!error.timeSlot}
                helperText={error.timeSlot}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return !formData.doctorId
                        ? "Choose a doctor first"
                        : !formData.date
                          ? "Choose a date to see availability"
                          : "Choose a time";
                    }
                    const slot = defaultSchedule.find(
                      (s) => s.startTime === selected,
                    );
                    return slot
                      ? `${slot.startTime} - ${slot.endTime}`
                      : selected;
                  },
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 250,
                      },
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  {!formData.doctorId
                    ? "Choose a doctor first"
                    : !formData.date
                      ? "Choose a date to see availability"
                      : "Choose a time"}
                </MenuItem>
                {defaultSchedule.map((slot, index) => {
                  const now = new Date();
                  const todayStr = now.toISOString().split("T")[0];
                  const currentTimeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
                  const isToday =
                    formData.date && formData.date.split("T")[0] === todayStr;

                  const isBooked = bookedSlots.some((apt) => {
                    const aptDate = new Date(apt.date);
                    // Extract local day string (YYYY-MM-DD in IST)
                    const aptDayStr = `${aptDate.getFullYear()}-${(aptDate.getMonth() + 1).toString().padStart(2, "0")}-${aptDate.getDate().toString().padStart(2, "0")}`;
                    const selectedDateStr = formData.date.split("T")[0];

                    const aptTime = `${aptDate.getHours().toString().padStart(2, "0")}:${aptDate.getMinutes().toString().padStart(2, "0")}`;
                    // Strict doctor filtering: ensure the appointment belongs to the selected doctor
                    const matchesDoctor =
                      typeof apt.doctorId === "string"
                        ? apt.doctorId === formData.doctorId
                        : apt.doctorId?._id === formData.doctorId;

                    return (
                      aptTime === slot.startTime &&
                      aptDayStr === selectedDateStr &&
                      matchesDoctor
                    );
                  });

                  const isPast = isToday && slot.startTime < currentTimeStr;
                  const isDisabled = isBooked || isPast;

                  let statusLabel = "Available";
                  let statusColor = "#166534";
                  let bgColor = "#f0fdf4";
                  let dotColor = "#22c55e";

                  if (isBooked) {
                    statusLabel = "Booked";
                    statusColor = "#b91c1c";
                    bgColor = "#fee2e2";
                    dotColor = "#ef4444";
                  } else if (isPast) {
                    statusLabel = "Passed";
                    statusColor = "#64748b";
                    bgColor = "#f1f5f9";
                    dotColor = "#94a3b8";
                  }

                  return (
                    <MenuItem
                      key={index}
                      value={slot.startTime}
                      disabled={isPast}
                      onClick={(e) => {

                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.5,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography sx={{ fontWeight: 600 }}>
                          {slot.startTime} - {slot.endTime}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: bgColor,
                          px: 1,
                          py: 0.5,
                          borderRadius: "4px",
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: dotColor,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: statusColor,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.025em",
                          }}
                        >
                          {statusLabel}
                        </Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
              Briefly describe your concern
            </Typography>
            <TextField
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleBookNow(e);
                }
              }}
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
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
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
