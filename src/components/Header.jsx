import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">My Portfolio</Link>
        
        <nav className="flex gap-6 items-center">
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          
          {user ? (
            <>
              <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Admin Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;