import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAnimal } from "../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Animals = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser.userData)
  const status = useSelector((state) => state.animalsData.status);
  const animalsList = useSelector((state) => state.animalsData.animalsArray);

  useEffect(() => {
    dispatch(fetchAnimal());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
          <Header />
          <p>Loading ..</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
          <Header />
          <p>Something went wrong..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header />
        <ul>
          {animalsList &&
            animalsList.map((animal) => (
              <li key={animal.id}>
                  <img src={animal.animal_photo} alt="Animal"/>
                  <p>Name: {animal.name}</p>
                  <p>date_of_birth: {animal.date_of_birth}</p>
                  <p>weight: {animal.weight}</p>
                  <p>escape_attempts: {animal.escape_attempts}</p>
                  <p>genre_id: {animal.genre_id}</p>
                  <p>owner_id: {animal.owner_id}</p>
              </li>
            ))}
        </ul>
        <Link to="/new_animal">Add Animal</Link>
      </div>
    </div>
  );
};

export default Animals;
