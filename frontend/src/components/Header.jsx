import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import HeaderLogo from '../assets/header-logo.svg';
import ProfileIcon from '../assets/profile-icon.svg'; 
import PlusIcon from '../assets/plus-icon.svg'; 
import ProjectForm from '../pages/ProjectForm';


const Header = ({user,setUser}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(false);
  };  // Logout added


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
           <Link to="/" className="hover:text-gray-100">Home</Link>
           <Link to="/projects" className="hover:text-gray-100">Projects</Link>
            <Link to="/community" className="hover:text-gray-100">Community</Link>
           <Link to="/about" className="hover:text-gray-100">About</Link>
    {/* added to check if no user */}
            {!user ? (
              <>
                <Link to="/login" className="hover:text-gray-100">Login</Link>
                <Link to="/register" className="hover:text-gray-100">Register</Link>
              </>
            ) : (
              <>
              <button onClick={toggleModal} className="flex items-center space-x-1 bg-white border border-gray-700 focus:outline-none px-2 py-1 rounded-xl">
              <img src={PlusIcon} alt="Create" className="w-4 h-4"/>
              <span className="ml-6 pr-4">Create</span> 
            </button>

            <Link to="/profile">
              <img src={ProfileIcon} alt="Profile" className="w-8 h-8 cursor-pointer hover:shadow-lg" />
            </Link>
              <button onClick={handleLogout} className="ml-4 bg-red-600 text-white px-2 py-1 rounded">Logout</button>
            </> 
      
            )}   
          </nav> 
        
          </div>

          <div className="md:hidden mx-6">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg className="h-9 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
    

        {isMenuOpen && (
          <div className="md:hidden py-2 px-4">
            <div className="nav-list">
             <Link to="/" className="block py-2 px-4 font-bold hover:bg-gray-500">Home</Link>
             <Link to="/projects" className="block py-2 px-4 font-bold hover:bg-gray-500">Projects</Link>
              <Link to="/community" className="hover:text-gray-100">Community</Link>

             <Link to="/about" className="block py-2 px-4 font-bold hover:bg-gray-500">About</Link>
             <Link to="/login" className="block py-2 px-4 font-bold hover:bg-gray-500">Login</Link>
             <Link to="/register" className="block py-2 px-4 font-bold hover:bg-gray-500">Register</Link>
              
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
