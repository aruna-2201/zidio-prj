import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Menu, X, User, LogOut, Bell, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define navigation links based on role
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Home', path: '/' },
      { name: 'Jobs', path: '/jobs' },
    ];

    if (!isAuthenticated) {
      return commonLinks;
    }

    switch (user?.role) {
      case 'student':
        return [
          ...commonLinks,
          { name: 'My Applications', path: '/student/applications' },
          { name: 'My Profile', path: '/student/profile' },
        ];
      case 'recruiter':
        return [
          ...commonLinks,
          { name: 'Post Job', path: '/recruiter/post-job' },
          { name: 'Manage Jobs', path: '/recruiter/jobs' },
        ];
      case 'admin':
        return [
          ...commonLinks,
          { name: 'Dashboard', path: '/admin' },
          { name: 'Users', path: '/admin/users' },
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!isAuthenticated || !user?.role) return '/';
    return `/${user.role}`;
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        isScrolled
          ? 'bg-white shadow-md'
          : location.pathname === '/' 
            ? 'bg-transparent'
            : 'bg-white'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase 
              className={`h-8 w-8 ${
                isScrolled || location.pathname !== '/'
                  ? 'text-blue-600' 
                  : 'text-white'
              }`} 
            />
            <span 
              className={`text-xl font-bold ${
                isScrolled || location.pathname !== '/'
                  ? 'text-gray-900' 
                  : 'text-white'
              }`}
            >
              CareerConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isScrolled || location.pathname !== '/'
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                } ${location.pathname === link.path ? 'font-semibold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                      alt={user?.name}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <div 
                    className={`${
                      isScrolled || location.pathname !== '/'
                        ? 'text-gray-700' 
                        : 'text-white'
                    }`}
                  >
                    <span className="text-sm font-medium block leading-tight">
                      {user?.name}
                    </span>
                    <span className="text-xs block capitalize">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 ${
                      isScrolled || location.pathname !== '/'
                        ? 'text-gray-500' 
                        : 'text-blue-100'
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to={`${getDashboardLink()}/profile`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to={`${getDashboardLink()}/notifications`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    color={isScrolled || location.pathname !== '/' ? 'outline-primary' : 'outline-white'}
                    size="sm"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    color={isScrolled || location.pathname !== '/' ? 'primary' : 'white'}
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${
                isScrolled || location.pathname !== '/'
                  ? 'text-gray-900' 
                  : 'text-white'
              }`} />
            ) : (
              <Menu className={`h-6 w-6 ${
                isScrolled || location.pathname !== '/'
                  ? 'text-gray-900' 
                  : 'text-white'
              }`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <nav className="container mx-auto px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center mb-4">
                      <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                        alt={user?.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login">
                      <Button color="outline-primary" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button color="primary" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;