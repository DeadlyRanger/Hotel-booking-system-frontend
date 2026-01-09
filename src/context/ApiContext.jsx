import React, { createContext, useEffect, useState } from "react";



export const backendcontext = createContext(null);

export const ApiContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userrole, setUserrole] = useState("user");

 
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userrole");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }

    if (role) {
      setUserrole(role);
    }
  }, []);


  const serverurl = import.meta.env.VITE_API_URL;
   console.log("API FROM CONTEXT =>", serverurl);

  return (
    <backendcontext.Provider
      value={{
        serverurl,
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
