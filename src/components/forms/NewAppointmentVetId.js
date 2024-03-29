import React, { useEffect, useState } from "react";
import { CreateAppointment } from "../../redux/actions/appointmentActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import Header from "../Header";
import { fetchVets } from "../../redux/actions/vetActions";
import { fetchAnimal } from "../../redux/actions/animalActions";

const NewAppointmentVetId = () => {
  const dispatch = useDispatch();
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const vetId = useSelector((state) => state.vetsData.vetDetails.id);

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    location: "",
    duration: "",
    animal_id: "",
    vet_id: vetId,
  });

  useEffect(() => {
    dispatch(fetchVets());
    dispatch(fetchAnimal());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateAppointment(appointmentData, vetId))
      .then(() => {
        toast.success("Appointment created with success", {
          position: toast.POSITION.TOP_CENTER,
        });
        setAppointmentData({
          date: "",
          time: "",
          location: "",
          duration: 10,
          animal_id: 1,
          vet_id: vetId,
        });
      })
      .catch(() => {
        toast.error("Could not create appointment", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-slate-950">
      <Navbar />
      <div className="bg-slate-950 flex flex-col gap-2 w-5/5 lg:w-4/5 text-white">
        <Header title="New appointment" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mx-auto py-16 lg:py-0 w-[80%] lg:w-[50%]"
        >
          <input
            type="date"
            name="date"
            value={appointmentData.date}
            onChange={handleChange}
            required
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />
          <input
            type="time"
            name="time"
            value={appointmentData.time}
            onChange={handleChange}
            required
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          <input
            type="text"
            name="location"
            value={appointmentData.location}
            onChange={handleChange}
            required
            placeholder="Location"
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          <input
            type="number"
            name="duration"
            value={appointmentData.duration}
            onChange={handleChange}
            required
            placeholder="Duration"
            className="p-2 text-slate-800 placeholder:text-slate-400 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
          />

          {animalsList ? (
            <select
              name="animal_id"
              value={appointmentData.animal_id}
              onChange={handleChange}
              required
              className="p-2 text-slate-800 border-b border-teal-400 outline-none focus:border-teal-600 rounded"
            >
              <option value="" disabled>
                For which animal
              </option>
              {animalsList.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading animals...</p>
          )}

          <button
            type="submit"
            className="bg-green-500 p-2 rounded hover:bg-green-600 w-[40%]"
          >
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewAppointmentVetId;
