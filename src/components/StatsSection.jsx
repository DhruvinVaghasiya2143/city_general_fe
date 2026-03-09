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
        <Grid container spacing={10} justifyContent={"space-around"}>
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  {item.icon}
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>

                  <Typography color="text.secondary">{item.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
