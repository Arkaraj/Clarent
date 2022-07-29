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
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    let userString = localStorage.getItem("user");
    if (userString) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userString));
      AuthService.getUsersCartProducts(JSON.parse(userString).id).then(
        (data) => {
          setCartItems(data.length);
        }
      );
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
            cartItems,
            setCartItems,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
