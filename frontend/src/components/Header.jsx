import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import NavbarLogo from "../assets/navbar-logo.svg";
import ProfileIcon from "../assets/profile-icon.svg";
import PlusIcon from "../assets/plus-icon.svg";
import ProjectForm from "../pages/ProjectForm";
import { useSearch,  } from "../context/SearchContext.jsx";

const Header = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // added from cearch context
  const { headerSearchQuery, setHeaderSearchQuery, setSearchQuery } =
    useSearch();
  // naviget used to redirec to projectList
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setHeaderSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
    navigate("/projects");
  };

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
    localStorage.removeItem("user");
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
              value={headerSearchQuery}  // changed to update filter in project list
              onChange={handleSearch}
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

          {/* Added code Check for User !! */}
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
                <div onClick={toggleProfileMenu}>
                  {" "}
                  {/* ADDED so when clicking on username too will toggle menu */}
                  <div className="relative flex items-center ">
                    <img
                      src={ProfileIcon}
                      alt="Profile"
                      className="w-8 h-8 cursor-pointer hover:shadow-lg "
                      onClick={toggleProfileMenu}
                    />
                    {/* Added username on header!! */}
                    <div className="ml-4 cursor-pointer ">
                      <h6 className="text-sm font-bold text-zinc-500 ">
                        {" "}
                        Hello{" "}
                        <strong className="text-red-400">
                          {user.username}
                        </strong>
                      </h6>
                    </div>

                    {/* Added username on header!! */}

                    {isProfileMenuOpen && (
                      <div className="absolute  mt-52 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/myprojects"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                          My Projects
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Settings
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
              </div>
            </>
          )}
          {/* End of Check User */}

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
          <div className="md:hidden py-2 px-4 ">
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

              <Link
                to="/community"
                className="block py-2 px-4 font-bold hover:bg-blue-300 w-32 rounded-lg  " // added rounded-lg
              >
                Community
              </Link>

              <Link
                to="/about"
                className="block py-2 px-4 font-bold hover:bg-blue-300 w-32" // added w-32 hoover blue
              >
                About
              </Link>
              {/* Check for User on small screen  !! */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block py-2 px-4 font-bold hover:bg-gray-500 "
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 font-bold hover:bg-gray-500 hover:bg-blue-300"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex flex-col  space-y-4 px-4 text-gray-700 ">
                    <button
                      onClick={toggleModal}
                      className="relative flex items-center w-28 bg-white border-2 border-gray-700 focus:outline-none px-4 py-2 rounded-xl hover:bg-blue-300"
                    >
                      <img
                        src={PlusIcon}
                        alt="Create"
                        className="w-4 h-4 text-gray-800 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      />
                      <span className="ml-4">Create</span>
                    </button>

                    <div className="relative">
                      <img
                        src={ProfileIcon}
                        alt="Profile"
                        className="w-8 h-8 cursor-pointer hover:shadow-lg"
                        onClick={toggleProfileMenu}
                      />

                      {isProfileMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-300"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/myprojects"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-300"
                          >
                            My Projects
                          </Link>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-300"
                          >
                            Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-300"
                          >
                            Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* End of Check User */}
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
