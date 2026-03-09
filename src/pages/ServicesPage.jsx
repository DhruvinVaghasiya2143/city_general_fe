import React from "react";
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
  Chip,
  Avatar
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Cardiology
import ChildCareIcon from "@mui/icons-material/ChildCare"; // Pediatrics
import PsychologyIcon from "@mui/icons-material/Psychology"; // Neurology
import ArchitectureIcon from "@mui/icons-material/Architecture"; // Orthopedics (Close to joint/structure)
import SpaIcon from "@mui/icons-material/Spa"; // Dermatology (Skin/Wellness)
import ScienceIcon from "@mui/icons-material/Science"; // Oncology
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman"; // Maternity
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"; // Mental Health
import DescriptionIcon from "@mui/icons-material/Description"; // Electronic Records
import GroupIcon from "@mui/icons-material/Group"; // Expert Team
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"; // 24/7 Care
import DirectionsIcon from "@mui/icons-material/Directions";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const departments = [
    {
      name: "Cardiology",
      desc: "Advanced heart care including non-invasive diagnostics, interventional procedures, and cardiac rehabilitation.",
      icon: <FavoriteIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcFYysDiuw-XHV-8WJ2_bkw7HWlrcroLftbcDJLydcG2WpMBkJek0I8TqQisuG66dvSwctX0IjbhNJ6hdsteiPviJ3GwkiA9Dhwq6yNU6Ghcw3hHZ30HHOoel54U1I1DyxYzvjJo2cWNYuJw-p804KRe_pQkKo4swxDCJ60nHT_Q3gOPVW2iKZfefrfHCYn_En8DJRowpXW3Y60Chblj3sQAb5VrF7tR-K3XajkAuZGfWUXqfP21xLdBjy3TkeinQ7PYAh7hWjgne0"
    },
    {
      name: "Pediatrics",
      desc: "Comprehensive medical care for infants, children, and adolescents in a friendly environment.",
      icon: <ChildCareIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4pLR8uUucJhWNIFUZA0GkhazSNcsBA7gfq691K6P-m_syFZErOZkAbN9QWRSh0tTsNrl3eUOc31OJsZI-V_HOJhZDs-G_eV5VvoneKXy01eJuL1BsmFvvoiFgMt39h4XxB3ZEdo3An2KLsvxomrbPViZjrzsRGM3uDs-6EoxE2kqpgC6YpiqPHiUHRy2k67Xmgatc-eurQw0idTHGXP6zVS0kjYD6orhyIYnCPRdXjRWTDJr2hovKsDShbuAQ2TaFya4fDgNJJlUE"
    },
    {
      name: "Neurology",
      desc: "Expert diagnosis and treatment of disorders involving the brain, spinal cord, and peripheral nerves.",
      icon: <PsychologyIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEimYYTXEcWk5-wbHdQEKOtib3qX_Z60chg2J_LinApv1m_X1beGq1o4WYdsrGngcIVY99cxokQ3Mmu2Xnatda3CoMonYzmWeSM3R6fSNadyNcp4jqyV2ZWG1jXb6NyZMVrTFMCxvgjhH8op3tp6y985nGjYVw1BTl3luBLj0AWe-PVLdpr3THsPDpMGh8i0gH535R0L1Au2DG4O6N0l88fctJXNbVzvRWCeBOPIWjgTsoaD8OxPnT4S3j2lxF6vgI9I-1ZdAX0oEu"
    },
    {
      name: "Orthopedics",
      desc: "Specialized care for bones, joints, ligaments, and tendons, from sports injuries to joint replacement.",
      icon: <ArchitectureIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWwHap42TGczbePJQxJuUalFRHxRPj60rO12wi_EvxdZ9yAAXrEojzh4qc57eoZj0XNKVaMbbm94UEiIUTPTB4VjNsJcoecvFd-YC174qVf2cmX57PVF0hMaBk5IBldRb8eLjWWCqhG0ojOpxE6ehuuIWkpbab1FR5teNivrAqFKFRKL1prEdqPVtLB7msJDO99_NdVrl7q2-VTDrHXivGiJcXJj4pZh7e1rj7hGP1cg7dyhNGym5Q88FrLW94jKDEqc3pvAzfHcP"
    },
    {
      name: "Dermatology",
      desc: "Treatment for conditions of the skin, hair, and nails, including medical and cosmetic dermatology.",
      icon: <SpaIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs-cggY85Usw74IhfvO8mv187w28FeSuS88wDMgIE6rax61aj8vWSvpmPrFGsHAWGVdTL0dTgD1aQ54nksd9qvYHrXDqru-HqBHQy8NS0d1_6lYYg0TtOCRwYyWDsaoJoGzxLxoFHz4ehYKbki5FIXoiL13kmOTDXeAzd38laiAn6Dj9ME0WZr2zJXFK6dR0GgLXRRPhn54qTX3KCNgrdlRF_YiQANz1QLRPtM2Ujibby70JWEYcqGxjsJcQyDD8pGr7fsDCNwFLLO"
    },
    {
      name: "Oncology",
      desc: "Comprehensive cancer care utilizing the latest treatments, research, and supportive services.",
      icon: <ScienceIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa2O1Xn0vLBhwA6CrhyQtI80QNGAPKTvC5OtSNH4hIt0alE9_5nNsCIq6_y73hJrNJfIyFF84tEc1VT_Mre6enwi4t8CK1jLbEqAO6Yh8Hbmm8EqsWJ6puM9fUkMY4E38JNEaFFy3wFuZpIqUmqFc9ijufAJ_0NT5s3OMEr2Aatyxom9DuCnOjq2fP0ZdSqT_cJxqqr1GGK7cwVtSRBErZPz5-FSnNUEDtDKwNDpV0mGr8p3-GgDINJ848TS_hfBiw40-r9nD7prld"
    },
    {
      name: "Maternity",
      desc: "Nurturing care for expectant mothers and newborns throughout the pregnancy journey.",
      icon: <PregnantWomanIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZlUveSDgfPX9MojDOFKKw273p_LAEFuQ0DdISiFAVQVZ6-DKFDVTtw5AtQaQP3WtTEpO42xYj0gY0a8Brhse1SFs7LEIGPu4iyQTV_tS-SSt8LCfkC9DnLXEM4JJEdXlq6CnntdVJb8ee7QK74vu9xZlrqXJgQqDAks9smA0pw85DTxbGF28vDcB9tryx4Ik2t2UmHi3OPDkcj_rofhvr22H6R-FMQj1s6KEpeXByR8xVctNRqNWmoGMyfzdFpeJjI_RNzQABAYoG"
    },
    {
      name: "Mental Health",
      desc: "Holistic support for mental well-being, providing therapy, counseling, and psychiatric care.",
      icon: <VolunteerActivismIcon sx={{ fontSize: 24 }} />,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCILSftzRTHFH77T2ZTDlp6jDNbdAo1wTg7cELEPPi-mDpUcFcmejrY1zKRQlV9LgY-yYcRajyeAVu9HouDXboKO38_N8yT-okWQ5RKGJbU2tWY8_VI-g3goFnsDPJmo8EUgIQC6sGbBdgjINVk5sjjDJxfrCLvMKoEAqo3vusErnYVIIYDegDhz1WMMDDKEHQxUaTIPXwsvNdA7SYFzSta4QrcEIGng6cHc0nXGbSXnyqeFUIBcSJ7XdQ7GLgzMF1knDUFo5Ipa_NY"
    }
  ];

  return (
    <Box className="bg-[#f6f7f8] min-h-screen pb-20">
      <Container maxWidth="xl" className="py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <Breadcrumbs className="text-xs font-medium uppercase tracking-wider mb-2">
              <MuiLink component={Link} to="/" underline="hover" color="inherit">Home</MuiLink>
              <Typography color="text.primary" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>Our Services</Typography>
            </Breadcrumbs>
            <Typography variant="h3" className="font-extrabold tracking-tight text-slate-900">
              Our Medical Services
            </Typography>
            <Typography variant="h6" className="text-slate-600 font-normal max-w-2xl">
              Access world-class healthcare across our specialized departments. We combine cutting-edge technology with compassionate care.
            </Typography>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
            <IconButton size="small" className="bg-slate-100 rounded text-[#137fec]">
              <GridViewIcon />
            </IconButton>
            <IconButton size="small" className="text-slate-400 hover:text-slate-600">
              <ViewListIcon />
            </IconButton>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <Button variant="contained" className="rounded-full bg-[#137fec] shadow-none px-6 h-10 normal-case font-bold">
            All Departments
          </Button>
          {["Urgent Care", "Surgical", "Diagnostics", "Rehabilitation"].map((category) => (
            <Button
              key={category}
              variant="outlined"
              className="rounded-full border-slate-200 text-slate-700 bg-white px-6 h-10 normal-case font-medium hover:border-[#137fec]/50"
              endIcon={<KeyboardArrowDownIcon />}
            >
              {category}
            </Button>
          ))}
        </div>

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
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${dept.img}")` }}
                  />
                  {/* Icon badge top-left */}
                  <div className="absolute top-3 left-3 bg-[#dbeafe] p-2 rounded-lg text-[#1d6fde] shadow-sm">
                    {dept.icon}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5 flex flex-col grow" sx={{ "&:last-child": { pb: "20px" } }}>
                  <Typography
                    variant="h6"
                    className="font-bold mb-2 text-slate-900"
                    sx={{ fontSize: "1.05rem", lineHeight: 1.3 }}
                  >
                    {dept.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-slate-500 leading-relaxed grow"
                    sx={{ fontSize: "0.855rem", mb: 2.5 }}
                  >
                    {dept.desc}
                  </Typography>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<CalendarMonthIcon sx={{ fontSize: 18 }} />}
                      sx={{
                        backgroundColor: "#1d6fde",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        py: 1.25,
                        boxShadow: "none",
                        "&:hover": { backgroundColor: "#1a62c8", boxShadow: "none" },
                      }}
                    >
                      Book Appointment
                    </Button>
                    <MuiLink
                      underline="hover"
                      sx={{
                        display: "block",
                        textAlign: "center",
                        color: "#1d6fde",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        mt: 0.5,
                        "&:hover": { color: "#1a62c8" },
                      }}
                    >
                      View Specialists
                    </MuiLink>
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
                    sx={{ fontWeight: 700, color: "#0f172a", mb: 1.5, fontSize: "1.05rem" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.9rem" }}
                  >
                    {feature.desc}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Map Section */}
        <div className="mt-20 rounded-2xl overflow-hidden relative" style={{ height: 300 }}>
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
              sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5, fontSize: "1.1rem" }}
            >
              Main Campus
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.65, mb: 1.5 }}>
              123 Health Blvd, Med-District<br />
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
