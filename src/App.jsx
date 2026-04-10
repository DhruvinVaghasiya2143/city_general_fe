import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";
import Landing from "./pages/landing";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/login";

import Footer from "./components/footer";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DoctorsDashboard from "./pages/DoctorsDashboard";
import DoctorsPage from "./pages/DoctorsPage";
import PharmacistsPage from "./pages/PharmacistsPage";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import ServicesPage from "./pages/ServicesPage";
// import Registration from "./pages/Registration";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistration from "./pages/AdminRegistration";

function App() {
  const location = useLocation();

  const authRoutes = [
    "/login",
    "/admin/login",
    "/admin/register",
    "/registration",
  ];
  const dashboardRoutes = [
    "/admin-dashboard",
    "/pharmacists-dashboard",
    "/doctor-dashboard",
    "/receptionist-dashboard",
  ];

  const shouldShowNavbar =
    !authRoutes.includes(location.pathname) &&
    location.pathname !== "/pharmacists-dashboard";
  const shouldShowFooter =
    !authRoutes.includes(location.pathname) &&
    !dashboardRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/registration" element={<Registration />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/pharmacists-dashboard"
          element={
            <PrivateRoute allowedRoles={["Pharmacist"]}>
              <PharmacistsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["Doctor"]}>
              <DoctorsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/receptionist-dashboard"
          element={
            <PrivateRoute allowedRoles={["Receptionist"]}>
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
