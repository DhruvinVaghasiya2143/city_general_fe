import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const authUser = sessionStorage.getItem("authUser");

  if (!authUser) {
    if (
      allowedRoles &&
      (allowedRoles.includes("Admin") || allowedRoles.includes("admin"))
    ) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(authUser);
  const userRole = user.role?.toLowerCase();

  // If allowedRoles is provided, check if user's role is in the list
  if (
    allowedRoles &&
    !allowedRoles.map((r) => r.toLowerCase()).includes(userRole)
  ) {
    // Redirect to their own dashboard if they are trying to access someone else's
    if (userRole === "doctor") return <Navigate to="/doctor-dashboard" />;
    if (userRole === "pharmacist")
      return <Navigate to="/pharmacists-dashboard" />;
    if (userRole === "receptionist")
      return <Navigate to="/receptionist-dashboard" />;
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;
