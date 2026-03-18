import { createContext, useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${API}/api/v1/user/register`,
        { name, email, password },
        { withCredentials: true },
      );
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        if (res.data.user) setUser(res.data.user);
        navigate("/user/me");
      }
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${API}/api/v1/user/login`,
        { email, password },
        { withCredentials: true },
      );
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        if (res.data.user) setUser(res.data.user);
        navigate("/user/me");
      }
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  },[navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API}/api/v1/user/me`,
            {headers: {Authorization: `Bearer ${token}`},
                withCredentials:true}
        );
        setUser(res.data)
      } catch (error) {
        console.error("User fetch failed:", error);
        logout();
      }
    };
    fetchUser();
  },[token,logout]);

  return (
    <UserContext.Provider value={{ register, login, logout, user, token, loading }}>
        {children}
    </UserContext.Provider>
  );
};

