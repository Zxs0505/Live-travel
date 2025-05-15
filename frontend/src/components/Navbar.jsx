import { Link } from 'react-router-dom';
import { logout } from '../api';

export default function Navbar({ user, setUser }) {
  const doLogout = async () => {
    await logout();
    setUser(null);
  };
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Hi, {user.username}</span>
          <button onClick={doLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
