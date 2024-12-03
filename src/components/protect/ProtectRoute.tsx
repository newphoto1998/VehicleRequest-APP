import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


// interface ProtectedRouteProps {
//     isAuthenticated: boolean;  // To check if the user is authenticated
//     redirectTo: string;        // Path to redirect to if not authenticated
//     children?: React.ReactNode; // Children (nested routes)
//   }
const ProtectedRoute = ({ redirectPath ="/",children}:any) => {
    
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return navigate(redirectPath);
  }

  return (
    children
  );
};

export default ProtectedRoute;
