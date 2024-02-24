import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom";
import { fetchVet } from "../redux/actions/vetActions";
import Navbar from "./Navbar";
import Header from "./Header";
import { fetchSpecializations } from "../redux/actions/specializationActions";
import { MdArrowForwardIos } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";

const VetDetails = () => {
  // Fetch clicked animal's id
  const { id } = useParams();
  const vetId = parseInt(id);

  const dispatch = useDispatch();

  const vetDetails = useSelector((state) => state.vetsData.vetDetails);
  const specializationsList = useSelector(
    (state) => state.specializationsData.specializationArray
  );

  useEffect(() => {
    dispatch(fetchVet(vetId));
    dispatch(fetchSpecializations());
  }, [dispatch, vetId]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-slate-900">
      <Navbar />
      <div className="bg-slate-900 flex flex-col gap-4 lg:gap-0 w-5/5 lg:w-4/5 text-white pb-4 lg:pb-0">
        <Header title="Vet details" />
        {vetDetails && (
          <div className="w-[90%] lg:w-[80%] flex flex-col-reverse lg:flex-row self-center justify-center gap-4 lg:gap-8 rounded-lg bg-slate-800 pb-4 lg:pb-0 lg:py-4 shadow-lg">
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-[48%] px-4">
              <h1 className="flex items-end gap-2">
                <p className="text-4xl font-bold">{vetDetails.name}</p>
                {specializationsList &&
                  specializationsList.map((element) => {
                    if (element.id === vetDetails.specialization_id) {
                      return (
                        <p key={element.id} className="flex gap-1 text-teal-400">
                          (<span>{element.name}</span>)
                        </p>
                      );
                    } else return null
                  })}
              </h1>
              <p className="text-lg text-slate-200">{vetDetails.bio}</p>
              <div className="flex justify-between items-center p-4 border border-2 border-slate-400 bg-slate-600 rounded-xl">
                <BiTime className="text-4xl text-white" />
                <p className="text-3xl text-teal-400 font-bold">
                  {vetDetails.available_from.slice(11, 16)}
                </p>
                <MdArrowForwardIos className="text-2xl text-white font-bold" />
                <p className="text-3xl text-teal-400 font-bold">
                  {vetDetails.available_to.slice(11, 16)}
                </p>
              </div>
              <p className="flex items-end gap-2 text-2xl group-hover:text-teal-300">
                <IoIosPricetag  className="text-3xl"/>
                <span className="flex gap-1 text-teal-400 font-bold text-3xl">
                  {vetDetails.fees}
                  <span>DH</span>
                </span>
                <span className="text-slate-400 text-lg">Per visit</span>
              </p>
              <Link to="/new_appointment_vet" className="text-center bg-sky-600 py-4 text-lg mt-8 rounded-lg hover:bg-sky-700 duration-300">Take an appointment</Link>
            </div>
            <img
              src={vetDetails.vet_photo}
              alt={vetDetails.name}
              className="w-full lg:w-[48%] mr-4 rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VetDetails;
