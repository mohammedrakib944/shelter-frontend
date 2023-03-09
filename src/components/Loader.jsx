import Loading from "../assets/loading.gif";

const Loader = () => {
  return (
    <div className="flex text-sm items-center gap-2">
      <img className="w-[22px]" src={Loading} alt="" />
      Loading...
    </div>
  );
};

export default Loader;
