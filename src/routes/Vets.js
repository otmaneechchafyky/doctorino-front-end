import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Header from "../components/Header"

const Vets = () => {
  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Header />
        <Link to='/new_vet'>Add Vet</Link>
      </div>  
    </div>
  )
}

export default Vets
