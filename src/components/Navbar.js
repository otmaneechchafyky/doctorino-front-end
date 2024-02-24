import React, { useState, useEffect } from "react";
import { fetchUser } from "../redux/actions/currentUserAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../redux/actions/auth/logoutAction";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillCalendar } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import choper from "../assets/doctorino.png";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LiaTimesSolid } from "react-icons/lia";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.userData);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("You Logged out successfully.", {
      position: toast.POSITION.TOP_LEFT,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const [hamburgerBool, setHamburgerBool] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 720) {
      setHamburgerBool(true)
    }
  }, [])

  const handleHamburger = () => {
    if (window.innerWidth > 720) {
      setHamburgerBool(true)
    } else {
      setHamburgerBool(!hamburgerBool);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="w-5/5 lg:w-1/5">
      {hamburgerBool ? (
        <div className="bg-teal-400 lg:flex lg:flex-col lg:gap-6 h-screen">
          <div className="bg-slate-700 flex p-2 justify-between items-center lg:hidden">
          <LiaTimesSolid className="h-8 w-8 text-white" onClick={handleHamburger} />
            {currentUser && (
              <button
                type="button"
                className="flex gap-4 bg-teal-400 p-2 rounded"
              >
                <p className="font-bold text-slate-900">
                  {currentUser.userName}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="text-slate-900"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
              </button>
            )}
          </div>
          <nav className="bg-teal-400 flex flex-col gap-6 duration-300 lg:h-screen">
            <div className="w-full flex justify-center">
              <img src={choper} alt="Choper" className="w-48 h-48" />
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <Link
                to="/home/animals"
                className="group cursor-pointer hover:bg-teal-300 p-2 w-full flex justify-start"
                onClick={handleHamburger}
              >
                <li className="list-none flex flex-row gap-2 justify-start items-center">
                  <IoMdHome className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900" />{" "}
                  <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900 group-hover:text-slate-900">
                    Home
                  </span>
                </li>
              </Link>
              <Link
                to="/home/vets"
                className="group cursor-pointer hover:bg-teal-300 p-2 w-full flex justify-start"
                onClick={handleHamburger}
              >
                <li className="list-none flex flex-row gap-2 justify-start items-center">
                  <FaUserDoctor className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />
                  <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">
                    Vets
                  </span>
                </li>
              </Link>
              <Link
                to="/home/appointments"
                className="group cursor-pointer hover:bg-teal-300 p-2 w-full flex justify-start"
                onClick={handleHamburger}
              >
                <li className="list-none flex flex-row gap-2 justify-start items-center">
                  <AiFillCalendar className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />{" "}
                  <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">
                    Appointments
                  </span>{" "}
                </li>{" "}
              </Link>{" "}
              <Link
                to="/new_appointment"
                className="group cursor-pointer hover:bg-teal-300 p-2 w-full flex justify-start"
              >
                {" "}
                <li className="list-none flex flex-row gap-2 justify-left items-center">
                  {" "}
                  <IoIosAddCircleOutline className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />{" "}
                  <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">
                    New appointment
                  </span>{" "}
                </li>{" "}
              </Link>{" "}
              <li
                className="list-none flex flex-row gap-2 justify-left items-center mt-[1rem] group cursor-pointer hover:bg-teal-300 p-2 w-full flex justify-start"
                onClick={handleLogout}
              >
                {" "}
                <MdLogout className="w-[3rem] h-[3rem] text-slate-800 group-hover:text-slate-900" />{" "}
                <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">
                  Log out
                </span>{" "}
              </li>{" "}
            </div>{" "}
            <ToastContainer />{" "}
          </nav>
        </div>
      ) : (
        <div className="bg-slate-700 flex p-2 justify-between lg:hidden">
            <HiOutlineMenuAlt2 className="h-9 w-9 text-white" onClick={handleHamburger}/>
            {currentUser && (
              <button
                type="button"
                className="flex gap-4 bg-teal-400 p-2 rounded"
              >
                <p className="font-bold text-slate-900">
                  {currentUser.userName}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="text-slate-900"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
              </button>
            )}
          </div>
      )}
    </div>
  );
};

export default Navbar;
