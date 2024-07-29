import { createContext, useContext } from "react";
import { BaseAuthContext } from "../constants/constant";

export const AuthContext = createContext(BaseAuthContext);

export const useAuthContext = () => useContext(AuthContext);