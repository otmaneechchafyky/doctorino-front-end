import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"

const Appointments = () => {
  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Link to='/new_appointment'>Add appointment</Link>
      </div>
      
    </div>
  )
}

export default Appointments
