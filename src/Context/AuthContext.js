import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
  // Global state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    let userString = localStorage.getItem("user");
    if (userString) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userString));
    }
    setIsLoaded(true);
  }, []);

  return (
    <div>
      {!isloaded ? (
        <p className="loading"></p>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            accessToken,
            setAccessToken,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
