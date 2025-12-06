import { FaCartShopping } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogin();

  return (
    <div className="w-full h-16 border-b-2 flex justify-center items-center bg-white">
      <Link to={'/'} className="w-[90%] md:w-4/5 text-3xl">Express Store</Link>
      {authUser && (
        <div className="flex gap-2">

          <Link to={'/cart'} className="flex justify-center items-center gap-3 border-2 p-1 md:p-2 rounded-md border-b-4 border-r-4 cursor-pointer hover:bg-[#FFCB61]">
            Cart <FaCartShopping />
          </Link>

          <button
            className="flex justify-center items-center gap-3 border-2 p-1 md:p-2 rounded-md border-b-4 border-r-4 cursor-pointer hover:bg-[#FF5555]"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
