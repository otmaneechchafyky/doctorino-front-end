import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAnimal } from '../redux/actions/animalActions';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';

const Animals = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnimal());
  }, [dispatch]);

  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <div className="bg-slate-900 flex flex-col w-[80%] text-teal-400 text-white">
        <Link to='/new_animal'>Add Animal</Link>
      </div>  
    </div>
  )
}

export default Animals
