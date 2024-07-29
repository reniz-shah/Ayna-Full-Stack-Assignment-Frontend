import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { message } from "antd";
import { API, BEARER, IUser } from "../constants/constant";
import { useEffect } from "react";
import { getToken, setUser } from "./helper";

const AuthProvider = ({ children }:any) => {
  const [userData, setUserData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      await response.json();
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: IUser) => {
    setUserData(user);
    setUser(user)
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;