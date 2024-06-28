import AboutHeroImage from '../assets/about-hero.png';
import RabiaImage from '../assets/rabia.svg';
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
          <h1>We are</h1>
          <p>
            A creative hub that empowers your DIY dreams, turning ideas into reality, one project at a time.
          </p>
          <Link to="/projects" className="see-projects-button">See Projects</Link>
        </div>
      </div>
      <div className="meet-our-team">
        <h1>Meet Our Team</h1>
        <div className="team-members">
          <div className="team-member">
            <img src={RabiaImage} alt="Rabia" />
            <div className="team-member-text">
              <h2>Rabia</h2>
              <p>Web Developer</p>
            </div>
          </div>
          <div className="team-member">
            <img src={DenisImage} alt="Denis" />
            <div className="team-member-text">
              <h2>Denis</h2>
              <p>Web Developer</p>
            </div>
          </div>
          <div className="team-member">
            <img src={AnithaImage} alt="Anitha" />
            <div className="team-member-text">
              <h2>Anitha</h2>
              <p>Web Developer</p>
            </div>
          </div>
          <div className="team-member">
            <img src={RoyceImage} alt="Royce" />
            <div className="team-member-text">
              <h2>Royce</h2>
              <p>Web Developer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="our-values">
        <h1>Our Values</h1>
        <div className="values-cards">
          <div className="card">
            <img src={CreativityImage} alt="Creativity" />
            <div className="overlay">CREATIVITY</div>
          </div>
          <div className="card">
            <img src={CuriosityImage} alt="Curiosity" />
            <div className="overlay">CURIOSITY</div>
          </div>
          <div className="card">
            <img src={UtilityImage} alt="Utility" />
            <div className="overlay">UTILITY</div>
          </div>
        </div>
      </div>
      <div className="get-in-touch">
        <div className="get-in-touch-text">
          <h1>Get in Touch</h1>
          <h2>We'd love to hear from you!</h2>
          <p>Have ideas, looking for partner, or need support? </p>
          <Link to="/contact" className="contact-us-button">Contact Us</Link>
        </div>
        <img className="contact-image" src={ContactImage} alt="Get in Touch" />
      </div>
    </div>
  );
};

export default About;
