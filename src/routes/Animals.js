import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAnimal } from '../redux/actions/animalActions';
import { useDispatch } from 'react-redux';

const Animals = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnimal());
  }, [dispatch]);

  return (
    <div>
      <br />
      <Link to='/new_animal'>Add Animal</Link>
    </div>
  )
}

export default Animals
