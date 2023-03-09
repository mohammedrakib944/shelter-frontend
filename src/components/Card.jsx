import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/Base";

import { Link } from "react-router-dom";

const Card = ({ owner, data, setShouldRender }) => {
  // delete handler
  const deleteHandler = async (_ID) => {
    try {
      let text = "Are you want to Delete this post?";
      if (confirm(text) == true) {
        await api({ method: "DELETE", url: `/posts/${_ID}` });
        toast.success("Post Deleted!");
        setShouldRender((pre) => pre + 1);
      }
    } catch (err) {
      toast.fail("Could not Deleted!");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" theme="colored" />
      <div className="max-w-[800px] mx-auto bg-gray-800 border border-gray-700 flex gap-6 rounded-xl overflow-hidden shadow-lg hover:scale-105 duration-200 mb-6">
        <img className="w-[400px] h-[230px]" src={data?.image?.url} alt="" />

        <div className="flex flex-col gap-1 justify-center relative w-full">
          {owner && (
            <div className="absolute top-2 right-2 flex gap-4">
              {/* <div>
                <FiEdit className="text-blue-500 text-lg hover:text-blue-400 cursor-pointer duration-200" />
              </div> */}
              <div
                onClick={() => deleteHandler(data._id)}
                className="text-orange-500 text-xl hover:text-orange-400 cursor-pointer duration-200"
              >
                <MdDelete />
              </div>
            </div>
          )}
          <h3 className="text-gray-100">{data?.location}</h3>
          <p className="text-gray-400">{data?.roomType} Room</p>
          <p className="text-gray-400">
            <span className="text-gray-200">৳{data?.price} /</span> month
          </p>
          {data?.status ? (
            <p className="text-green-500 text-sm">Available</p>
          ) : (
            <p className="text-red-500 text-sm">Sold Out</p>
          )}

          <Link
            to={`/${data?._id}`}
            className="text-sky-500 hover:text-sky-400 w-fit mt-3"
          >
            Show Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
