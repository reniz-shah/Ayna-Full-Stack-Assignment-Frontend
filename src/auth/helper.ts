  
import { AUTH_TOKEN, IUser, USER } from "../constants/constant";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token:string) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const getUser = () => {
  const user = localStorage.getItem(USER)
  return user ? JSON.parse(user) : "";
};

export const setUser = (user:IUser) => {
  if (user) {
    localStorage.setItem(USER, JSON.stringify(user));
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER);
};