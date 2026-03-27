import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Cardiology
import ChildCareIcon from "@mui/icons-material/ChildCare"; // Pediatrics
import PsychologyIcon from "@mui/icons-material/Psychology"; // Neurology
import ArchitectureIcon from "@mui/icons-material/Architecture"; // Orthopedics
import SpaIcon from "@mui/icons-material/Spa"; // Dermatology
import ScienceIcon from "@mui/icons-material/Science"; // Oncology
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman"; // Gynecology
import VisibilityIcon from "@mui/icons-material/Visibility"; // Ophthalmology
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // Gastroenterology
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt"; // Psychiatry
import DescriptionIcon from "@mui/icons-material/Description"; // Electronic Records
import GroupIcon from "@mui/icons-material/Group"; // Expert Team
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"; // 24/7 Care
import DirectionsIcon from "@mui/icons-material/Directions";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const iconMap = {
  FavoriteIcon: <FavoriteIcon sx={{ fontSize: 24 }} />,
  ChildCareIcon: <ChildCareIcon sx={{ fontSize: 24 }} />,
  PsychologyIcon: <PsychologyIcon sx={{ fontSize: 24 }} />,
  ArchitectureIcon: <ArchitectureIcon sx={{ fontSize: 24 }} />,
  SpaIcon: <SpaIcon sx={{ fontSize: 24 }} />,
  ScienceIcon: <ScienceIcon sx={{ fontSize: 24 }} />,
  PregnantWomanIcon: <PregnantWomanIcon sx={{ fontSize: 24 }} />,
  VisibilityIcon: <VisibilityIcon sx={{ fontSize: 24 }} />,
  MedicalServicesIcon: <MedicalServicesIcon sx={{ fontSize: 24 }} />,
  PsychologyAltIcon: <PsychologyAltIcon sx={{ fontSize: 24 }} />,
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/public/services",
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <Box className="bg-[#f6f7f8] min-h-screen pb-20">
      <Container maxWidth="xl" className="py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <Breadcrumbs className="text-xs font-medium uppercase tracking-wider mb-2">
              <MuiLink
                component={Link}
                to="/"
                underline="hover"
                color="inherit"
              >
                Home
              </MuiLink>
              <Typography
                color="text.primary"
                sx={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                Our Services
              </Typography>
            </Breadcrumbs>
            <Typography
              variant="h3"
              className="font-extrabold tracking-tight text-slate-900"
            >
              Our Medical Services
            </Typography>
            <Typography
              variant="h6"
              className="text-slate-600 font-normal max-w-2xl"
            >
              Access world-class healthcare across our specialized departments.
              We combine cutting-edge technology with compassionate care.
            </Typography>
          </div>
          {/* <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
            <IconButton
              size="small"
              className="bg-slate-100 rounded text-[#137fec]"
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              size="small"
              className="text-slate-400 hover:text-slate-600"
            >
              <ViewListIcon />
            </IconButton>
          </div> */}
        </div>

        {/* Filters */}
        {/* <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <Button
            variant="contained"
            className="rounded-full bg-[#137fec] shadow-none px-6 h-10 normal-case font-bold"
          >
            All Departments
          </Button>
          {["Urgent Care", "Surgical", "Diagnostics", "Rehabilitation"].map(
            (category) => (
              <Button
                key={category}
                variant="outlined"
                className="rounded-full border-slate-200 text-slate-700 bg-white px-6 h-10 normal-case font-medium hover:border-[#137fec]/50"
                endIcon={<KeyboardArrowDownIcon />}
              >
                {category}
              </Button>
            ),
          )}
        </div> */}

        {/* Departments Grid */}
        <Grid container spacing={7}>
          {departments.map((dept, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card
                elevation={0}
                className="group h-full max-w-[250px] flex flex-col rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                sx={{
                  border: "1px solid #e2e8f0",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
                    borderColor: "#cbd5e1",
                  },
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 160 }}
                >
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${dept.imageUrl}")` }}
                  />
                  {/* Icon badge top-left */}
                  <div className="absolute top-3 left-3 bg-[#dbeafe] p-2 rounded-lg text-[#1d6fde] shadow-sm">
                    {iconMap[dept.icon] || (
                      <FavoriteIcon sx={{ fontSize: 24 }} />
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent
                  className="p-5 flex flex-col grow"
                  sx={{ "&:last-child": { pb: "24px" } }}
                >
                  <Typography
                    variant="h6"
                    className="font-bold mb-1.5 text-slate-900 group-hover:text-[#137fec] transition-colors"
                    sx={{ fontSize: "1.05rem", lineHeight: 1.3 }}
                  >
                    {dept.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-slate-500 leading-relaxed grow"
                    sx={{ fontSize: "0.85rem", mb: 2.5 }}
                  >
                    {dept.description}
                  </Typography>
                  <div className="mt-auto pt-4">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        navigate("/doctors", {
                          state: { specialty: dept.name },
                        })
                      }
                      sx={{
                        backgroundColor: "#137fec",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        py: 1.25,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#116acc",
                          boxShadow: "none",
                        },
                      }}
                    >
                      View Specialists
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Section */}
        <div className="mt-20 pt-14 border-t border-slate-200">
          <Typography
            variant="h4"
            className="text-center text-slate-900"
            sx={{ fontWeight: 800, mb: 5, letterSpacing: "-0.5px" }}
          >
            Why Choose Our Services?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Electronic Records",
                desc: "Secure and instant access to your health history, lab results, and prescriptions through our patient portal.",
                icon: <DescriptionIcon sx={{ fontSize: 36 }} />,
              },
              {
                title: "Expert Team",
                desc: "Our multidisciplinary team of world-class specialists works together to provide coordinated, integrated care.",
                icon: <GroupIcon sx={{ fontSize: 36 }} />,
              },
              {
                title: "24/7 Care",
                desc: "Round-the-clock emergency services and urgent care support to ensure you're never without help.",
                icon: <AccessTimeFilledIcon sx={{ fontSize: 36 }} />,
              },
            ].map((feature, i) => (
              <Grid item xs={12} md={4} key={i}>
                <div
                  className="flex flex-col items-center text-center bg-white h-full max-w-[370px]"
                  style={{
                    borderRadius: 16,
                    border: "1px solid #e8edf3",
                    padding: "40px 32px 36px",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1d6fde",
                      marginBottom: 24,
                      flexShrink: 0,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0f172a",
                      mb: 1.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "0.9rem",
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Map Section */}
        <div
          className="mt-20 rounded-2xl overflow-hidden relative"
          style={{ height: 300 }}
        >
          {/* Map image — no dark overlay to keep the clean teal look */}
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMX-seZfr9b8sS2gFo8JtfnSfbm7Xxhq2vRxTad8mfMhbmfCtn18umGRRJwO-Y7TFRRykqjLc5J038q4e2jewurDwXU-ziL07pfTh-Y1EBoElWiaiQWnAXFyRQEf8gAi-JNs1ZtzxKI77Qd5ROsvzIVl084sUcPXbRD_PEaOn3KBBFXwuZ2T5T7tjlPM73nVHReibLj-zJm-SqOOu0MSnq4kfKlTzC-98UJpxHjOFs49tiDap4Kyp5Ef3Jw8W5PVmQ6LKXAgPHJsAN"
            alt="Hospital location map"
          />
          {/* Floating info card */}
          <Card
            elevation={0}
            className="absolute bottom-8 left-8"
            sx={{
              borderRadius: "14px",
              padding: "24px 28px",
              maxWidth: 290,
              boxShadow: "0 4px 24px rgba(0,0,0,0.11)",
              border: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                mb: 0.5,
                fontSize: "1.1rem",
              }}
            >
              Main Campus
            </Typography>
            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                mb: 1.5,
              }}
            >
              123 Health Blvd, Med-District
              <br />
              Chicago, IL 60601
            </Typography>
            <Button
              disableRipple
              endIcon={<DirectionsIcon sx={{ fontSize: 17 }} />}
              sx={{
                color: "#1d6fde",
                fontWeight: 700,
                fontSize: "0.875rem",
                textTransform: "none",
                p: 0,
                minWidth: 0,
                background: "none",
                "&:hover": { background: "none", color: "#1a62c8" },
              }}
            >
              Get Directions
            </Button>
          </Card>
        </div>
      </Container>
    </Box>
  );
};

export default ServicesPage;
