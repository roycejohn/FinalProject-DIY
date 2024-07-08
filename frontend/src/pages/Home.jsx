import HeroImage from "../assets/hero-image.png";
import JoinImage from "../assets/join-image.svg";
import PImage1 from "../assets/p1.png";
import PImage2 from "../assets/p2.png";
import PImage3 from "../assets/p3.png";
import PImage4 from "../assets/p4.png";
import PopularImage1 from "../assets/popular1.png";
import PopularImage2 from "../assets/popular2.png";
import PopularImage3 from "../assets/popular3.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects, getMostPopularProjects } from "../hooks/apiHook.js";

function Home() {
  const [projects, setProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [diyOfTheDay, setDiyOfTheDay] = useState(null);
  const [mostPopular, setMostPopular] = useState([]);

  console.log(projects);
  console.log(recentProjects);
  console.log(diyOfTheDay);
  console.log(mostPopular);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get projects
        const result = await getProjects();
        setProjects(result);

        // last created projects
        const sortProjectCreated = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const lastThree = sortProjectCreated.slice(0, 3);
        setRecentProjects(lastThree);

        //random Project of The Day
        const randomProject = result[Math.floor(Math.random() * result.length)];
        setDiyOfTheDay(randomProject);

        // Popular Projects
        const popularProjects = await getMostPopularProjects();
        setMostPopular(popularProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>Your Adventure Begins Here</h1>
          <p>
            Explore, Learn, Share: Your Go-To Resource for DIY Projects and
            Ideas
          </p>
        </div>
      </div>

      {/* RECENT PROJECT */}
      <div className="recent-projects">
        <h1>Recent Projects</h1>
        <div className="project-cards">
          <div className="left ">
            <div className="project-card small flex flex-col ">
              {recentProjects.map((project) => (
                <div key={project._id} className="flex flex-row m-8">
                  <div className="project-image">
                    <img src={project.coverImage} alt="Project 1" />
                  </div>
                  <div className="project-details ">
                    <h2>{project.title}</h2>

                    <p>{project.description}</p>
                    <a href="#" className="see-more">
                      See More...
                    </a>
                    <Link className="block hover:text-blue-300" to="">
                      {project.username}{" "}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIY of DAY   */}

          <div className="right">
            <div className="project-card big">
              {diyOfTheDay && (
                <div key={diyOfTheDay._id}>
                  <div className="project-image">
                    <img src={diyOfTheDay.coverImage} alt="Project 4" />
                  </div>
                  <div className="project-details">
                    <h2>{diyOfTheDay.title}</h2>
                    <p>{diyOfTheDay.description}</p>
                    <a href="#" className="see-more">
                      See More...
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOST POPULAR */}

      <div className="most-popular ">
        <h1>Most Popular</h1>

        <div className="popular-cards ">
          {/* Card 1 */}

          {mostPopular.map((popular) => (
            <div key={popular._id} className="">
              <div className="popular-card   ">
                <div className="popular-image">
                  <img src={popular.coverImage} alt="Project 1" />
                </div>
                <div className="popular-details">
                  <h3>{popular.title}</h3>
                  <p>{popular.description}</p>
                  <a href="#" className="see-more">
                    See More...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* END  OF MOST POPULAR */}



      <div className="join">
        <div className="join-left">
          <img src={JoinImage} alt="Join" className="join-image" />
        </div>
        <div className="join-right">
          <div className="join-content">
            <h2>Join Our Community!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at
              ipsum id mauris mollis malesuada. Nam id consectetur ligula.
            </p>
            <form className="join-form">
              <Link to="/register">
                <button type="button" className="join-button">
                  Join
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
