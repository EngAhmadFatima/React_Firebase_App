import React, { useState, useEffect } from "react";
import Firebase from "./firebase";

export const GlobalContext = React.createContext(null);

export const GlobalProvider = ({ children }) => {
  const [_globalState, set_globalState] = useState({ cash: 0, usd: 0 });

  useEffect(() => {
    Firebase.GET_GLOBAL_VALUES()
      .then((res) => {
        // console.log("res", res[0]);
        set_globalState({ cash: res[0].cash, usd: res[0].usd });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <GlobalContext.Provider value={_globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
