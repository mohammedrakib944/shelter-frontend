import { BiSearch } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import Card from "../components/Card";
import PostContext from "../context/postContext";
import { useContext, useState, useEffect } from "react";
import Loader from "../components/Loader";

const Home = () => {
  const { posts } = useContext(PostContext);
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("Price");

  return (
    <div className="container">
      <div className="w-full text-center mt-10">
        <h2 className="text-4xl font-extrabold gradient-text">
          Find your Flat-Room/Mess
        </h2>
        <p className="text-gray-400 mt-4">ENTER YOUR LOCATION FOR SEARCH</p>
      </div>
      <div>
        <form className="w-[350px] shadow-xl mx-auto rounded-md overflow-hidden  flex items-center justify-between mt-8 bg-gray-800">
          <input
            className="w-full py-3 text-gray-200 bg-transparent px-6 focus:outline-none"
            type="text"
            placeholder="Enter location"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="px-4 py-3 text-gray-100 border-l border-gray-200/30 cursor-pointer">
            <BiSearch />
          </div>
        </form>
      </div>

      <div>
        <div className="my-6 max-w-[800px] mx-auto flex items-center justify-between">
          <h3 className="text-gray-400 font-medium text-2xl">Flats/Mess</h3>
          {/* <button
            className="gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => handleSorting()}
          >
            Sort by price <TbArrowsSort />
          </button> */}
        </div>
        <div>
          {posts?.length > 0 ? (
            posts
              .sort((a, b) => {
                return a.price - b.price;
              })
              .filter((data) =>
                data.location.toLowerCase().includes(search.toLowerCase())
              )
              .map((data, index) => <Card key={index} data={data} />)
          ) : (
            <div className="text-gray-300 flex justify-center py-6 mt-6">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
