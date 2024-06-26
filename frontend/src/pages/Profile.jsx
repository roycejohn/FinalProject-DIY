
import '../index.css';
import ProfilePicture from '../assets/pp.png';
import InboxIcon from '../assets/inbox-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import SettingsIcon from '../assets/settings-icon.svg';
import ProjectImage1 from '../assets/project1.png';
import ProjectImage2 from '../assets/project2.png';
import ProjectImage3 from '../assets/project3.png';
import ProjectImage4 from '../assets/project4.png';
import { Link } from 'react-router-dom';

function Profile({user}) {
 //console.log(user)
  

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="left-section">
          <img 
            src={ProfilePicture} 
            alt="Profile" 
            className="profile-picture" 
          />
        </div>
        <div className="right-section">
          <div className="profile-buttons">
            <button className="profile-button">
              <img src={InboxIcon} alt="Inbox" className="icon" style={{ width: '12px', height: '12px' }} />
              <span>See inbox</span>
            </button>
            <Link to="/editprofile">
            <button className="profile-button">
              <img src={EditIcon} alt="Edit" className="icon" style={{ width: '12px', height: '12px' }} />
              <span>Edit profile</span>
            </button>
            </Link>
            <button className="profile-button">
              <img src={SettingsIcon} alt="Settings" className="icon" style={{ width: '12px', height: '12px' }} />
              <span>Go to settings</span>
            </button>
          </div>
          <div className="user-name">
            <h2>{user.firstName} {user.lastName}</h2>
          </div>
          <div className="user-join-date">
            <p>Joined May 2022</p>
          </div>
          <div className="profile-description">
            <h6>Hi <strong>{user.username}</strong>!</h6>
            <h6>I am a passionate advocate for sustainable living, dedicated to helping others embrace eco-friendly habits through practical tips and inspiring projects.</h6>
          </div>
        </div>
      </div>
      <div className="projects-section">
        <h2>My Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img src={ProjectImage1} alt="Project 1" />
            <h3>Project One</h3>
            <p>A brief description of project one. This project focuses on sustainable living practices.</p>
          </div>
          <div className="project-card">
            <img src={ProjectImage2} alt="Project 2" />
            <h3>Project Two</h3>
            <p>A brief description of project two. This project promotes eco-friendly habits.</p>
          </div>
          <div className="project-card">
            <img src={ProjectImage3} alt="Project 3" />
            <h3>Project Three</h3>
            <p>A brief description of project three. This project involves community recycling efforts.</p>
          </div>
          <div className="project-card">
            <img src={ProjectImage4} alt="Project 4" />
            <h3>Project Four</h3>
            <p>A brief description of project three. This project involves community recycling efforts.</p>
          </div>
        </div>
        <div className="see-more-container">
        <a href="/seemoreprojects" className="see-more-link">See more projects</a>
        </div>
      </div>
    </div>
  );
}

export default Profile;

