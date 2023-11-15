import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../redux/actions/signUpAction" ;
import  validateForm  from '../formsValidation/validateForm'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length > 0 && validateForm(formData)) {
      try {
        dispatch(addNewUser(formData));
        toast.success("You signed up successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        toast.success(error, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else toast.error('Please implement all fields', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center md:bg-teal-600">
      <form onSubmit={handleSubmit} className="w-[80%] md:w-[40%] md:bg-white md:px-5 md:py-8 flex flex-col gap-8 rounded">
        <strong className="text-3xl font-bold text-center">Signup</strong>
        <div className="flex flex-col gap-6">
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter your username"
          className="p-4 h-16 placeholder:text-slate-500 placeholder:text-[1.1rem] border border-slate-300 outline-0 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="p-4 h-16 placeholder:text-slate-500 placeholder:text-[1.1rem] border border-slate-300 outline-0 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          className="p-4 h-16 placeholder:text-slate-500 placeholder:text-[1.1rem] border border-slate-300 outline-0 rounded"
        />
        <button type="submit" className="h-16 bg-teal-600 text-white text-xl rounded hover:bg-teal-700 duration-200">Sign Up</button>
        <p className="font-semibold flex justify-center gap-2"><span>Already have an account?</span><Link to='/' className="text-teal-500 hover:text-teal-700 duration-200">Login</Link></p>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default SignupForm;
