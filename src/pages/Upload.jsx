import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";
import PostContext from "../context/postContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/Base";
import Loader from "../components/Loader";
// location, room type, price,image, description, status, mobile, email, userId

const Upload = () => {
  const { user } = useContext(UserContext);
  const { setRender } = useContext(PostContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Single");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sendingData = {
        location,
        roomType: type,
        price,
        image,
        description,
        status: true,
        mobile,
        email,
        userId: user._id,
      };

      console.table("Sending data: ", sendingData);

      await api({
        url: "/posts",
        method: "POST",
        data: sendingData,
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data;`,
        },
      });

      toast.success("Post added!");
      setRender((pre) => pre + 1);
      setIsLoading(false);
    } catch (err) {
      toast.error("Cannot added Post!");
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="bottom-center" theme="colored" />
      <div className="max-w-[500px] mx-auto">
        <h3 className="gradient-text w-fit mx-auto text-4xl mt-6 mb-2">
          Upload New Data
        </h3>
        <form
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6"
          onSubmit={handlePost}
        >
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              location
              <span className="ml-3 text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="location"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              type
              <span className="ml-3 text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Single">Single Room</option>
              <option value="Double">Double Room</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              price (monthly)
              <span className="ml-3 text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              value={price}
              type="number"
              placeholder="price"
              required
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Description
            </label>
            <textarea
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              cols="30"
              rows="5"
            ></textarea>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Mobile
              <span className="ml-3 text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              name="mobile"
              type="number"
              placeholder="mobile"
              required
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Email
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              placeholder="email"
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              images
              <span className="ml-3 text-sm font-light lowercase text-red-600">
                required *
              </span>
            </label>
            <input
              className="shadow bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              name="images"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              placeholder="images"
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase">
              Avaiable
            </label>
            <input
              className="scale-150"
              type="checkbox"
              onChange={(e) => setStatus((pre) => !pre)}
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div> */}
          <br />
          <div className="flex items-center gap-6">
            <button
              disabled={isLoading}
              className="bg-blue-600 disabled:bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? <Loader /> : "Upload"}
            </button>
            <button
              className="bg-gray-700"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
