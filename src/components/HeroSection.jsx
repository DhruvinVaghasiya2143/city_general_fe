import React from "react";
import { Container, Typography, Button, Box, Avatar } from "@mui/material";
import ImageAvatars from "./Avatar";

// ✅ Proper component
const WaitTimeDisplay = ({ waitTime, isLive }) => {
  return (
    <div className="w-full md:w-125 h-80 rounded-xl shadow-lg bg-[url(/reception.jpg)] bg-center bg-cover relative">
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-md rounded-2xl p-3 flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-blue-600 font-bold text-xl mb-1">
            Emergency Wait Time
          </h2>
          <p className="text-gray-900 text-xl font-black">{waitTime} Minutes</p>
        </div>

        {isLive && (
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-green-600 font-bold tracking-wider text-sm">
              LIVE STATUS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <Container sx={{ py: 8 }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="max-w-xl">
          <Typography color="primary" fontWeight="bold">
            TRUSTED MEDICAL EXCELLENCE
          </Typography>

          <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>
            Your Health is Our <br />
            Global Priority
          </Typography>

          <Typography color="text.secondary">
            Providing world-class healthcare with a compassionate touch.
            <br />
            Access the best specialists, cutting-edge technology, and
            <br />
            24/7 care for you and your family.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              Book Appointment
            </Button>
            <Button variant="outlined">View Our Services</Button>
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
