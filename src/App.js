import { Routes, Route } from 'react-router-dom';
import SignUpForm from './components/forms/SignUpForm'
import LoginForm from './components/forms/LoginForm';
// import Home from './routes/Home'
import Animals from './routes/Animals'
import Vets from './routes/Vets'
import Appointments from './routes/Appointments'
import NewAnimal from './components/forms/NewAnimal'
import NewVet from './components/forms/NewVet'
import NewAppointment from './components/forms/NewAppointment'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/home/animals' element={<Animals />} />
        <Route path='/home/vets' element={<Vets />} />
        <Route path='/home/appointments' element={<Appointments />} />
        <Route path='/new_animal' element={<NewAnimal />} />
        <Route path='/new_vet' element={<NewVet />} />
        <Route path='/new_appointment' element={<NewAppointment />} />
      </Routes>
    </div>
  );
}

export default App;
