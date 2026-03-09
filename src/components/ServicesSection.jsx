import React from "react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export default function ServicesSection() {
  const services = [
    "Emergency Care",
    "Cardiology",
    "Pediatrics",
    "Neurology",
    "Radiology",
    "Dental Center",
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        Comprehensive Key Services
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 4,
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                lg: "calc(33.333% - 16px)",
              },
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <MedicalServicesIcon color="primary" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {service}
                </Typography>
                <Typography color="text.secondary">
                  Advanced healthcare services with expert care.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
