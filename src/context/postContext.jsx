import { createContext, useState, useEffect } from "react";
import api from "../api/Base";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState({});
  const [render, setRender] = useState(1);

  const featchPost = async () => {
    try {
      const result = await api({
        url: "posts",
        method: "GET",
      });
      setPosts(result?.data?.data);
    } catch (err) {
      console.log("There is an error fetching post!");
    }
  };

  useEffect(() => {
    featchPost();
  }, [render]);

  return (
    <PostContext.Provider value={{ posts, setPosts, setRender }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
