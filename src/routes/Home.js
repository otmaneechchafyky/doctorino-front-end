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
import userIcon from "../assets/user_icon.png";

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
      <nav className="bg-cyan-300 w-[20%] flex flex-col gap-4">
        <p className="h-[8rem] bg-yellow-200">LOGO</p>
        <div className="flex flex-col gap-6 ml-4">
        <Link to="animals">
        <li className="list-none flex flex-row gap-2 justify-content items-center">
        <IoMdHome className="w-[3rem] h-[3rem]" /><span className="text-lg font-bold">Home</span>
        </li>
      </Link>
        <Link to="vets">
        <li className="list-none flex flex-row gap-2 justify-content items-center">
        <FaUserDoctor className="w-[3rem] h-[3rem]" /><span className="text-lg font-bold">Vets</span>
        </li></Link>
        <Link to="appointments">
          <li className="list-none flex flex-row gap-2 justify-content items-center">
        <AiFillCalendar className="w-[3rem] h-[3rem]" /><span className="text-lg font-bold">Appointments</span>
        </li></Link>
        <Link to='/new_appointment'>
          <li className="list-none flex flex-row gap-2 justify-content items-center">
        <IoIosAddCircleOutline className="w-[3rem] h-[3rem]" /><span className="text-lg font-bold">New app</span>
        </li></Link>
        <li className="list-none flex flex-row gap-2 justify-content items-center mt-[5rem] cursor-pointer" onClick={handleLogout}>
          <MdLogout className="w-[3rem] h-[3rem]" />
          <span className="text-lg font-bold">Log out</span>
        </li>
        </div>
      </nav>
      <div className="bg-indigo-700 flex flex-col w-[80%]">
        <header className="bg-indigo-400">
          {currentUser && (
            <div>
              <p>User Name: {currentUser.userName}</p>
              <p>Email: {currentUser.email}</p>
              <img className="w-8" src={userIcon} alt="User Icon"/>
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
