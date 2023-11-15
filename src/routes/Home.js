import React from 'react'
import { logout } from '../redux/slices/loginSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You Logged out sucessfully.", {
      position: toast.POSITION.TOP_LEFT,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }
  return (
    <div>
      <button type='button' onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Home
