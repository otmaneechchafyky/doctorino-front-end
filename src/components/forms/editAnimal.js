import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { editAnimal } from "../../redux/actions/animalActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAnimal = () => {
  const dispatch = useDispatch();

  // Filter the selected animal
  const { id } = useParams();
  const animalId = parseInt(id);
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const animalDetails = animalsList
    ? animalsList.filter((animal) => animal.id === animalId)
    : [];

  // Set the form to the current data
  const genres = useSelector((state) => state.genresData.genresArray);
  const statusGenre = useSelector((state) => state.genresData.status);
  const [animalData, setAnimalData] = useState(animalDetails[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAnimal(animalData))
      .then(() => {
        toast.success("Animal Updated successfylly", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() => {
        toast.error("Could not Edit animal", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  if (statusGenre === "loading") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-5/5 lg:w-4/5 text-teal-400 text-white">
          <Header title="Edit animal" />
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
          <Header title="Edit animal" />
          <p>Something went wrong..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col gap-4 w-5/5 lg:w-4/5 text-teal-400 text-white">
        <Header title="Edit animal" />
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
            Update Animal
          </button>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default EditAnimal;
