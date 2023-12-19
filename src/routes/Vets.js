import React from 'react'
import { Link } from 'react-router-dom'

const Vets = () => {
  return (
    <div>
      Vets List
      <Link to='/new_vet'>Add Vet</Link>
    </div>
  )
}

export default Vets
