import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAnimal } from "../redux/actions/animalActions";
import { fetchGenre } from "../redux/actions/genreActions";
import { deleteAnimal } from "../redux/actions/animalActions";
import { IoPawOutline } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { BiRun } from "react-icons/bi";
import { GiWeight } from "react-icons/gi";
import { IoMdCalendar } from "react-icons/io";
import { IoMdRefreshCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Animal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch clicked animal's id
  const { id } = useParams();
  const animalId = parseInt(id);

  // Filter the selected animal
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const animalDetails = animalsList
    ? animalsList.filter((animal) => animal.id === animalId)
    : [];

  // Filter the selected animal
  const genresList = useSelector((state) => state.genresData.genresArray);
  const animalGenre =
    genresList && animalDetails.length > 0
      ? genresList.filter((genre) => genre.id === animalDetails[0].genre_id)
      : [];

  useEffect(() => {
    if (!animalsList) {
      dispatch(fetchAnimal());
    }
  }, [dispatch, animalsList]);

  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteAnimal(animalId))
      .then(() => {
        toast.success("Animal deleted successfylly", {
          position: toast.POSITION.TOP_LEFT,
        });
        setTimeout(() => {
          navigate("/home/animals");
        }, 1000);
      })
      .catch(() => {
        toast.success("Could not delete", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col gap-2 w-[80%] text-teal-400 text-white">
        <Header title="Animal details" />
        <div className="w-[80%] flex self-center justify-between justify-center rounded-lg bg-slate-800 py-4 px-3">
          {animalDetails.length > 0 && (
            <div className="flex justify-center w-full gap-8">
              <img
                src={animalDetails[0].animal_photo}
                alt={animalDetails[0].name}
                className="w-[25rem] h-[25rem] rounded-xl"
              />
              <div className="grid gap-4 px-2">
                <p className="text-center text-4xl font-bold font-sans tracking-wider">
                  {animalDetails[0].name}
                </p>
                <div className="grid grid-cols-2 gap-16">
                  {animalGenre.length > 0 && (
                    <p className="grid gap-1">
                      <span className="text-teal-300 text-lg flex gap-2 items-center">
                        <IoPawOutline className="w-7 h-7" /> Genre
                      </span>
                      <span>{animalGenre[0].name}</span>
                    </p>
                  )}
                  <p className="grid gap-1">
                    <span className="text-teal-300 text-lg flex gap-2 items-center">
                      <FaBirthdayCake className="w-7 h-7" /> Date of birth
                    </span>
                    <span>{animalDetails[0].date_of_birth}</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <p className="grid gap-1">
                    <span className="text-teal-300 text-lg flex gap-2 items-center">
                      <BiRun className="w-7 h-7" />
                      Escape attempts
                    </span>
                    <span>{animalDetails[0].escape_attempts}</span>
                  </p>
                  <p className="grid gap-1">
                    <span className="text-teal-300 text-lg flex gap-2 items-center">
                      <GiWeight className="w-7 h-7" />
                      Weight
                    </span>
                    <span>{animalDetails[0].weight} Kg</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <p className="grid gap-1">
                    <span className="text-teal-300 text-lg flex gap-2 items-center">
                      <IoMdCalendar className="w-7 h-7" />
                      Join date
                    </span>
                    <span>{animalDetails[0].created_at.slice(0, 10)}</span>
                  </p>
                  <p className="grid gap-1">
                    <span className="text-teal-300 text-lg flex gap-2 items-center">
                      <IoMdRefreshCircle className="w-7 h-7" />
                      Latest update
                    </span>
                    <span>{animalDetails[0].updated_at.slice(0, 10)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-auto w-[60%] flex items-center justify-between px-32 mt-2">
          <button
            type="button"
            className="flex items-center justify-around gap-2 py-4 px-16 bg-red-600 text-lg rounded-lg hover:bg-red-700 hover:scale-95 duration-150"
            onClick={handleDelete}
          >
            <MdDelete className="text-xl" />
            Delete
          </button>
          <Link
            to={`/home/edit_animal/${animalId}`}
            type="button"
            className="flex items-center justify-around gap-2 py-4 px-16 bg-sky-700 text-lg rounded-lg hover:bg-sky-800 hover:scale-95 duration-150"
          >
            <MdEdit className="text-xl" />
            Edit
          </Link>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Animal;
