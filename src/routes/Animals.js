import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAnimal } from "../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Animals = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);

  useEffect(() => {
    dispatch(fetchAnimal());
  }, [dispatch]);

  if (status === "failed") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
          <p>Something is wrong ..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header title="Animals"/>
        <Link to="/new_animal">Add Animal</Link>
      </div>
    </div>
  );
};

export default Animals;
