import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(to right, #1976d2, #2196f3)",
        color: "white",
        textAlign: "center",
        width: "90%",
        borderRadius: "20px",
        marginInline: "auto",
        marginBlockEnd: "64px",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Ready to take control of <br /> your health?
      </Typography>

      <Typography variant="p" fontWeight="normal">
        Book your first consultation today and experience <br /> healthcare
        reimaged.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "white", color: "#1976d2", mr: 2 }}
          onClick={() => navigate("/doctors")}
        >
          Schedule Now
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
          onClick={() => navigate("/contact")}
        >
          Contact Our Team
        </Button>
      </Box>
    </Box>
  );
}
