
import { Link } from "react-router-dom";
import Logo from "../assets/logo-footer.svg";
import FacebookIcon from "../assets/facebook-icon.svg";
import InstagramIcon from "../assets/instagram-icon.svg";
import PinterestIcon from "../assets/pinterest-icon.svg";
import YoutubeIcon from "../assets/youtube-icon.svg";
import "../index.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          {Logo && <img src={Logo} alt="logo" className="footer-logo" />}
        </div>
        <div className="footer-center">
          <div className="footer-links">
            <Link to="/" className="footer-link">
              Home
            </Link>
            <Link to="/about" className="about-link">
              About
            </Link>
            <Link to="/projects" className="footer-link">
              Projects
            </Link>
            <Link to="/community" className="footer-link">
              Community
            </Link>
            <Link to="/contact" className="contact-link">
              Contact
            </Link>
          </div>
        </div>
        <div className="footer-right">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={FacebookIcon}
              alt="Facebook"
              className="social-media-icon"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={InstagramIcon}
              alt="Instagram"
              className="social-media-icon"
            />
          </a>
          <a
            href="https://www.pinterest.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={PinterestIcon}
              alt="Pinterest"
              className="social-media-icon"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={YoutubeIcon} alt="Youtube" className="social-media-icon" />
          </a>
        </div>
      </div>
      <p className="footer-text">&copy; 2024 DIYHub. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
