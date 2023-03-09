import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="w-full  min-h-[60px] fixed bg-gray-800 shadow-xl z-10">
      <div className="container h-[60px] flex items-center justify-between">
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
          <Link to="/">SHELTER</Link>
        </h3>
        <div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-400 duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-gray-100 duration-200"
            >
              About
            </Link>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            {user?.username ? (
              <div className="flex gap-6">
                <Link to="/profile">
                  <div className="flex gap-4 items-center">
                    <img
                      className="w-[40px] h-[40px] rounded-full border"
                      src={user?.image.url}
                      alt=""
                    />
                    <p className="font-bold text-lg text-gray-200">
                      {user?.username}
                    </p>
                  </div>
                </Link>

                <button className="bg-blue-600" onClick={() => setUser("")}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-6">
                <Link to="/auth/register">
                  <button>Sign Up</button>
                </Link>

                <Link to="/auth/login">
                  <button>Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
