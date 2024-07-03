import HeroImage from '../assets/hero-image.png';
import JoinImage from '../assets/join-image.svg';
import PImage1 from '../assets/p1.png';
import PImage2 from '../assets/p2.png';
import PImage3 from '../assets/p3.png';
import PImage4 from '../assets/p4.png';
import PopularImage1 from '../assets/popular1.png';
import PopularImage2 from '../assets/popular2.png';
import PopularImage3 from '../assets/popular3.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjects } from '../hooks/apiHook.js';

function Home() {

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);


console.log(projects)
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
    <div className="home">
      <div className="hero">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>Your Adventure Begins Here</h1>
          <p>Explore, Learn, Share: Your Go-To Resource for DIY Projects and Ideas</p>
        </div>
      </div>

{/* RECENT PROJECT */}
      <div className="recent-projects">
        <h1>Recent Projects</h1>
        <div className="project-cards">
          <div className="left">
            <div className="project-card small">
              <div className="project-image">
                <img src={PImage1} alt="Project 1" />
              </div>
              <div className="project-details">
                <h2>Lorem Ipsum</h2>
                <p>Lorem ipsum dolor sit amet.</p>
                <a href="#" className="see-more">See More...</a>
              </div>
            </div>

            <div className="project-card small">
              <div className="project-image">
                <img src={PImage2} alt="Project 2" />
              </div>
              <div className="project-details">
                <h2>Lorem Ipsum</h2>
                <p>Lorem ipsum dolor sit amet.</p>
                <a href="#" className="see-more">See More...</a>
              </div>
            </div>

            <div className="project-card small">
              <div className="project-image">
                <img src={PImage3} alt="Project 3" />
              </div>
              <div className="project-details">
                <h2>Lorem Ipsum</h2>
                <p>Lorem ipsum dolor sit amet.</p>
                <a href="#" className="see-more">See More...</a>
              </div>
            </div>
          </div>
{/* DIY of DAY RANDOM PROJECT */}

          <div className="right">
            <div className="project-card big">
              <div className="project-image">
                <img src={PImage4} alt="Project 4" />
              </div>
              <div className="project-details">
                <h2>Lorem Ipsum</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ipsum id mauris mollis malesuada. Nam id consectetur ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur nec dolor eget felis rhoncus eleifend.</p>
                <a href="#" className="see-more">See More...</a>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* MOST POPULAR */}
      <div className="most-popular">
        <h1>Most Popular</h1>
        <div className="popular-cards">
          {/* Card 1 */}
          <div className="popular-card">
            <div className="popular-image">
              <img src={PopularImage1} alt="Project 1" />
            </div>
            <div className="popular-details">
              <h3>Lorem Ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ipsum id mauris mollis malesuada.</p>
              <a href="#" className="see-more">See More...</a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="popular-card">
            <div className="popular-image">
              <img src={PopularImage2} alt="Project 2" />
            </div>
            <div className="popular-details">
              <h3>Lorem Ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ipsum id mauris mollis malesuada.</p>
              <a href="#" className="see-more">See More...</a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="popular-card">
            <div className="popular-image">
              <img src={PopularImage3} alt="Project 3" />
            </div>
            <div className="popular-details">
              <h3>Lorem Ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ipsum id mauris mollis malesuada.</p>
              <a href="#" className="see-more">See More...</a>
            </div>
          </div>
        </div>
      </div>

      <div className="join">
        <div className="join-left">
          <img src={JoinImage} alt="Join" className="join-image" />
        </div>
        <div className="join-right">
          <div className="join-content">
            <h2>Join Our Community!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ipsum id mauris mollis malesuada. Nam id consectetur ligula.</p>
            <form className="join-form">
              <Link to="/register">
                <button type="button" className="join-button">Join</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
