import { Route, Routes } from 'react-router-dom';
import Phonebook from './components/Phonebook/Phonebook';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute/ProtectedRoute';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
