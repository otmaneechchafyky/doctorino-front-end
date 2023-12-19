import React from 'react'
import { Link } from 'react-router-dom'

const Appointments = () => {
  return (
    <div>
      Appointments List
      <Link to='/new_appointment'>Add Appointment</Link>
    </div>
  )
}

export default Appointments
