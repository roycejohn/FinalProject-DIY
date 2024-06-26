# FinalProject-DIY


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