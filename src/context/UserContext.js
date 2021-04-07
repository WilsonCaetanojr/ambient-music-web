import React, { createContext, useState } from "react";
import api from "../services/api";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage);

  const handleChangeUser = value => {
    const keysObj = Object.keys(value);
    if (keysObj.length === 0) return;

    keysObj.forEach(key => {
      sessionStorage.setItem(key, value[key]);
    });

    api.setHeaders(value);

    const copyUser = { ...user };

    setUser(Object.assign(copyUser, value));
  };

  const logoutUser = () => {
    sessionStorage.clear();
    api.setHeaders();
    setUser({});
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: handleChangeUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
