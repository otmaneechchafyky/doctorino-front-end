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
import choper from "../assets/doctorino.png";

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
      <nav className="bg-teal-400 w-[20%] flex flex-col gap-6">
        <div className="w-full flex items-center justify-center">
        <img src={choper} alt="Choper" className="w-48 h-48"/>
        </div>
        <div className="flex flex-col">
          <Link to="animals" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <IoMdHome className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900">Home</span>
            </li>
          </Link>
          <Link to="vets" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <FaUserDoctor className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">Vets</span>
            </li>
          </Link>
          <Link to="appointments" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <AiFillCalendar className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">Appointments</span>
            </li>
          </Link>
          <Link to="/new_appointment" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <IoIosAddCircleOutline className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">New appointment</span>
            </li>
          </Link>
          <li
            className="list-none flex flex-row gap-2 justify-content items-center mt-[1rem] group cursor-pointer hover:bg-teal-300 p-2"
            onClick={handleLogout}
          >
            <MdLogout className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
            <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">Log out</span>
          </li>
        </div>
      </nav>
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400">
        <header className="">
          {currentUser && (
            <div>
              <p>User Name: {currentUser.userName}</p>
              <p>Email: {currentUser.email}</p>
              <img className="w-8" src={userIcon} alt="User Icon" />
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
