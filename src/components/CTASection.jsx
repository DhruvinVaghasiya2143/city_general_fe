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
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 800, 
          mb: 2,
          fontSize: { xs: "1.75rem", md: "2.5rem" },
          px: 2
        }}
      >
        Ready to take control of your health?
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 500, 
          opacity: 0.9,
          maxWidth: "600px",
          mx: "auto",
          mb: 4,
          px: 4,
          fontSize: { xs: "0.9rem", md: "1.1rem" }
        }}
      >
        Book your first consultation today and experience healthcare reimagined.
      </Typography>

      <Box sx={{ 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        gap: { xs: 1, sm: 2 },
        px: { xs: 2, sm: 4 }
      }}>
        <Button
          variant="contained"
          size="large"
          sx={{ 
            flex: { xs: 1, sm: "none" },
            bgcolor: "white", 
            color: "#1976d2", 
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            px: { xs: 1, sm: 4 },
            fontSize: { xs: "0.85rem", sm: "0.9375rem" },
            "&:hover": { bgcolor: "#f8fafc" }
          }}
          onClick={() => navigate("/doctors")}
        >
          Schedule Now
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ 
            flex: { xs: 1, sm: "none" },
            color: "white", 
            borderColor: "white", 
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            px: { xs: 1, sm: 4 },
            fontSize: { xs: "0.85rem", sm: "0.9375rem" },
            borderWidth: "2px",
            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)", borderWidth: "2px" }
          }}
          onClick={() => navigate("/contact")}
        >
          Contact Our Team
        </Button>
      </Box>
    </Box>
  );
}
