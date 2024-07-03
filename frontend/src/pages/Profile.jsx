import ProfilePicture from "../assets/pp.png";
import InboxIcon from "../assets/inbox-icon.svg";
import EditIcon from "../assets/edit-icon.svg";
import SettingsIcon from "../assets/settings-icon.svg";
import ProjectImage1 from "../assets/project1.png";
import ProjectImage2 from "../assets/project2.png";
import ProjectImage3 from "../assets/project3.png";
import ProjectImage4 from "../assets/project4.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile({ user }) {
  //console.log(user)

  return (
    <div className="profile h-screen">
      <div className="profile-content">
        <div className="left-section">
          <img src={user.userImage} alt="Profile" className="profile-picture" />
        </div>
        <div className="right-section">
          <div className="profile-buttons">
            <Link to="/myinbox">
              <button className="profile-button ">
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
            {/* SETINGS  */}

            <div className="relative inline-block text-left group ">
              <button className="profile-button">
                <img
                  src={SettingsIcon}
                  alt="Settings"
                  className="icon"
                  style={{ width: "12px", height: "12px" }}
                />
                <span>My Settings</span>
              </button>

              <div className="hidden group-hover:block group-hover:relative origin-top-right  left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
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
            </div>
          </div>
          {/* SETINGS  */}

          <div className="mt-20">       {/* Added div to center User and About section  */}
            <div className="user-name">
              <h2 className="font-semibold">
                {user.firstName} {user.lastName}
              </h2>
            </div>
            <div className="user-join-date">
              <p>Joined May 2022</p>
            </div>
            <div className="profile-description">
              {/*  <h6><strong>{user.username}</strong>!</h6>  */}
              <h6 className="italic">{user.about}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <h2>My Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img src={ProjectImage1} alt="Project 1" />
            <h3>Project One</h3>
            <p>
              A brief description of project one.
            </p>
          </div>
          <div className="project-card">
            <img src={ProjectImage2} alt="Project 2" />
            <h3>Project Two</h3>
            <p>
              A brief description of project two.
            </p>
          </div>
          <div className="project-card">
            <img src={ProjectImage3} alt="Project 3" />
            <h3>Project Three</h3>
            <p>
              A brief description of project three.
            </p>
          </div>
          <div className="project-card">
            <img src={ProjectImage4} alt="Project 4" />
            <h3>Project Four</h3>
            <p>
              A brief description of project three.
            </p>
          </div>
        </div>
        <div className="see-more-container">
          <a href="/seemoreprojects" className="see-more-link">
            See more projects
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
