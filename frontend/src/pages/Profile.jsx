

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InboxIcon from '../assets/inbox-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import SettingsIcon from '../assets/settings-icon.svg';
import ProfileIcon from '../assets/profile-icon.svg';
import { getProjects } from '../hooks/apiHook.js';

function Profile({ user }) {
  const [projects, setProjects] = useState([]);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  };

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

 
  const userImage = user.userImage || ProfileIcon;
  const userName = `${user.firstName || "New"} ${user.lastName || "User"}`;

  return (
    <div className="profile h-screen">
      <div className="profile-content flex">
        <div className="left-section mt-20">
          <img src={userImage} alt="Profile" className="profile-picture" />
        </div>
        <div className="right-section flex-1">
          <div className="profile-buttons">
            <Link to="/myinbox">
              <button className="profile-button">
                <img
                  src={InboxIcon}
                  alt="Inbox"
                  className="icon"
                  style={{ width: "12px", height: "12px" }}
                />
                <span>My Inbox</span>
              </button>
            </Link>
            <Link to="/editprofile">
              <button className="profile-button">
                <img
                  src={EditIcon}
                  alt="Edit"
                  className="icon"
                  style={{ width: "12px", height: "12px" }}
                />
                <span>Edit Profile</span>
              </button>
            </Link>
            <div onClick={toggleSettingsMenu} className="relative inline-block text-left group">
              <button className="profile-button">
                <img
                  src={SettingsIcon}
                  alt="Settings"
                  className="icon"
                  style={{ width: "12px", height: "12px" }}
                />
                <span>My Settings</span>
              </button>
              {isSettingsMenuOpen && (
                <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div>
                    <Link
                      to="/email"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Edit email
                    </Link>
                    <Link
                      to="/password"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Edit Password
                    </Link>
                    <Link
                      to="/delete-account"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Delete Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <div className="user-name">
              <h2 className="font-semibold">{userName}</h2>
            </div>
            <div className="user-join-date">
              <p>Joined July 2024</p>
            </div>
            <div className="profile-description">
              <h6 className="italic">{user.about || "*Tell more about yourself*"}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-section mt-8 min-h-[200px] relative">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project) => (
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
        {projects.length > 0 && (
          <div className="see-more-container mt-12">
            <Link to="/seemoreprojects" className="see-more-link text-blue-500 hover:underline text-center block">
              See more projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
