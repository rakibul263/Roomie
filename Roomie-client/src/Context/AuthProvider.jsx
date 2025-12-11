import React from "react";
import { AuthContext } from "./AuthContext";
import app from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userInfo = { createUser };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
