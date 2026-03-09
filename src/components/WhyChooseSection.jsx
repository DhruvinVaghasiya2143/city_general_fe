import React from "react";
import { Box, Container, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
export default function WhyChooseSection() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Why Choose CityGeneral?
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            mt: 6,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box display="flex" mb={3}>
              <VerifiedIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">Advanced Medical Tech</Typography>
                <Typography color="text.secondary">
                  Latest diagnostic and surgical technology.
                </Typography>
              </Box>
            </Box>

            <Box display="flex">
              <FavoriteIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">
                  Patient-Centered Approach
                </Typography>
                <Typography color="text.secondary">
                  Compassionate and personalized treatment.
                </Typography>
              </Box>
            </Box>

            <Box display="flex" mt={3}>
              <HealthAndSafetyIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">Safety and Hygiene</Typography>
                <Typography color="text.secondary">
                  Strict adherence to international health <br />
                  protocols ensures the safest possible <br />
                  environment for recovery.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "45%" } }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ width: "50%" }}>
                <Box
                  component="img"
                  src="/assets/mri.jpg"
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
                  src="/assets/waiting.jpg"
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
      </Container>
    </Box>
  );
}
