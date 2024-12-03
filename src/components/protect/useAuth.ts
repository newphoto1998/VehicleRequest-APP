import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
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