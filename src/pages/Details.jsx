import api from "../api/Base";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MdArrowBack } from "react-icons/md";
import Loader from "../components/Loader";
import Card from "../components/Card";

const Details = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [postByUser, setPostByUser] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const result = await api({
        url: `/posts/${id}`,
        method: "GET",
      });
      setPost(result?.data?.data);
    } catch (err) {
      console.log("Cannot get post!");
    }
  };

  const getAllPostsByUser = async () => {
    if (post.userId) {
      try {
        const result = await api({
          method: "GET",
          url: `/posts/byuser/${post.userId}`,
        });
        setPostByUser(result.data.data);
      } catch (err) {
        console.log("There is an error!");
      }
    }
  };

  useEffect(() => {
    fetchPost();
    getAllPostsByUser();
  }, [id, post]);

  return (
    <>
      {post ? (
        <div className="container mt-10 md:grid md:grid-cols-2 md:gap-6">
          <div className="p-4 max-h-[600px] overflow-y-auto">
            <h3 className="text-gray-400 text-xl mb-3 font-normal">
              Picture of Room
            </h3>
            <img
              className="min-w-[450px] rounded-lg mb-4 border border-gray-300/50"
              src={post?.image?.url}
              alt=""
            />
          </div>
          <div>
            <div className="p-4 mb-4">
              <h3 className="title">Actions</h3>
              <div className="w-400px flex gap-4 items-center">
                <button
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate(-1)}
                >
                  <MdArrowBack /> go back
                </button>
              </div>
            </div>
            <div className="p-4 mb-4 text-md">
              <h3 className="title">Details</h3>
              <ul className="text-gray-300 flex flex-col gap-2">
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Address: </span>
                  {post?.location}
                </li>
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Type: </span>
                  {post?.roomType} Room
                </li>
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Bill: </span>৳
                  {post?.price} / monthly
                </li>
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Description:</span>
                  <p className="max-w-[300px]">{post?.description}</p>
                </li>
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Status:</span>
                  {post?.status ? (
                    <span className="text-green-500">Avaiable</span>
                  ) : (
                    <span className="text-red-500">Sold Out</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="p-4 mb-4">
              <h3 className="title">Contact</h3>
              <ul className="text-gray-300 flex flex-col gap-1">
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Cell:</span>
                  {post?.mobile}
                </li>
                <li className="flex">
                  <span className="w-[100px] text-gray-500">Email:</span>
                  {post?.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className="container mt-10 px-4">
        <h3 className="text-gray-400 text-xl mb-3 font-normal">
          All posts of same owner
        </h3>

        <div className="py-3 max-w-[700px]">
          {postByUser.length > 0 ? (
            postByUser?.map((data, index) => <Card key={index} data={data} />)
          ) : (
            <div className="text-gray-300">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
