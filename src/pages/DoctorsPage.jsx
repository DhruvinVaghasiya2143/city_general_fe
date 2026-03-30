import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import doctorImage from "../assets/doctor_image.jpg";

const SPECIALTIES = [
  "All",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "Oncology",
  "Gynecology",
  "Gastroenterology",
  "Psychiatry",
];

const DoctorsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [openBookNow, setOpenBookNow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    concern: "",
    doctorId: "",
  });
  const [doctorId, setDoctorId] = useState("");
  const [error, setError] = useState({});
  const [appointment, setAppointment] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const handleCompleteAppointment = async (id) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.patch(`${api}/appointment/status/${id}`, {
        status: "completed",
      });
      setAppointment((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, status: "completed" } : apt,
        ),
      );
      setRecentAppointments((prev) => prev.filter((apt) => apt._id !== id));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(doctorId);
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
    if (!formData.phone) {
      newError.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newError.phone = "Enter valid 10 digit phone number";
    }
    if (!formData.date) {
      newError.date = "Date is required";
    }
    if (!formData.concern) {
      newError.concern = "Concern is required";
    }
    console.log(newError);
    return newError;
  };
  const handleBookNow = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const payload = {
      ...formData,
      doctorId,
    };

    console.log("payload", payload);

    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(`${api}/public/appointment`, payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setOpenBookNow(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        concern: "",
      });
      setError({});
    }
  };

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

  const handleOpenBookNow = (doctorId) => {
    setOpenBookNow(true);
    setDoctorId(doctorId);
  };

  const handleCloseBookNow = () => {
    setOpenBookNow(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      concern: "",
    });
    setError({});
  };

  const getdoctorById = async (id) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(`${api}/public/doctors/${id}`);

      // Backend returns a single doctor object, not an array
      setDoctorProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpen = (doctor) => {
    setDoctorProfile(null); // Reset profile before fetching new data
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
    setDoctorProfile(null);
  };

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
        const response = await axios.get(`${api}/public/doctors?limit=1000`);

        setDoctors(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDoctors();
  }, []);

  useEffect(() => {
    if (location.state && location.state.specialty) {
      setSelectedSpecialty(location.state.specialty);
    }
  }, [location.state]);

  return (
    <Box sx={{ bgcolor: "#f6f7f8", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, mb: 2, tracking: "-0.033em" }}
          >
            Find a Specialist
          </Typography>
          <Typography variant="h6" sx={{ color: "#64748b", maxW: "700px" }}>
            Connect with our network of world-class medical professionals.
          </Typography>
        </Box>

        {/* Search */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "10px",
                  bgcolor: "#f1f5f9",
                  "& fieldset": { borderColor: "transparent" },
                  height: "48px",
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                px: 4,
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                height: "48px",
              }}
            >
              Search
            </Button>
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mt: 3,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { height: "4px" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "#e2e8f0",
                borderRadius: "10px",
              },
            }}
          >
            {SPECIALTIES.map((spec) => (
              <Chip
                key={spec}
                label={spec}
                onClick={() => setSelectedSpecialty(spec)}
                sx={{
                  borderRadius: "99px",
                  fontWeight: selectedSpecialty === spec ? 700 : 500,
                  bgcolor:
                    selectedSpecialty === spec ? "primary.main" : "#f1f5f9",
                  color: selectedSpecialty === spec ? "white" : "#64748b",
                  border: "none",
                  px: 1,
                  "&:hover": {
                    bgcolor:
                      selectedSpecialty === spec ? "primary.dark" : "#e2e8f0",
                  },
                  transition: "all 0.2s",
                }}
              />
            ))}
          </Stack>
        </Card>

        {/* Doctors Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {doctors
            .filter((doc) => {
              const matchesSearch = (
                doc.firstName +
                " " +
                doc.lastName +
                " " +
                doc.specialty
              )
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              const matchesSpecialty =
                selectedSpecialty === "All" ||
                doc.specialty === selectedSpecialty;
              return matchesSearch && matchesSpecialty;
            })
            .map((doc, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(33.333% - 16px)",
                    lg: "calc(25% - 18px)",
                  },
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={doctorImage}
                  alt="doctor"
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ pt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 900, textTransform: "capitalize" }}
                  >
                    {doc.firstName + " " + doc.lastName}
                  </Typography>

                  <Typography
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {doc.specialty}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {doc.exp}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {doc.location}
                  </Typography>

                  <Stack direction="column" spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ textTransform: "none", borderRadius: "8px" }}
                      onClick={() => {
                        handleOpenBookNow(doc.id);
                      }}
                    >
                      Book Now
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        handleOpen(doc);
                        getdoctorById(doc.id);
                      }}
                      sx={{ textTransform: "none", borderRadius: "8px" }}
                    >
                      View Profile
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Container>

      {/* Booking Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          View Profile
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 16, top: 16, color: "#94a3b8" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {selectedDoctor && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Box
                  component="img"
                  src={doctorImage}
                  alt="doctor"
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      Name:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedDoctor.firstName + " " + selectedDoctor.lastName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Speciality:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedDoctor.specialty}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Location:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedDoctor.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Department:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {doctorProfile?.department ||
                        selectedDoctor.department ||
                        "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Experience:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedDoctor.exp}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Office Number:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {doctorProfile?.officeNumber || "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {" "}
                      Working Hours:
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {doctorProfile?.workingHours || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          {/* <Button
            onClick={handleClose}
            sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleClose}
            sx={{
              px: 4,
              borderRadius: "8px",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Confirm Booking
          </Button> */}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openBookNow}
        onClose={handleCloseBookNow}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          Book Appointment
          <IconButton
            onClick={handleCloseBookNow}
            sx={{ position: "absolute", right: 16, top: 16, color: "#94a3b8" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ pt: 1 }} component="form" onSubmit={handleBookNow}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
            >
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
                />
                {error.firstName && (
                  <Typography sx={{ color: "red", mt: 0.5 }}>
                    {error.firstName}
                  </Typography>
                )}
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
                />
                {error.lastName && (
                  <Typography sx={{ color: "red", mt: 0.5 }}>
                    {error.lastName}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography sx={{ mb: 0.5, fontWeight: 600, color: "#334155" }}>
                  Email Address
                </Typography>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  type="email"
                />
                {error.email && (
                  <Typography sx={{ color: "red", mt: 0.5 }}>
                    {error.email}
                  </Typography>
                )}
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
                />
                {error.phone && (
                  <Typography sx={{ color: "red", mt: 0.5 }}>
                    {error.phone}
                  </Typography>
                )}
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
              />
              {error.date && (
                <Typography sx={{ color: "red", mt: 0.5 }}>
                  {error.date}
                </Typography>
              )}
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
              />
              {error.concern && (
                <Typography sx={{ color: "red", mt: 0.5 }}>
                  {error.concern}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                onClick={handleCloseBookNow}
                sx={{
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  px: 4,
                  borderRadius: "8px",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Confirm Booking
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DoctorsPage;
