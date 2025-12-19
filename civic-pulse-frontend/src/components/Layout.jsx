import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Report Problem', href: '/report', icon: PlusCircleIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/dashboard" className="logo-link">
            <div className="logo-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="logo-text">CivicPulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', display: 'inline-block'}} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="user-menu nav-desktop">
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: 0}}>{user.name}</p>
                {isAdmin && (
                  <span className="badge badge-admin">Admin</span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{padding: '0.5rem'}}
            >
              <ArrowRightOnRectangleIcon style={{width: '1.5rem', height: '1.5rem'}} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <XMarkIcon style={{width: '1.5rem', height: '1.5rem'}} />
            ) : (
              <Bars3Icon style={{width: '1.5rem', height: '1.5rem'}} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon style={{width: '1.25rem', height: '1.25rem', marginRight: '0.75rem', display: 'inline-block'}} />
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="nav-link text-red-600"
              style={{width: '100%', textAlign: 'left'}}
            >
              <ArrowRightOnRectangleIcon style={{width: '1.25rem', height: '1.25rem', marginRight: '0.75rem', display: 'inline-block'}} />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          © 2024 CivicPulse. Making communities better, one report at a time.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

