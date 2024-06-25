import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import NavbarLogo from '../assets/navbar-logo.svg';
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
      <header className="relative">
        <div className="container mx-auto max-w-screen-lg px-4 py-1 flex justify-between items-center">
          <Link to='/'>
            <img src={NavbarLogo} alt="Logo" className="w-24 h-24" />
          </Link>
          <div className="flex-grow mx-12 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-2 bg-white rounded-xl border border-gray-700 focus:outline-none focus:ring focus:border-blue-300 pl-10"
            />
            <SearchIcon className="h-4 w-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <nav className="hidden md:flex space-x-6 mr-8">
            <a href="/" className="hover:text-gray-700">Home</a>
            <a href="/projects" className="hover:text-gray-700">Projects</a>
            <a href="/about" className="hover:text-gray-700">About</a>
            <a href="/community" className="hover:text-gray-700">Community</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4 px-4 text-gray-700">
            <button className="relative flex items-center bg-white border border-gray-700 focus:outline-none px-4 py-2 rounded-xl">
              <img src={PlusIcon} alt="Create" className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"/>
              <span className="ml-6">Create</span> 
            </button>

            <Link to="/profile">
              <img src={ProfileIcon} alt="Profile" className="w-8 h-8 mr-8 cursor-pointer hover:shadow-lg" />
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
              <a href="/" className="block py-2 px-4 font-bold hover:bg-gray-700">Home</a>
              <a href="/projects" className="block py-2 px-4 font-bold hover:bg-gray-700">Projects</a>
              <a href="/about" className="block py-2 px-4 font-bold hover:bg-gray-700">About</a>
              <a href="/community" className="block py-2 px-4 font-bold hover:bg-gray-700">Community</a>
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
