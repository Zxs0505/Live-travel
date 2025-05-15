import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchProfile } from './api';
import Navbar   from './components/Navbar';
import Home     from './components/Home';
import Register from './components/Register';
import Login    from './components/Login';
import Profile  from './components/Profile';

function Protected({ user, children }) {
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProfile();
        setUser(res.data.user);
      } catch {}
    })();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            <Protected user={user}>
              <Profile user={user} />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
