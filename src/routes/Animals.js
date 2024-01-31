import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAnimal } from "../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Animals = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);
  const animals = useSelector((state) => state.animals.animalData);

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
        <ul>
        {animals && Object.keys(animals).map((key) => (
            <li key={key}>
              <img src={animals[key].data.animal_photo} alt="Animal photo" />
              <p>{animals[key].data.name}</p>
              <p>{animals[key].data.date_of_birth}</p>
              <p>{animals[key].data.escape_attempts}</p>
              <p>{animals[key].animal_owner.userName}</p>
            </li>
          ))}
        </ul>
        <Link to="/new_animal">Add Animal</Link>

      </div>
    </div>
  );
};

export default Animals;
