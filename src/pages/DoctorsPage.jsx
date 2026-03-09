import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiology",
      exp: "15 years exp",
      location: "North Wing, Floor 3",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6oHqJkXgbb8axhZZ3JyeqtRfk2o2BiwSFhscA90ZO2yzg-d-OIKOf3KKx8u1WgPHBf6PLSpel2pgMKvXRU2Wbd_57QDC6u9bSIIMO2J82s5UZuxvbeo2npLwdoQSf22d_-rywH6PeBfBQ-G_RcbmSRwnGhgbPBUUxYEC_uXGhMZwLoMCqQbHTBFW8sCiq35xTQNW2b3TmlM9SnTLHU2DSH7CboEGRk0rrvn__YfpYA3ok8JY1rN3sNWHdTO6kWRxkerbWQNta3ugP",
      status: "Available Today",
      statusColor: "#22c55e",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      exp: "10 years exp",
      location: "Main Building, Floor 2",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZMOOFXPQVUI1b4kZbSDmSGkY3abGQslzo3g1NQx8MtKh8wU5j7JcPhFiNlW93dM2lF3tZAcEy7xh3xuccDG91CvNrwQotT1MKzqYW7nHsutq3U_C6GSrhe3-ytyP_SyeYHliP5FwBQZ3K3OKNYPYtUOywbE2SOcfiHoJ_31m164dBN185rWsTBzRVntkIaTfdLSHQ30M8Lnl2tSfWSg8grI5qtEbJDp3JUm-tgh-k8_lnCe5eTN1bwHcPfbXgzTV3a69ZOT8PJ_d",
      status: "Next: Mon, Oct 24",
      statusColor: "#64748b",
    },
    {
      name: "Dr. Elena Rodriguez",
      specialty: "Dermatology",
      exp: "8 years exp",
      location: "East Plaza, Suite 405",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqGtZjt7dN5Ram8Qn30Z1-2NZHxZwKaaCS2OjiHGc6FXdzRZJjo-fEwCMzTateozYGpE0owCfY3Ge2MSTBFmhUVWQ-yxK6fhCvWjjcgaKupgWTwQllKhOFW0QVEV9xHeMqeATplJ4Jeh4c8LSEXMx06vkBOa6Y4JPLLPEp6B_LsVJxYW920HIbFoQsTcKgN4kCMq1NR5BPopL430ViWU6O8kRWF-ROYe_57lHGMhCsq5ThDEEkgfhfcvEK0XkNpbN0ESY_Z0o3h7Px",
      status: "Available Tomorrow",
      statusColor: "#22c55e",
    },
    {
      name: "Dr. James Wilson",
      specialty: "Neurology",
      exp: "12 years exp",
      location: "Neuro Science Center",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ErtvMfpb7y4wJz8YSdf7sWK0cYsFhIDm4QLFe9z1L4igwtQoRT3lsSNWtkUavR9vjvF_wgWs6JFASDwW6k7iVNkMMrSPvgafCyfZDSKP3sZF0quKxgu1RbBKiXn-C2wAkPRo5hVEctLX9ehld594MFP6IwPfrM2EMJ7kfqING3Vcz-j6amcAEKb3BARvuaoXrxNWVo4Z_kPNhDP_0soe9Hw-LKPqs9zn6fqFJmfFbhx3BNNQ9GnbFEbetGrbuEvvkIFAkk7Qc9kD",
      status: "Available Today",
      statusColor: "#22c55e",
    },
    {
      name: "Dr. Linda Thompson",
      specialty: "Internal Medicine",
      exp: "20 years exp",
      location: "Primary Care Wing",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD19xQVlUo2CPnw14OUAL2TZpPteXMrN_8-ZWD9pyg1Uy8gN1QIWbAOKjCQ52j_SgeaGC-Y0UkGVWwxQZbLx6lunUz7PrZFBocScPmdtU51ClYy_eCQgMhG7ghhrqsoUQlVkCsfeMkbmdvHT3rGop9cHdecOgYUhrtITWy4WeWwOlY_dEsk5viM1eo6_XeI_qx4nGjcDDaWMV2iRfBS-lh3I_VctdMcJswYcOUW4E5qbh3tQYGuFRmZ1DH3qPDEpqLjpnE_OrtxzeQz",
      status: "Next: Wed, Oct 26",
      statusColor: "#64748b",
    },
    {
      name: "Dr. Robert Hales",
      specialty: "Orthopedics",
      exp: "7 years exp",
      location: "West Wing, Sports Rehab",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc_wUU643HHHEWlb1vQBXjSbecFgwk8HV0BpQO6nPHLlCZa8SZHS9uGlEJ-0-Kt9p0_K13yQBP_ejyLB1deUqPGncU9ysQSQyhIqKFIiYNUZh7tSxZ_0XOn-Owu5QcSuGRakrB8jAhGQTguZEJmAm-Kn0FEVvp9zr0RCMJaOIar4LvyGyWQbfxeZHBEnl23xs1zcb57x-XGhIA7XBasbaub1hnb11NdPftaPHmyzwzwRVZNGR1dS_77AstnLnfLg4rDI44-NlkDGHJ",
      status: "Available Today",
      statusColor: "#22c55e",
    },
  ];

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
            Search by name, specialty, or condition to book your next
            appointment.
          </Typography>
        </Box>

        {/* Search & Filters */}
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
              placeholder="Search by name, specialty, or condition"
              variant="outlined"
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
            sx={{ mt: 3, overflowX: "auto", pb: 1 }}
          >
            <Chip
              label="Cardiology"
              onDelete={() => {}}
              deleteIcon={<CloseIcon sx={{ fontSize: "16px" }} />}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                "& .MuiChip-deleteIcon": { color: "white" },
              }}
            />
            {[
              "Dermatology",
              "Pediatrics",
              "Neurology",
              "Orthopedics",
              "All Filters",
            ].map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() => {}}
                variant="outlined"
                deleteIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />}
                onDelete={label === "All Filters" ? undefined : () => {}}
                sx={{
                  borderRadius: "99px",
                  fontWeight: 500,
                  bgcolor: "#f1f5f9",
                  border: "none",
                  "& .MuiChip-deleteIcon": { color: "#64748b" },
                }}
              />
            ))}
          </Stack>
        </Card>

        {/* Doctors Grid (Flexbox) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >
          {doctors.map((doc, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                  lg: "calc(25% - 18px)",
                  xl: "calc(20% - 19.2px)",
                },
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  bgcolor: "#cbd5e1",
                  backgroundImage: `url(${doc.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: doc.statusColor,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 800, color: "#334155" }}
                  >
                    {doc.status}
                  </Typography>
                </Box>
              </Box>

              <CardContent
                sx={{
                  p: 2.5,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, mb: 0.5, fontSize: "1.1rem" }}
                >
                  {doc.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
                >
                  {doc.specialty}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <WorkHistoryIcon
                    sx={{ fontSize: "16px", color: "#64748b" }}
                  />
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    {doc.exp}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <LocationOnIcon sx={{ fontSize: "16px", color: "#64748b" }} />
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    {doc.location}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Book Now
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      borderRadius: "8px",
                      py: 1,
                      fontWeight: 700,
                      textTransform: "none",
                      color: "#64748b",
                      bgcolor: "#f1f5f9",
                      "&:hover": { bgcolor: "#e2e8f0" },
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorsPage;
