import React from "react";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoodIcon from "@mui/icons-material/Mood";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function StatsSection() {
  const stats = [
    { title: "Medical Experts", value: "250+", icon: <VaccinesIcon /> },
    { title: "Modern Rooms", value: "500+", icon: <LocalHotelIcon /> },
    { title: "Years of Excellence", value: "40+", icon: <VerifiedIcon /> },
    { title: "Satisfied Patients", value: "100k+", icon: <MoodIcon /> },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 6 }}>
      <Container>
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          justifyContent="center"
        >
          {stats.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "none",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      "& svg": { fontSize: "2.5rem" },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="900"
                    sx={{ mb: 1, color: "#0f172a" }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontWeight="600"
                    sx={{ fontSize: "0.9rem" }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
