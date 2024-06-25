import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import HeaderLogo from '../assets/header-logo.svg';
import ProfileIcon from '../assets/profile-icon.svg'; 
import PlusIcon from '../assets/plus-icon.svg'; 
import ProjectForm from '../pages/ProjectForm';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <header className="relative p-4">
        <div className="container mx-auto max-w-screen-lg py-1 flex justify-between items-center">
          <Link to='/'>
            <img src={HeaderLogo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="flex-grow mx-20 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-xl border border-gray-700 focus:outline-none focus:ring focus:border-blue-300 pl-10"
            />
            <SearchIcon className="h-4 w-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <nav className="hidden md:flex space-x-4 ml-auto">
            <a href="/" className="hover:text-gray-100">Home</a>
            <a href="/projects" className="hover:text-gray-100">Projects</a>
            <Link to="/community" className="hover:text-gray-100">Community</Link>
            <a href="/about" className="hover:text-gray-100">About</a>
            <a href="/login" className="hover:text-gray-100">Login</a>   {/* added will delete later */}
            <a href="/signup" className="hover:text-gray-100">Signup</a>   {/* added will delete later */}
          </nav> 

          <div className="hidden md:flex items-center space-x-4 px-4  text-gray-700">
            <button onClick={toggleModal} className="flex items-center space-x-1 bg-white border border-gray-700 focus:outline-none px-2 py-1 rounded-xl">
              <img src={PlusIcon} alt="Create" className="w-4 h-4"/>
              <span className="ml-6 pr-4">Create</span> 
            </button>

            <Link to="/profile">
              <img src={ProfileIcon} alt="Profile" className="w-8 h-8 cursor-pointer hover:shadow-lg" />
            </Link>
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
              <Link to="/profile">
                <img src={ProfileIcon} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer hover:shadow-lg" />
              </Link>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={toggleModal}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-6xl h-3/4 overflow-auto">
              <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                &times;
              </button>
              <ProjectForm />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
