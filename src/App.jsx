import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import StatsSection from "./components/StatsSection";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyChooseSection from "./components/WhyChooseSection";
import CTASection from "./components/CTASection";
import Footer from "./components/footer";
import AboutUs from "./pages/AboutUs";
import ServicesPage from "./pages/ServicesPage";
import DoctorsPage from "./pages/DoctorsPage";
import ContactUs from "./pages/ContactUs";
import DoctorsDashboard from "./pages/DoctorsDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import PharmacistsPage from "./pages/PharmacistsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/pharmacists-dashboard"
          element={
            <PrivateRoute>
              <PharmacistsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute>
              <DoctorsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/receptionist-dashboard"
          element={
            <PrivateRoute>
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
