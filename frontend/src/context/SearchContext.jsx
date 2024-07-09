import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [ searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  return (
    <SearchContext.Provider value={{ 
        headerSearchQuery, 
        setHeaderSearchQuery, 
        searchQuery, 
        setSearchQuery, 
        filteredProjects, 
        setFilteredProjects 
      }}>
      {children}
    </SearchContext.Provider>
  );
};