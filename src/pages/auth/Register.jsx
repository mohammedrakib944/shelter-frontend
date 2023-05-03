import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/Base";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!username || !phone || !password) {
      setIsLoading(false);
      toast.error("Please fill up required field!");
      return;
    }
    const sendingData = {
      username,
      email,
      address,
      phone,
      password,
      image,
    };
    try {
      const result = await api({
        url: "/user/register",
        method: "POST",
        data: sendingData,
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data;`,
        },
      });
      setUsername("");
      setEmail("");
      setAddress("");
      setPassword("");
      setPhone("");
      toast.success("Registration Success!");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="bottom-center" theme="colored" />
      <div className="max-w-[500px] mx-auto">
        <h3 className="gradient-text w-fit mx-auto text-4xl mt-6 mb-2 pb-3">
          Register
        </h3>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6"
        >
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Username{" "}
              <span className="text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Email
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Mobile{" "}
              <span className="text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              value={phone}
              placeholder="mobile"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Address
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              password{" "}
              <span className="text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Profile Picture
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="profile"
              type="file"
              placeholder="profile"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <br />
          <div className="flex items-center gap-6">
            <button
              className="bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Register"}
            </button>
            <Link to="/auth/login">
              <button className="bg-gray-700">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
