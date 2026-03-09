import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;
