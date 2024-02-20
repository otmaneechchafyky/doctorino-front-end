import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/actions/appointmentActions";
import { IoMdAdd } from "react-icons/io";
import { BsCalendar2Date } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { fetchVets } from "../redux/actions/vetActions";
import { fetchAnimal } from "../redux/actions/animalActions";
import { RxLapTimer } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointmentsData.appointmentsArray
  );
  const animalsList = useSelector((state) => state.animalsData.animalsArray);
  const vetsList = useSelector((state) => state.vetsData.vetsArray);

  useEffect(() => {
    dispatch(fetchVets());
    dispatch(fetchAnimal());
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
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
        <div className="scroll-container w-[90%] self-center p-6 overflow-y-scroll">    
          {appointments && appointments.length > 0 ? (
            <section className="">
              <div className="bg-slate-800">
                <div className="grid grid-cols-6">
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    Date
                  </p>
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    Time
                  </p>
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    For
                  </p>
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
                    With
                  </p>
                  <p className="p-4 text-left text-md font-medium text-slate-200 uppercase tracking-wider">
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
                        <Link className="grid grid-cols-6 text-sm hover:bg-slate-600">
                          <div className="p-4 text-slate-200 flex gap-3 items-center">
                            <BsCalendar2Date />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="p-4 text-slate-200 flex gap-3 items-center">
                            <IoMdTime />
                            <span>{appointment.time.slice(12, 16)}</span>
                          </div>
                          <div className="p-4 text-slate-200 flex gap-2 items-center">
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
                          <div className="p-4 text-slate-200 flex gap-2 items-center">
                            <FaLocationDot />
                            {appointment.location}
                          </div>
                        </Link>
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
    </div>
  );
};

export default Appointments;
