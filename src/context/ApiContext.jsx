import React, { createContext, useState, useEffect } from "react";

export const backendcontext = createContext();

export const ApiContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userrole, setUserrole] = useState("user");

  // load from localStorage on refresh
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userrole");

    if (loggedIn === "true") setIsLoggedIn(true);
    if (role) setUserrole(role);
  }, []);

  return (
    <backendcontext.Provider
      value={{
         serverurl:`http://localhost:3000`,
        isLoggedIn,
        setIsLoggedIn,
        userrole,
        setUserrole,
      }}
    >
      {children}
    </backendcontext.Provider>
  );
};

export default ApiContext;
