import Card from "../components/Card";
import UserContext from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/Base";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [postByUser, setPostByUser] = useState([]);
  const [shouldRender, setShouldRender] = useState(1);

  const getAllPostsByUser = async () => {
    if (user._id) {
      try {
        const result = await api({
          method: "GET",
          url: `/posts/byuser/${user._id}`,
        });
        setPostByUser(result.data.data);
      } catch (err) {
        console.log("There is an error!");
      }
    }
  };

  useEffect(() => {
    getAllPostsByUser();
  }, [shouldRender]);

  return (
    <div className="container">
      {!user.username && <Navigate replace to="/" />}
      <div className="w-fit mt-10 mx-auto flex gap-6 items-center">
        <img
          src={user?.image?.url}
          className="w-[120px] h-[120px] rounded-full border-2 border-teal-500"
          alt=""
        />
        <div>
          <h3 className="gradient-text w-fit text-4xl mb-2">
            {user?.username}
          </h3>
          <p className="text-gray-400">{user?.address}</p>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-gray-400">{user?.phone}</p>
        </div>
      </div>
      <div>
        <div className="max-w-[800px] mx-auto flex justify-between items-center mt-12 mb-8">
          <h3 className="text-gray-400 text-xl">Uploded Flats/Mess</h3>
          <Link to="/upload">
            <button className="bg-green-600 hover:bg-green-700">Upload</button>
          </Link>
        </div>
        <div>
          {postByUser.length > 0 &&
            postByUser?.map((data, index) => (
              <Card
                key={index}
                data={data}
                setShouldRender={setShouldRender}
                owner
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
