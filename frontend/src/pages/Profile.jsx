
import '../index.css';
import ProfilePicture from '../assets/pp.png';
import InboxIcon from '../assets/inbox-icon.svg';
import EditIcon from '../assets/edit-icon.svg';
import SettingsIcon from '../assets/settings-icon.svg';

function Profile() {
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
            <button className="profile-button">
              <img src={EditIcon} alt="Edit" className="icon" style={{ width: '12px', height: '12px' }} />
              <span>Edit profile</span>
            </button>
            <button className="profile-button">
              <img src={SettingsIcon} alt="Settings" className="icon" style={{ width: '12px', height: '12px' }} />
              <span>Go to settings</span>
            </button>
          </div>
          <div className="user-name">
            <h2>Denis Sab</h2>
          </div>
          <div className="user-join-date">
            <p>Joined May 2022</p>
          </div>
          <div className="profile-description">
            <h6>Hi there!</h6>
            <h6>I am a passionate advocate for sustainable living, dedicated to helping others embrace eco-friendly habits through practical tips and inspiring projects.</h6>
          </div>
        </div>
      </div>
      <div className="projects-section">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {/* Projects Grid */}
        </div>
        <a href="/projects" className="see-more-link">See More</a>
      </div>
    </div>
  );
}

export default Profile;
