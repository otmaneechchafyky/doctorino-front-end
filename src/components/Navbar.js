import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../redux/actions/auth/logoutAction";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillCalendar } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import choper from "../assets/doctorino.png";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    <nav className="bg-teal-400 w-[20%] flex flex-col gap-6">
        <div className="w-full flex justify-center">
            <img src={choper} alt="Choper" className="w-48 h-48"/>
        </div>
        <div className="flex flex-col">
          <Link to="/home/animals" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <IoMdHome className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900">Home</span>
            </li>
          </Link>
          <Link to="/home/vets" className="group cursor-pointer hover:bg-teal-300 p-2">
            <li className="list-none flex flex-row gap-2 justify-content items-center">
              <FaUserDoctor className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
              <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">Vets</span>
            </li>
          </Link>
          <Link to="/home/appointments" className="group cursor-pointer hover:bg-teal-300 p-2">
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
        <ToastContainer />
      </nav>
  )
}

export default Navbar
