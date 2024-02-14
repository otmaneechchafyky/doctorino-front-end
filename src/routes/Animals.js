import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAnimal, deleteAnimal } from "../redux/actions/animalActions";
import { fetchGenre } from "../redux/actions/genreActions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { IoMdAdd } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Animals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.userData);
  const statusAnimal = useSelector((state) => state.animalsData.status);
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const genresList = useSelector((state) => state.genresData.genresArray);
  const statusGenre = useSelector((state) => state.genresData.status);

  const [filteredAnimalsList, setFilteredAnimalsList] = useState(animalsList);
  const [filterTitle, setFilterTitle] = useState("Only your animals");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchAnimal());
    dispatch(fetchGenre());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAnimalsList(animalsList);
  }, [animalsList]);

  const filterMyAnimals = () => {
    if (filterTitle === "Only your animals") {
      setFilterTitle("All animals");
      setFilteredAnimalsList((prevList) => {
        const filteredList = prevList.filter(
          (animal) => animal.owner_id === currentUser?.id
        );
        return filteredList;
      });
    } else {
      setFilterTitle("Only your animals");
      setFilteredAnimalsList(animalsList);
    }
  };

  const searchAnimal = () => {
    const searchedAnimals = animalsList.filter(
      (animal) =>
        animal.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        animal.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredAnimalsList(searchedAnimals);
  };

  const handleDelete = (id) => {
    dispatch(deleteAnimal(id))
      .then(() => {
        dispatch(fetchAnimal());
        toast.success("Animal deleted successfylly", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/home/animals");
        }, 2000);
      })
      .catch(() => {
        toast.success("Could not delete", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  if (statusAnimal === "loading" || statusGenre === "loading") {
    return (
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
          <Header />
          <p className="w-full flex items-center justify-center text-2xl text-ceter">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (statusAnimal === "failed" || statusGenre === "failed") {
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
        <Header title="Animals" />
        <div className="w-[80%] flex self-center justify-between">
          <div className="flex w-[42%] gap-2">
            <Link
              to="/new_animal"
              className="w-[45%] group flex items-center justify-center gap-2 p-4 bg-green-500 rounded hover:bg-green-600"
            >
              <IoMdAdd className="w-7 h-7" />
              <span>Add Animal</span>
            </Link>
            <button
              type="button"
              className="w-[55%] group flex items-center justify-center gap-2 p-4 bg-sky-500 rounded hover:bg-sky-600"
              onClick={filterMyAnimals}
            >
              <IoFilterSharp className="w-7 h-7" />
              <span>{filterTitle}</span>
            </button>
          </div>
          <div className="border rounded overflow-hidden flex w-[57%]">
            <input
              type="text"
              className="px-4 py-2 w-[87%] text-slate-900 outline-0"
              placeholder="Search by name..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="flex items-center justify-center px-4 border-l w-[13%] hover:bg-slate-800"
              onClick={searchAnimal}
            >
              <CiSearch className="w-7 h-7" />
            </button>
          </div>
        </div>
        {filteredAnimalsList && filteredAnimalsList.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 overflow-auto">
            {filteredAnimalsList.map((animal) => (
              <li key={animal.id} className="rounded-xl flex flex-col">
                <Link
                  to={`/home/animal/${animal.id}`}
                  className="cursor-pointer"
                >
                  <img
                    src={animal.animal_photo}
                    alt="Animal"
                    className="w-full rounded-xl rounded-b-none"
                  />
                  <div className="flex items-center rounded-xl rounded-b-none rounded-t-none bg-slate-800 mb-2">
                    <p className="w-[50%] p-4 text-left text-lg">
                      {animal.name.length < 9
                        ? animal.name
                        : `${animal.name.slice(0, 9)}..`}
                    </p>
                    <hr className=" w-[2px] h-8 bg-white rounded-xl" />
                    {genresList &&
                      genresList.map((element) => {
                        if (element.id === animal.genre_id) {
                          return (
                            <p
                              key={element.id}
                              className="w-[50%] text-teal-300 p-4 text-right text-lg"
                            >
                              {element.name.length < 9
                                ? element.name
                                : `${element.name.slice(0, 9)}..`}
                            </p>
                          );
                        }
                        return null;
                      })}
                  </div>
                </Link>
                <button
                  type="button"
                  className="flex items-center justify-around gap-2 py-4 px-20 bg-red-600 text-lg rounded-lg hover:bg-red-700 duration-150"
                  onClick={() => handleDelete(animal.id)}
                >
                  <MdDelete className="text-xl" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-center mt-4">
            {filterTitle === "Only your animals"
              ? "There are no animals yet."
              : "You have no animals yet."}
          </p>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Animals;
