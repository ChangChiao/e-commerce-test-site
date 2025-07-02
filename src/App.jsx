import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Users from './pages/Users';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/welcome" replace />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
