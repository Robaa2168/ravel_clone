import jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // Add this line
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token expired"); // Add this line
        return false;
      }
      return true;
    } catch (error) {
      console.log("Token decoding error:", error); // Add this line
      return false;
    }
  };
  
