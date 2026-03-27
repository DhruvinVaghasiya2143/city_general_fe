import { useState, useEffect } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/public/doctors",
        );
        setDoctors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDoctors();
  }, []);

  console.log(doctors);

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

            {["Dermatology", "Pediatrics", "Neurology", "Orthopedics"].map(
              (label) => (
                <Chip
                  key={label}
                  label={label}
                  variant="outlined"
                  deleteIcon={
                    <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
                  }
                  sx={{
                    borderRadius: "99px",
                    fontWeight: 500,
                    bgcolor: "#f1f5f9",
                    border: "none",
                  }}
                />
              ),
            )}
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
                },
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {doc.name}
                </Typography>

                <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
                  {doc.specialty}
                </Typography>
                
                <

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WorkHistoryIcon sx={{ fontSize: "16px" }} />
                  <Typography variant="body2">{doc.exp}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: "16px" }} />
                  <Typography variant="body2">{doc.location}</Typography>
                </Box>

                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorsPage;
