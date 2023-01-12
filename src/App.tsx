import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Phonebook from './views/Phonebook/Phonebook';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing, selectToken } from './redux/auth/authSelectors';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { refreshUser } from './redux/auth/authOperations';
import { CircularProgress, Typography } from '@mui/material';
import { selectIsLoading } from './redux/phonebook/phonebookSelectors';

function App() {
  const dispatch = useTypedDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  if (!isLoggedIn && token !== null) {
    dispatch(refreshUser());
  }
  return (
    <div className="container">
      {isRefreshing ? (
        <Typography variant="button" sx={{ color: '#1976DB' }}>
          Завантажуємо дані користувача
        </Typography>
      ) : (
        <Routes>
          <Route path="" element={<SharedLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="registration"
              element={
                <ProtectedRoute>
                  <Registration />
                </ProtectedRoute>
              }
            />
            <Route
              path="phonebook"
              element={
                <PrivateRoute>
                  <Phonebook />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      )}

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
