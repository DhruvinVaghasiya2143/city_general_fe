import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import TargetIcon from "@mui/icons-material/AdsClick";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

const AboutUs = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/public/doctors",
        );
        // The API returns { data: [...], pagination: {...} }
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors for about us:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Default images to cycle through if doctor doesn't have one
  const defaultImages = [
    "/assets/doc_michael.png",
    "/assets/doc_sarah.png",
    "/assets/doc_james.png",
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "60vh",
          width: "100%",
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/assets/about_hero.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          px: { xs: 4, md: 10 },
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
          About Our Hospital
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: "600px", opacity: 0.9 }}>
          Serving our community with world-class healthcare for over 50 years.
          We are committed to excellence in every patient interaction.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Mission, Vision, Values */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {[
            {
              title: "Our Mission",
              desc: "To provide compassionate, accessible, and high-quality healthcare services to improve the well-being of the patients and communities we serve.",
              icon: <TargetIcon sx={{ fontSize: 28, color: "#1d6fde" }} />,
            },
            {
              title: "Our Vision",
              desc: "To be the healthcare provider of choice, recognized for clinical excellence, patient-centered care, and medical innovation in the region.",
              icon: <VisibilityIcon sx={{ fontSize: 28, color: "#1d6fde" }} />,
            },
            {
              title: "Our Values",
              desc: "Integrity, compassion, collaboration, and innovation drive everything we do. We treat every patient as if they were our own family.",
              icon: <FavoriteIcon sx={{ fontSize: 28, color: "#1d6fde" }} />,
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: { xs: "100%", md: "calc(33.333% - 21.333px)" },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  width: "100%",
                  maxWidth: { xs: 450, md: "none" },
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    borderColor: "#cbd5e1",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "14px",
                      bgcolor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                      mb: 1.5,
                      fontSize: "1.1rem",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* History Section */}
        <div id="history">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 8,
              mb: 15,
              alignItems: "center",
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "66.666%" } }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 3, letterSpacing: "-0.02em" }}
              >
                A Legacy of Compassionate Care
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Since our founding, City General has been at the forefront of
                medical innovation, combining state-of-the-art technology with a
                deep commitment to human-centric healing.
              </Typography>

              <Box sx={{ mt: 6 }}>
                {[
                  {
                    year: "1974",
                    title: "Humble Beginnings",
                    desc: "Founded as a small 20-bed community clinic with a focus on family medicine.",
                  },
                  {
                    year: "1995",
                    title: "Regional Expansion",
                    desc: "Opened our current main campus facility, expanding to 200 beds and specialized surgical wings.",
                  },
                  {
                    year: "Today",
                    title: "Tech-Forward Care",
                    desc: "A leading tertiary care hospital equipped with robotic surgery and advanced diagnostic imaging.",
                  },
                ].map((step, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", mb: 4, position: "relative" }}
                  >
                    <Box sx={{ mr: 3, mt: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          border: "4px solid #fff",
                          boxShadow: "0 0 0 2px #1976d2",
                          zIndex: 2,
                          position: "relative",
                        }}
                      />
                      {i < 2 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 20,
                            left: 7,
                            width: 2,
                            height: "100%",
                            bgcolor: "primary.light",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {step.year} - {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "33.333%" } }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ width: "50%" }}>
                  <Box
                    component="img"
                    src="/assets/history_1974.png"
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
                <Box sx={{ width: "50%" }}>
                  <Box
                    component="img"
                    src="/assets/history_1995.png"
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      mt: 6,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>

        {/* Team Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Dedicated to Your Health
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Our team of world-class medical professionals brings expertise from
            leading institutions to your neighborhood.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mb: 12,
            justifyContent: "center",
          }}
        >
            {doctors.length > 0 ? (
              doctors.slice(0, 4).map((doc, i) => {
                const malePool = [
                  "/assets/doc_michael.png",
                  "/assets/doc_james.png",
                  "/assets/doc_robert.png",
                ];
                const femalePool = ["/assets/doc_kiran.png", "/assets/doc_sarah.png"];

                let finalImg;
                const fullName = `${doc.firstName} ${doc.lastName}`.toLowerCase();

                if (fullName.includes("kiran")) {
                  finalImg = femalePool[0]; // Always female for Kiran
                } else {
                  // Assign from male pool for first 3, or if not Kiran
                  // Use index to skip if Kiran took a slot, but keep it simple for 4 doctors
                  if (i < 3) {
                    finalImg = malePool[i % malePool.length];
                  } else {
                    // 4th doctor gets female photo by default if not kiran, to ensure "3 men, 1 woman"
                    finalImg = femalePool[1] || femalePool[0];
                  }
                }

                return (
                  <Box
                    key={i}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "calc(50% - 16px)",
                        md: "calc(25% - 24px)",
                      },
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1/1",
                        borderRadius: 4,
                        overflow: "hidden",
                        mb: 2,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Box
                        component="img"
                        src={finalImg}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Dr. {doc.firstName} {doc.lastName}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {doc.specialty}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <Typography color="text.secondary">
              No medical specialists currently featured.
            </Typography>
          )}
        </Box>

        {/* Facilities Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 8,
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "41.666%" } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
              Our Facilities
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.8 }}
            >
              We invest in the latest medical infrastructure to ensure our
              patients receive the most effective care in a comfortable
              environment.
            </Typography>
            <List>
              {[
                "24/7 Emergency Trauma Center",
                "Advanced MRI & CT Scanning",
                "Private Patient Recovery Suites",
                "Robotic Surgical Assistance",
              ].map((text, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ sx: { fontWeight: 500 } }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "58.333%" } }}>
            {/* Using placeholders for missing facility images since quota was hit */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Box
                  component="img"
                  src="assets/emergency-room.jpg"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ width: "calc(50% - 8px)" }}>
                <Box
                  component="img"
                  src="assets/mri.jpg"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ width: "calc(50% - 8px)" }}>
                <Box
                  component="img"
                  src="assets/waiting.jpg"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
