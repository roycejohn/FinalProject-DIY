import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import NavbarLogo from "../assets/navbar-logo.svg";
import ProfileIcon from "../assets/profile-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";
import ProjectForm from "../pages/ProjectForm";

const Header = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
  }; // Logout added

  return (
    <>
      <header className="relative">
        <div className="container mx-auto max-w-screen-lg flex justify-between items-center">
          <Link to="/">
            <img src={NavbarLogo} alt="Logo" className="w-24 h-24" />
          </Link>
          <div className="flex-grow mx-10 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-2 bg-white rounded-xl border border-gray-700 focus:outline-none focus:ring focus:border-blue-300 pl-8"
            />
            <SearchIcon className="h-4 w-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <nav className="hidden md:flex space-x-6 mr-8">
            <a href="/" className="hover:text-gray-600">
              Home
            </a>
            <a href="/projects" className="hover:text-gray-600">
              Projects
            </a>
            <a href="/about" className="hover:text-gray-600">
              About
            </a>
            <a href="/community" className="hover:text-gray-600">
              Community
            </a>
          </nav>

          {/* added to check if no user */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-100">
                Login
              </Link>

              <Link to="/register" className=" ml-4 hover:text-gray-100">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-4 px-4 text-gray-700">
                <button
                  onClick={toggleModal}
                  className="relative flex items-center bg-white border border-gray-700 focus:outline-none px-4 py-2 rounded-xl"
                >
                  <img
                    src={PlusIcon}
                    alt="Create"
                    className="w-4 h-4 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                  <span className="ml-6">Create</span>
                </button>

                <div className="relative">
                  <img
                    src={ProfileIcon}
                    alt="Profile"
                    className="w-8 h-8 cursor-pointer hover:shadow-lg"
                    onClick={toggleProfileMenu}
                  />

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/projects"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Projects
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {/* added to check if no user */}

          <div className="md:hidden mx-6">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-2 px-4">
            <div className="nav-list">
              <Link
                to="/"
                className="block py-2 px-4 font-bold hover:bg-gray-500"
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="block py-2 px-4 font-bold hover:bg-gray-500"
              >
                Projects
              </Link>
              <Link to="/community" className="hover:text-gray-100">
                Community
              </Link>

              <Link
                to="/about"
                className="block py-2 px-4 font-bold hover:bg-gray-500"
              >
                About
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 font-bold hover:bg-gray-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 px-4 font-bold hover:bg-gray-500"
              >
                Register
              </Link>
            </div>
            <div className="sign-list flex justify-center mt-2">
              <Link to="/profile">
                <img
                  src={ProfileIcon}
                  alt="Profile"
                  className="w-8 h-8 cursor-pointer hover:shadow-lg"
                />
              </Link>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={toggleModal}
            ></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-6xl h-3/4 overflow-auto">
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
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
