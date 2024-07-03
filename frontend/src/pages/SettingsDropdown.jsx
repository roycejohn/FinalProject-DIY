// src/Dropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const DropdownSettings = () => {
  return (
    <div className="relative inline-block text-left group">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Options
        
        </button>

        
      </div>

      <div className="hidden group-hover:block group-hover:relative origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <Link to="/email" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
          Edit email 
          </Link>
          <Link to="/password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            Edit Password
          </Link>
          <Link to="/delete-account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownSettings;