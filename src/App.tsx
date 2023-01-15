import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { refreshUser } from './redux/auth/authOperations';
import { selectIsLoggedIn, selectToken } from './redux/auth/authSelectors';
import { fetchContacts } from './redux/phonebook/phonebookOperations';
import { selectIsLoading } from './redux/phonebook/phonebookSelectors';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound';
import Phonebook from './views/Phonebook/Phonebook';
import Profile from './views/Profile/Profile';
import Registration from './views/Registration/Registration';

function App() {
  const dispatch = useTypedDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  useEffect(() => {
    if (!isLoggedIn && token) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn, token]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="container">
      <Routes>
        <Route path="" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <ProtectedRoute defaultRoute="/phonebook">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="registration"
            element={
              <ProtectedRoute defaultRoute="/phonebook">
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path="phonebook"
            element={
              <PrivateRoute defaultRoute="/">
                <Phonebook />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute defaultRoute="/">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && (
        <div
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress size={200} />
        </div>
      )}
    </div>
  );
}

export default App;
