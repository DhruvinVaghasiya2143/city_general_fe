import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
export default function WhyChooseSection() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Why CityGeneral?
        </Typography>

        <Grid
          container
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box display="flex">
                <Box
                  sx={{
                    bgcolor: "rgba(19, 127, 236, 0.1)",
                    p: 1.5,
                    borderRadius: "12px",
                    mr: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "fit-content",
                  }}
                >
                  <VerifiedIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="800" color="#0f172a">
                    Advanced Medical Tech
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5, lineHeight: 1.6 }}
                  >
                    Latest diagnostic and surgical technology providing accurate
                    results and faster recovery times for all patients.
                  </Typography>
                </Box>
              </Box>

              <Box display="flex">
                <Box
                  sx={{
                    bgcolor: "rgba(19, 127, 236, 0.1)",
                    p: 1.5,
                    borderRadius: "12px",
                    mr: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "fit-content",
                  }}
                >
                  <FavoriteIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="800" color="#0f172a">
                    Patient-Centered Approach
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5, lineHeight: 1.6 }}
                  >
                    Compassionate and personalized treatment plans tailored to
                    the unique needs and comfort of every individual.
                  </Typography>
                </Box>
              </Box>

              <Box display="flex">
                <Box
                  sx={{
                    bgcolor: "rgba(19, 127, 236, 0.1)",
                    p: 1.5,
                    borderRadius: "12px",
                    mr: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "fit-content",
                  }}
                >
                  <HealthAndSafetyIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="800" color="#0f172a">
                    Safety and Hygiene
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5, lineHeight: 1.6 }}
                  >
                    Strict adherence to international health protocols ensures
                    the safest possible environment for recovery and long-term
                    wellness.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Box
                  component="img"
                  src="/assets/mri.jpg"
                  sx={{
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    display: "block",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, pt: { xs: 4, md: 8 } }}>
                <Box
                  component="img"
                  src="/assets/waiting.jpg"
                  sx={{
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
