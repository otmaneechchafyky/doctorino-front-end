import React, { useEffect, useState } from "react";
import { fetchUser } from "../../redux/actions/currentUserAction";
import { addAnimal } from "../../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

const NewAnimal = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genresData.genresArray);
  const statusGenre = useSelector((state) => state.genresData.status);
  const currentUser = useSelector((state) => state.currentUser.userData);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [animalData, setAnimalData] = useState({
    name: "",
    animal_photo: "",
    date_of_birth: "",
    weight: "",
    escape_attempts: "",
    genre_id: "",
    owner_id: currentUser?.id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnimal(animalData));
    setAnimalData({
      name: "",
      animal_photo: "",
      date_of_birth: "",
      weight: "",
      escape_attempts: "",
      genre_id: "",
      owner_id: "",
    });
  };

  if (statusGenre === "loading") {
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

  if (statusGenre === "failed") {
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
      <div className="bg-slate-900 flex flex-col gap-4 w-[80%] text-teal-400 text-white">
        <Header title="New Animal" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mx-auto w-[50%]"
        >
          <input
            type="text"
            id="name"
            name="name"
            value={animalData.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          <input
            type="text"
            id="animal_photo"
            name="animal_photo"
            value={animalData.animal_photo}
            onChange={handleChange}
            required
            placeholder="Animal Photo URL"
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={animalData.date_of_birth}
            onChange={handleChange}
            required
            placeholder="Date of Birth"
            className="p-2 text-slate-800 placeholder:text-slate-400 text-slate-500 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          <select
            id="genre_id"
            name="genre_id"
            value={animalData.genre_id}
            onChange={handleChange}
            required
            className="p-2 text-slate-800 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          >
            <option value="" disabled>
              Select Animal Genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              id="weight"
              name="weight"
              value={animalData.weight}
              onChange={handleChange}
              required
              min="0"
              placeholder="Weight (kg)"
              className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
            />

            <input
              type="number"
              id="escape_attempts"
              name="escape_attempts"
              value={animalData.escape_attempts}
              onChange={handleChange}
              required
              min="0"
              placeholder="Escape Attempts"
              className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 p-2 rounded hover:bg-green-600 w-[40%]"
          >
            Add Animal
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAnimal;
