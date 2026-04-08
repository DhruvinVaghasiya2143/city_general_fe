import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const departments = [
    "General Inquiry",
    "Cardiology",
    "Pediatrics",
    "Neurology",
    "Emergency Care",
    "Billing & Insurance",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(`${api}/public/contact`, formData);

      if (response.status === 201) {
        toast.success(
          `Thank you, ${formData.firstName}! We have received your inquiry.`,
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          department: "General Inquiry",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit inquiry. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: "#0f172a",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Contact Our Team
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: "700px",
              lineHeight: 1.6,
              mx: { xs: "auto", md: 0 },
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Have questions about our services or need to schedule an
            appointment? Reach out through the form or visit our facility using
            the map below.
          </Typography>
        </Box>

        {/* Main Content Sections */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
          }}
        >
          {/* Left: Contact Form Card */}
          <Box sx={{ width: { xs: "100%", md: "58.333%" } }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                p: { xs: 3, md: 5 },
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1 }}
                >
                  <EmailIcon color="primary" sx={{ fontSize: "2rem" }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.75rem" } }}>
                    Send us a Message
                  </Typography>
                </Box>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 3,
                    }}
                  >
                    <Box sx={{ width: { xs: "100%", sm: "calc(50% - 12px)" } }}>
                      <TextField
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        placeholder="Jane"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", sm: "calc(50% - 12px)" } }}>
                      <TextField
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        placeholder="Smith"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        placeholder="jane.smith@example.com"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                          name="department"
                          label="Department"
                          value={formData.department}
                          onChange={handleChange}
                        >
                          {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                              {dept}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <TextField
                        required
                        fullWidth
                        name="message"
                        label="Your Message"
                        placeholder="How can we help you today?"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={formData.message}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={loading}
                    sx={{
                      mt: 4,
                      py: 2,
                      borderRadius: "12px",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "1.1rem",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right: Map and Contact Info */}
          <Box sx={{ width: { xs: "100%", md: "41.666%" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                height: "100%",
              }}
            >
              {/* Map Holder */}
              <Box
                sx={{
                  flexGrow: 1,
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  minHeight: { xs: "300px", md: "400px" },
                  bgcolor: "#e2e8f0",
                  backgroundImage: 'url("/assets/map.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(20%) brightness(95%)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Map Marker Placeholder */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "white",
                      p: 1.5,
                      borderRadius: "12px",
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                      border: "1px solid #dbeafe",
                    }}
                  >
                    <BusinessIcon color="primary" />
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>
                      City General
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "10px", color: "#64748b" }}
                    >
                      Main Entrance
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Contact Mini Cards */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                  <Box
                    sx={{
                      bgcolor: "#eff6ff",
                      p: 3,
                      borderRadius: "20px",
                      height: "100%",
                      border: "1px solid #dbeafe",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  >
                    <PhoneIcon color="primary" sx={{ mb: 1.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      Call Us
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#1e40af", mb: 0.5, fontWeight: 600 }}
                    >
                      +1 (555) 000-1234
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Available 24/7 for Emergencies
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                  <Box
                    sx={{
                      bgcolor: "#eff6ff",
                      p: 3,
                      borderRadius: "20px",
                      height: "100%",
                      border: "1px solid #dbeafe",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  >
                    <LocationOnIcon color="primary" sx={{ mb: 1.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      Physical Address
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1e40af", fontWeight: 600 }}>
                      123 Healthcare Plaza
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1e40af", fontWeight: 600 }}>
                      Medical District, NY 10001
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: { xs: 12, md: 20 }, pt: { xs: 8, md: 12 }, borderTop: "1px solid #e2e8f0" }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" sx={{ color: "#64748b", fontSize: { xs: "1rem", md: "1.25rem" } }}>
              Can't find what you're looking for? Here are some quick answers.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {[
              {
                q: "How do I request records?",
                a: "Patient records can be requested via the Patient Portal or by visiting our Medical Records office in the West Wing.",
              },
              {
                q: "What are visiting hours?",
                a: "Visiting hours are daily from 8:00 AM to 8:00 PM. Intensive Care units have specific visitation protocols.",
              },
              {
                q: "Is parking available?",
                a: "Yes, we offer 24-hour valet parking at the main entrance and a multi-story public garage on 5th Avenue.",
              },
            ].map((faq, i) => (
              <Box
                key={i}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)",
                    md: "calc(33.333% - 27px)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    bgcolor: "white",
                    borderRadius: "24px",
                    border: "1px solid #e2e8f0",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "primary.main", mb: 2 }}
                  >
                    {faq.q}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", lineHeight: 1.7 }}
                  >
                    {faq.a}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
