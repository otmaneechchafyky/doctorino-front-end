import { logoutUser } from '../redux/actions/logoutAction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/actions/currentUserAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.userData);
  const status = useSelector((state) => state.currentUser.status);
  const error = useSelector((state) => state.currentUser.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('You Logged out successfully.', {
      position: toast.POSITION.TOP_LEFT,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      <ul>
        <Link to='animals'>Animals</Link>
        <Link to='vets'>Vets</Link>
        <Link to='appointments'>Appointments</Link>
      </ul>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <br />
      <div>
      {currentUser && (
        <div>
          <p>User Name: {currentUser.userName}</p>
          <p>Email: {currentUser.email}</p>
          <p>Created Date: {currentUser.created_date}</p>
        </div>
      )}
    </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
