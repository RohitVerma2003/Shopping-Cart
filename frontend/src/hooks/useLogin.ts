import axios from "axios";
import { useState } from "react";
import type { LoginData } from "../constants";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login = async (data: LoginData) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/user/login", data, {
        withCredentials: true,
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      setAuthUser(user);
      toast.success("Welcome, ", user?.name);
      return user;
    } catch (error: any) {
      console.log("Login error:", error.response?.data || error.message);
      toast.error(error.message)
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");

      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user");
      toast.success("Logged Out");
      setAuthUser(null);
    } catch (error: any) {
      console.log("Logout error:", error.response?.data || error.message);
      toast.error(error.message)
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, logout };
};

export default useLogin;
