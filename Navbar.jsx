import { Code, Cpu, FileType, Headphones, House, Moon, ScanLine, Settings2Icon, Sun } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          <House />
          <span>Home</span>
        </Link>
        <Link to="/scanner" className={isActive('/scanner') ? 'active' : ''}>
          <ScanLine />
          <span>Scanner</span>
        </Link>
        <Link to="/spatial-audio" className={isActive('/spatial-audio') ? 'active' : ''}>
          <Headphones />
          <span>Audio</span>
        </Link>
        <Link to="/memory-game" className={isActive('/memory-game') ? 'active' : ''}>
          <Cpu />
          <span>Game</span>
        </Link>
        <Link to="/text-to-speech" className={isActive('/text-to-speech') ? 'active' : ''}>
          <FileType />
          <span>TTS</span>
        </Link>
        <Link to="/math-solver" className={isActive('/math-solver') ? 'active' : ''}>
          <Code />
          <span>Math</span>
        </Link>
      </div>

      <div className="nav-actions">
        {currentUser ? (
          <>
            <span className="user-email">
              {currentUser.email ? `Welcome, ${currentUser.email}` : 'Welcome'}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
        
        <div 
          className="dark-mode-toggle" 
          onClick={() => toggleDarkMode(prev => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </div>
        
        <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
          <Settings2Icon />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}