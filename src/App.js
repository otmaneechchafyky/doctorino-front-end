import { Routes, Route } from 'react-router-dom';
import SignUpForm from './components/forms/SignUpForm'
import LoginForm from './components/forms/LoginForm';
import Home from './routes/Home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
