import { createContext, useContext, useState } from "react";
import { isTokenValid } from "./jwtHelper";


const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Token before validation:", parsedUser.token);
      if (isTokenValid(parsedUser.token)) {
        return parsedUser;
      } else {
        localStorage.removeItem("user");
      }
    }
    return null;
  });

  const login = (userData) => {
    console.log("Login function userData:", userData); // Add this line
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
