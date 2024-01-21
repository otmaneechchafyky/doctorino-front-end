import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/currentUserAction";
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.currentUser.status);
  const error = useSelector((state) => state.currentUser.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Please Connect again..{error}</div>;
  }

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header />
        <div className="h-screen">home</div>
      </div>
    </div>
  );
};

export default Home;
