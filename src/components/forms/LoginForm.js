// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/loginAction';
import { loginSuccess, loginFailure } from '../../redux/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginUser(formData);
      dispatch(loginSuccess(user));
      toast.success("You Logged in sucessfully.", {
        position: toast.POSITION.TOP_LEFT,
      });
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Uncorrect email or password!", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center md:bg-teal-600">
      <form onSubmit={handleSubmit} className="w-[80%] md:w-[40%] md:bg-white md:px-5 md:py-10 flex flex-col gap-6 rounded">
      <strong className="text-3xl font-bold">Login</strong>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-4 h-16 placeholder:text-slate-500 placeholder:text-[1.1rem] border border-slate-300 outline-0 rounded"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-4 h-16 placeholder:text-slate-500 placeholder:text-[1.1rem] border border-slate-300 outline-0 rounded"
      />
      <button type="submit" className="h-16 bg-teal-600 text-white text-xl rounded hover:bg-teal-700 duration-200">Login</button>
      <p className="font-semibold flex justify-center gap-2"><span>Don't have an account?</span><Link to='/signup' className="text-teal-500 hover:text-teal-700 duration-200">Signup</Link></p>
    </form>
    <ToastContainer />
    </section>
  );
};

export default Login;
