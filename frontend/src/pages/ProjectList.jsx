import { useEffect, useState } from "react";
import { getProjects } from "../hooks/apiHook.js";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext.jsx";

const ProjectList = (user) => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
   // added for  Context
   const { searchQuery, setSearchQuery, filteredProjects, setFilteredProjects } =
   useSearch();
  // const [filteredProjects, setFilteredProjects] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const allProjects = await getProjects();
        const userProjects = allProjects.filter(
          (project) => project.username === user.username
        );
        setProjects(userProjects);
        setFilteredProjects(userProjects); 
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };
    fetchUserProjects();
  }, [user.username, setFilteredProjects]);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects, setFilteredProjects]);

  const formatRelativeTime = (dateTime) => {
    const date = new Date(dateTime);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return interval === 1
          ? `a ${unit.name} ago`
          : `${interval} ${unit.name}s ago`;
      }
    }
    return "just now";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
        setFilteredProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  const filterProjects = (category) => {
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === category
      );
      setFilteredProjects(filtered);
    }
    setActiveCategory(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      project.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

/*   const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }; */

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Projects</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearch}
          className="mr-4 px-3 py-1 border rounded focus:outline-none"
        />
        <button
          className={`mr-4 px-3 py-1 rounded focus:outline-none ${
            activeCategory === "All"
              ? "bg-gray-200 text-gray-700"
              : "bg-white text-gray-700"
          }`}
          onClick={() => filterProjects("All")}
        >
          All
        </button>
        <button
          className={`mr-4 px-3 py-1 rounded-md focus:outline-none ${
            activeCategory === "General"
              ? "bg-gray-200 text-gray-700"
              : "bg-white text-gray-700"
          }`}
          onClick={() => filterProjects("General")}
        >
          General
        </button>
        <button
          className={`mr-4 px-3 py-1 rounded-md focus:outline-none ${
            activeCategory === "Cooking"
              ? "bg-gray-200 text-gray-700"
              : "bg-white text-gray-700"
          }`}
          onClick={() => filterProjects("Cooking")}
        >
          Cooking
        </button>
        <button
          className={`px-3 py-1 rounded-md focus:outline-none ${
            activeCategory === "Workshop"
              ? "bg-gray-200 text-gray-700"
              : "bg-white text-gray-700"
          }`}
          onClick={() => filterProjects("Workshop")}
        >
          Workshop
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <div className="p-1">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <div className="text-sm">
                <p className="text-gray-500">created by: {project.username}</p>
                <p className="text-gray-500">
                  created on: {formatRelativeTime(project.createdAt)}
                </p>
              </div>
            </div>
            <Link
              to={`/projects/${project._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
