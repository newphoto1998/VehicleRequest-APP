import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { userInfo } from '../../Model/UserLogin';

function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      // const token = localStorage.getItem('token');
      const users:any = localStorage.getItem("user_info");
      if (users) {
   
        try {
          const decodedToken: any = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGhhdGNoYXJhcGhvbi5mIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzQ2MDMyMDksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIwNy8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIn0.A9ihjoqm8wdcdbUdaAN5n1GFJ6aEfoNp7xWRMwG_eSo"); // Replace with your actual token
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
          setIsAuthenticated(currentTime < expirationTime); // Token is valid if it's not expired
        } catch (error) {
          setIsAuthenticated(false); // Token is invalid
        }
      } else {
        setIsAuthenticated(false); // No token found
      }
    }, []); // Runs only once on component mount
  
    return isAuthenticated;
  };




export default useAuth