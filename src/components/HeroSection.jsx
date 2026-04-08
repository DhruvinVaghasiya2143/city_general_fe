import React from "react";
import { Container, Typography, Button, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageAvatars from "./Avatar";

// ✅ Proper component
const WaitTimeDisplay = ({ waitTime, isLive }) => {
  return (
    <div className="w-full md:w-125 h-64 md:h-80 rounded-xl shadow-lg bg-[url(/reception.jpg)] bg-center bg-cover relative">
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[92%] bg-white/95 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center shadow-lg border border-white/20">
        <div>
          <h2 className="text-blue-600 font-bold text-lg md:text-xl mb-0.5">
            Emergency Wait Time
          </h2>
          <p className="text-gray-900 text-2xl md:text-3xl font-black">{waitTime} Minutes</p>
        </div>

        {isLive && (
          <div className="bg-green-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-green-200">
            <span className="text-green-600 font-bold tracking-wider text-[10px] md:text-xs">
              LIVE STATUS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="max-w-xl">
          <Typography color="primary" fontWeight="bold">
            TRUSTED MEDICAL EXCELLENCE
          </Typography>

          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              my: 2,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}
          >
            Your Health is Our Global Priority
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.6 }}>
            Providing world-class healthcare with a compassionate touch. Access the best specialists, cutting-edge technology, and 24/7 care for you and your family.
          </Typography>

          <Box sx={{ mt: 4, display: "flex", flexDirection: "row", gap: 1.5 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                flex: { xs: 1, sm: "none" }, 
                px: { xs: 1, sm: 4 }, 
                py: 1.5, 
                borderRadius: "10px", 
                fontWeight: 700, 
                textTransform: "none",
                fontSize: { xs: "0.85rem", sm: "0.9375rem" } 
              }}
              onClick={() => navigate("/doctors")}
            >
              Book Now
            </Button>
            <Button 
              variant="outlined"
              size="large"
              sx={{ 
                flex: { xs: 1, sm: "none" }, 
                px: { xs: 1, sm: 4 }, 
                py: 1.5, 
                borderRadius: "10px", 
                fontWeight: 700, 
                textTransform: "none",
                fontSize: { xs: "0.85rem", sm: "0.9375rem" } 
              }}
              onClick={() => navigate("/services")}
            >
              View Our Services
            </Button>
          </Box>
        </div>

        {/* Right Image */}
        <WaitTimeDisplay waitTime={24} isLive={true} />
      </div>
      <ImageAvatars />
      {/* ✅ Use component properly
      <div className="mt-12 flex justify-center">
        <WaitTimeDisplay waitTime={24} isLive={true} />
      </div> */}
    </Container>
  );
}
