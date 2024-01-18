import { logoutUser } from "../redux/actions/logoutAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/currentUserAction";
import { ToastContainer, toast } from "react-toastify";
import { IoMdHome } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillCalendar } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.userData);
  const status = useSelector((state) => state.currentUser.status);
  const error = useSelector((state) => state.currentUser.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("You Logged out successfully.", {
      position: toast.POSITION.TOP_LEFT,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex w-full h-screen">
      <nav className="bg-cyan-300 w-[10%]">
        <Link to="animals"><IoMdHome className="w-[5rem] h-[5rem]" /></Link>
        <Link to="vets"><FaUserDoctor className="w-[5rem] h-[5rem]" /></Link>
        <Link to="appointments"><AiFillCalendar className="w-[5rem] h-[5rem]" /></Link>
        <Link to='/new_appointment'><IoIosAddCircleOutline className="w-[5rem] h-[5rem]" /></Link>
        <button type="button" onClick={handleLogout}>
          <MdLogout className="w-[5rem] h-[5rem]" />
        </button>
      </nav>
      <div className="bg-indigo-700 flex flex-col w-[90%]">
        <header className="bg-indigo-400">
          {currentUser && (
            <div>
              <p>User Name: {currentUser.userName}</p>
              <p>Email: {currentUser.email}</p>
            </div>
          )}
        </header>
        <div className="h-screen">home</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
