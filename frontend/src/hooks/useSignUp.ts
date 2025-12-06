import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import type { SignUpData } from "../constants";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (data: SignUpData) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/user/signup", data, {
        withCredentials: true,
      });

      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Welcome, ", user?.name);
      setAuthUser(user);

      return user;
    } catch (error: any) {
      console.log("Signup error:", error.response?.data || error.message);
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;
