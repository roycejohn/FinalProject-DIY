import AboutHeroImage from '../assets/about-hero.png';
import RabiaImage from '../assets/rabia.png';
import DenisImage from '../assets/denis.png';
import AnithaImage from '../assets/anitha.png';
import RoyceImage from '../assets/royce.png';
import CreativityImage from '../assets/creativity.png';
import CuriosityImage from '../assets/curiosity.png';
import UtilityImage from '../assets/utility.png';
import ContactImage from '../assets/contact.png';
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <div className="about">
    <div className="about-hero">
      <img className="about-hero-image" src={AboutHeroImage} alt="About Us Hero Image" />
      <div className="about-hero-text">
        <h2>We are</h2>
        <p> 
          A creative hub that empowers your DIY dreams, turning ideas into reality, one project at a time.
        </p>
        <Link to="/projects" className="see-projects-button">See Projects</Link>
      </div>
    </div>
    <div className="meet-our-team">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src={RabiaImage} alt="Rabia" />
          <p>Rabia</p>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src={DenisImage} alt="Denis" />
          <p>Denis</p>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src={AnithaImage} alt="Anitha" />
          <p>Anitha</p>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src={RoyceImage} alt="Royce" />
          <p>Royce</p>
          <p>Web Developer</p>
        </div>
      </div>
    </div>
    {/* Additional sections or content can be added below */}
  </div>
);
};

export default About;