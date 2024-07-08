import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../hooks/apiHook.js';

function MyProjects({ user }) {
  const [projects, setProjects] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const allProjects = await getProjects();
        const userProjects = allProjects.filter(project => project.username === user.username);
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };
    fetchUserProjects();
  }, [user.username]);

  const formatDateTime = (dateTime) => {
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
        return interval === 1 ? `a ${unit.name} ago` : `${interval} ${unit.name}s ago`;
      }
    }
    return "just now";
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-5xl mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>

        <div className="mb-4">
          <label htmlFor="sortOrder" className="mr-2">Sort by date:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="p-2 border rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length > 0 ? (
            sortedProjects.map((project) => (
              <Link key={project._id} to={`/projects/${project._id}`} className="project-card-link">
                <div className="project-card bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={project.coverImage} alt={project.title} className="project-image w-full h-48 object-cover" />
                  <div className="p-1">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-gray-500">created by: {project.username}</p>
                    <p className="text-gray-500">created on: {formatDateTime(project.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
