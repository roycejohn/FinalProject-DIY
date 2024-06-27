
import { useEffect, useState } from 'react';
import { getProjects } from '../hooks/apiHook.js';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
        setFilteredProjects(result);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchData();
  }, []);

  
  const filterProjects = (category) => {
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Projects</h1>
      <div className="flex mb-4">
        <button
          className={`mr-4 px-3 py-1 rounded focus:outline-none ${activeCategory === 'All' ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-700'}`}
          onClick={() => filterProjects('All')}
        >
          All
        </button>
        <button
          className={`mr-4 px-3 py-1 rounded-md focus:outline-none ${activeCategory === 'General' ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-700'}`}
          onClick={() => filterProjects('General')}
        >
          General
        </button>
        <button
          className={`mr-4 px-3 py-1 rounded-md focus:outline-none ${activeCategory === 'Cooking' ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-700'}`}
          onClick={() => filterProjects('Cooking')}
        >
          Cooking
        </button>
        <button
          className={`px-3 py-1 rounded-md focus:outline-none ${activeCategory === 'Workshop' ? 'bg-gray-200 text-gray-700' : 'bg-white text-gray-700'}`}
          onClick={() => filterProjects('Workshop')}
        >
          Workshop
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            {project.coverImage && (
              <img src={project.coverImage} alt={project.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            )}
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <Link to={`/projects/${project._id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;


