import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import Animals from "./routes/Animals";
import Vets from "./routes/Vets";
import Appointments from "./routes/Appointments";
import NewAnimal from "./components/forms/NewAnimal";
import VetDetails from "./components/VetDetails";
import NewAppointment from "./components/forms/NewAppointment";
import EditAnimal from "./components/forms/editAnimal";
import Animal from "./routes/Animal";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home/animals" element={<Animals />} />
        <Route path="/home/animal/:id" element={<Animal />} />
        <Route path="/home/edit_animal/:id" element={<EditAnimal />} />
        <Route path="/home/vets" element={<Vets />} />
        <Route path="/home/appointments" element={<Appointments />} />
        <Route path="/new_animal" element={<NewAnimal />} />
        <Route path="/home/vets/:id" element={<VetDetails />} />
        <Route path="/new_appointment" element={<NewAppointment />} />
      </Routes>
    </div>
  );
}

export default App;
