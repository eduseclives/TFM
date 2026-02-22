import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Dashboard/Overview';
import Inventory from './components/Dashboard/Inventory';
import Orders from './components/Dashboard/Orders';
import Users from './components/Dashboard/Users';
import { authUtils } from './utils/auth';

import { useState, useEffect } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(authUtils.isAuthenticated());

  useEffect(() => {
    // Session expiration monitor and state synchronization
    const checkSession = () => {
      const authenticated = authUtils.isAuthenticated();
      if (isAuth !== authenticated) {
        setIsAuth(authenticated);
      }

      const token = authUtils.getToken();
      if (token && authUtils.isTokenExpired(token)) {
        console.warn('Session expired by monitor');
        authUtils.clearSession();
        setIsAuth(false);
        window.location.href = '/';
      }
    };

    const interval = setInterval(checkSession, 5000); // Check every 5 seconds

    // Also listen for storage changes (for logout in other tabs)
    const handleStorageChange = () => setIsAuth(authUtils.isAuthenticated());
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuth ? <Login /> : <Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<Overview />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
