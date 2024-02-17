import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { fetchVets } from "../redux/actions/vetActions";
import { fetchSpecializations } from "../redux/actions/specializationActions";
import { useDispatch, useSelector } from "react-redux";
import { IoIosPricetag } from "react-icons/io";

const Vets = () => {
  const dispatch = useDispatch();
  const vetsList = useSelector((state) => state.vetsData.vetsArray);
  const specializationsList = useSelector(
    (state) => state.specializationsData.specializationArray
  );

  useEffect(() => {
    dispatch(fetchVets());
    console.log(vetsList)
    // dispatch(fetchVet(3));
    dispatch(fetchSpecializations());
  }, [dispatch]);
  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-white">
        <Header title="Vets" />
        <ul className="py-6 grid place-items-center grid-cols-4 gap-y-8 overflow-y-scroll">
          {vetsList &&
            vetsList.map((vet) => (
              <li key={vet.id} className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-800 hover:bg-slate-600 duration-300 hover:scale-105">
                <img src={vet.vet_photo} alt={vet.name} className="w-48 rounded-[100%] border border-8 border-slate-700 group-hover:border-slate-500"/>
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold">{vet.name}</h1>
                  {specializationsList &&
                    specializationsList.map((specialization) => {
                      if (vet.specialization_id === specialization.id){
                        return <p key={specialization.id} className="tracking-wider text-slate-300 group-hover:text-slate-200">{specialization.name}</p>
                      }
                    })}
                </div>
                <p className="flex items-center gap-2 text-teal-400 group-hover:text-teal-300"><IoIosPricetag /> <span className="flex gap-1">{vet.fees}<span>DH</span></span> <span className="text-white text-sm">Per visit</span></p>
                <Link to="/vet_details" className="cursor-pointer p-2 w-full bg-sky-700 group-hover:bg-sky-600 text-center rounded text-lg tracking-wide">vet's details</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Vets;
