import avatar from '../assets/avatar.png';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
        <header className="relative p-4">
        <div className="container mx-auto py-1 flex justify-between items-center">
          <Link to='/'>
            <div className="logo">
              DIYHub
            </div>
          </Link>
          <div className="flex-grow mx-28 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 pl-10"
            />
            <SearchIcon className="h-5 w-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <nav className="hidden md:flex space-x-4 ml-auto">
            <a href="/" className="hover:text-gray-100">Home</a>
            <a href="/projects" className="hover:text-gray-100">Projects</a>
            <Link to="/community" className="hover:text-gray-100">Community</Link>
            <a href="/about" className="hover:text-gray-100">About</a>
            <a href="/login" className="hover:text-gray-100">Login</a>   {/* added will delete later */}
            <a href="/signup" className="hover:text-gray-100">Signup</a>   {/* added will delete later */}
          </nav> 

          <div className="hidden md:flex items-center px-5">
            <img
              src={avatar}
              alt="Profile"
              className="w-14 h-14 rounded-full ml-12 cursor-pointer hover:shadow-lg"
            />
          </div>

          <div className="md:hidden mx-6">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg className="h-9 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-2 px-4">
            <div className="nav-list">
              <a href="/" className="block py-2 px-4 font-bold hover:bg-gray-500">Home</a>
              <a href="/projects" className="block py-2 px-4 font-bold hover:bg-gray-500">Projects</a>
              <Link to="/community" className="hover:text-gray-100">Community</Link>

              <a href="/about" className="block py-2 px-4 font-bold hover:bg-gray-500">About</a>
              <a href="/login" className="block py-2 px-4 font-bold hover:bg-gray-500">Login</a>
              <a href="/signup" className="block py-2 px-4 font-bold hover:bg-gray-500">Signup</a>
              
            </div>
            <div className="sign-list flex justify-center mt-4">
              <img
                src={avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer hover:shadow-lg"
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
