import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import api from "../../api/Base";
import { useContext, useState } from "react";
import UserContext from "../../context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };
      const result = await api({
        url: "/user/login",
        method: "POST",
        data: loginData,
        headers: {
          accept: "application/json",
        },
      });
      setUsername("");
      setPassword("");
      setUser(result?.data.data);
      toast.success("Login Success!");
    } catch (err) {
      toast.error("User not found!");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="bottom-center" theme="colored" />
      <div className="max-w-[500px] mx-auto">
        <h3 className="gradient-text w-fit mx-auto text-4xl mt-6 mb-2 pb-3">
          Login
        </h3>

        <form
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              usreanme
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="usreanme"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="usreanme"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              password
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>

          <br />
          <div className="flex items-center gap-6">
            <button className="bg-green-600">Login</button>

            <Link to="/auth/register">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
