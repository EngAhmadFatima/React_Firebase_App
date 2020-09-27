import React, { useState, useEffect } from "react";
import Firebase from "./firebase";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    Firebase.authChange(setCurrentUser);
    //  console.log("currentUser", currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
