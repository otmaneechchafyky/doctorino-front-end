import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment, fetchAppointments } from "../redux/actions/appointmentActions";
import { IoMdAdd } from "react-icons/io";
import { BsCalendar2Date } from "react-icons/bs";
import { fetchVets } from "../redux/actions/vetActions";
import { fetchAnimal } from "../redux/actions/animalActions";
import { RxLapTimer } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointmentsData.appointmentsArray
  );
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const vetsList = useSelector((state) => state.vetsData.vetsArray);

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id))
      .then(() => {
        dispatch(fetchAppointments());
        toast.success("Appointment deleted successfylly", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {
        toast.success("Could not delete", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    dispatch(fetchVets());
    dispatch(fetchAnimal());
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-full lg:w-4/5 text-teal-400 text-white h-screen">
        <Header title="Appointments" />
        <div className="p-4 flex justify-end">
            <Link
              to="/new_appointment"
              className="group flex items-center justify-center gap-1 py-2 px-2 bg-green-500 rounded hover:bg-green-600"
            >
              <IoMdAdd className="w-6 h-6" />
              <span>Get appointment</span>
            </Link>
          </div>
        <div className="scroll-container w-full lg:w-[90%] self-center p-1 lg:p-6 overflow-y-scroll px-2 lg:px-0">    
          {appointments && appointments.length > 0 ? (
            <section>
              <div className="bg-slate-800">
                <div className="grid grid-cols-3 lg:grid-cols-5">
                  <p className="p-4 text-left text-sm lg:text-md font-medium text-slate-200 uppercase tracking-wider">
                    Date
                  </p>
                  <p className="hidden lg:grid p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="p-4 text-left text-sm lg:text-md font-medium text-slate-200 uppercase tracking-wider">
                    For
                  </p>
                  <p className="p-4 text-left text-sm lg:text-md font-medium text-slate-200 uppercase tracking-wider">
                    With
                  </p>
                  <p className="hidden lg:grid p-4 text-left text-sm lg:text-md font-medium text-slate-200 uppercase tracking-wider">
                    Location
                  </p>
                </div>
              </div>
              <div className="bg-slate-700 divide-y divide-slate-600">
                {appointments &&
                  appointments.map((appointment) => {
                    const animal =
                      animalsList &&
                      animalsList.find(
                        (animal) => animal.id === appointment.animal_id
                      );
                    const vet =
                      vetsList &&
                      vetsList.find((vet) => vet.id === appointment.vet_id);

                    return (
                      <div
                        key={appointment.id}
                      >
                        <div className="grid grid-cols-3 lg:grid-cols-5 text-sm hover:bg-slate-600">
                          <div className="p-2 lg:p-4 text-slate-200 flex gap-2 lg:gap-3 items-center">
                            <BsCalendar2Date className="hidden lg:flex"/>
                            <span>{appointment.date}</span>
                            <span className="text-teal-400">{appointment.time.slice(12, 16)}</span>
                          </div>
                          <div className="hidden lg:flex p-4 text-slate-200 gap-2 items-center">
                            <RxLapTimer />
                            <div className="flex gap-1">
                              {parseInt(appointment.duration)} <span>min</span>
                            </div>
                          </div>
                          <div className="p-4 text-slate-200">
                            {animal && (
                              <div className="flex gap-2 items-center">
                                <img
                                  src={animal.animal_photo}
                                  alt={animal.name}
                                  className="w-8 h-8 rounded-full border border-2"
                                />
                                {animal.name}
                              </div>
                            )}
                          </div>
                          <div className="p-4 text-slate-200 flex gap-3 items-center">
                            {vet && (
                              <div className="flex gap-2 items-center">
                                <img
                                  src={vet.vet_photo}
                                  alt={vet.name}
                                  className="w-8 h-8 rounded-full border border-2"
                                />
                                <span className="text-sm">{vet.name}</span>
                              </div>
                            )}
                          </div>
                          <div className="hidden p-4 text-slate-200 lg:flex justify-between items-center">
                            <div className="flex items-center gap-2">
                            <FaLocationDot />
                            {appointment.location}
                            </div>
                            <MdDelete onClick={() => handleDelete(appointment.id)} className="text-red-400 w-6 h-6 cursor-pointer hover:text-red-500 hover:scale-110 duration-300"/>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          ) : (
            <p>No appointments available.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Appointments;
