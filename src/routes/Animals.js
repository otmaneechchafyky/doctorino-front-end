import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnimal } from "../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Animals = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const animals = useSelector((state) => state.animals.animalData);
  const animalsStatus = useSelector((state) => state.animals.status);
  const allAnimals = animals ? Object.keys(animals) : [];
  const [myAnimals, setMyAnimals] = useState(allAnimals);
  const [magicWord, setMagicWord] = useState("Only my animals");

  const filterMyAnimals = () => {
    let filteredAnimals = [];
    if (magicWord === "Only my animals") {
      filteredAnimals = allAnimals.filter((key) => {
        return animals[key].animal_owner.userName === currentUser.userData.userName;
      });
      setMyAnimals(filteredAnimals);
      setMagicWord("All animals");
    } else {
      filteredAnimals = allAnimals;
      setMyAnimals(filteredAnimals);
      setMagicWord("Only my animals");
      return filteredAnimals;
    }
  }

  useEffect(() => {
    dispatch(fetchAnimal());
  }, [dispatch]);

  if (currentUser.status === "failed") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
          <p>Something is wrong ..</p>
        </div>
      </div>
    );
  }

  if (animalsStatus === "loading") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header title="Animals"/>
        <p className="flex items-center justify-center h-[100%]">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header title="Animals"/>
        <button type="button" onClick={filterMyAnimals}>{magicWord}</button>
        <ul>
        {myAnimals.map((key) => (
            <li key={key}>
              <img src={animals[key].data.animal_photo} alt="something" />
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
