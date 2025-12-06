import { useState } from "react";
import { Link } from "react-router-dom";
import type { SignUpData } from "../constants";
import useSignUp from "../hooks/useSignUp";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (
      !formData.name.length ||
      !formData.username.length ||
      !formData.password.length
    ) {
      toast.error("Fill all details");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords are not matching");
      return;
    }

    await signup(formData);
  };

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="w-4/5 md:w-1/4 p-3 border-2 border-b-4 border-r-4 rounded-md">
        <div className="text-3xl text-center">Sign Up</div>
        <div className="my-3">
          <input
            type="text"
            placeholder="name"
            className="p-3 border-2 border-b-4 border-r-4 rounded-md outline-none w-full"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="my-3">
          <input
            type="text"
            placeholder="username"
            className="p-3 border-2 border-b-4 border-r-4 rounded-md outline-none w-full"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            placeholder="password"
            className="p-3 border-2 border-b-4 border-r-4 rounded-md outline-none w-full"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            placeholder="Re-type password"
            className="p-3 border-2 border-b-4 border-r-4 rounded-md outline-none w-full"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>
        <button
          type="submit"
          className="p-3 border-2 border-b-4 border-r-4 rounded-md w-full cursor-pointer bg-[#FFEE91] hover:bg-[#F5C857]"
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign Up
        </button>
        <p className="mt-2">
          <Link to={"/login"} className="text-sm hover:underline">
            Already have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
