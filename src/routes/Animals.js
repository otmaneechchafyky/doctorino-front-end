import React from 'react'
import { Link } from 'react-router-dom'

const Animals = () => {
  return (
    <div>
      Animals List
      <Link to='/new_animal'>Add Animal</Link>
    </div>
  )
}

export default Animals
