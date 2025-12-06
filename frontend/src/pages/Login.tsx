import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginData } from "../constants";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (loading) return;
    await login(formData);
  };
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className=" w-4/5 md:w-1/4 p-3 border-2 border-b-4 border-r-4 rounded-md">
        <div className="text-3xl text-center">Login</div>
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
        <button
          type="submit"
          className="p-3 border-2 border-b-4 border-r-4 rounded-md w-full cursor-pointer bg-[#FFEE91] hover:bg-[#F5C857]"
          onClick={handleSubmit}
          disabled={loading}
        >
          Login
        </button>
        <p className="mt-2">
          <Link to={"/signup"} className="text-sm hover:underline">
            New User?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
