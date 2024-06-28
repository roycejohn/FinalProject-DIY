// import HeroImage from '../assets/hero-image.png';
// import NewsletterImage from '../assets/newsletter-image.svg';

// function Home() {
//   return (
//     <div className="home">
//       <div className="hero">
//         <img src={HeroImage} alt="Hero" className="hero-image" />
//         <div className="hero-text">
//           <h1>Your Adventure Begins Here</h1>
//           <p>Explore, Learn, Share: Your Go-To Resource for DIY Projects and Ideas</p>
//       </div>
//     </div>

//     <div className="newsletter">
//         <div className="newsletter-left">
//           <img src={NewsletterImage} alt="Newsletter" className="newsletter-image" />
//         </div>
//         <div className="newsletter-right">
//           <div className="newsletter-content">
//             <h2>Join Our Newsletter!</h2>
//             <p>Join 30,000 creatives for a weekly dose of sustainable tips, delivered straight to your inbox every Friday.</p>
//             <form className="newsletter-form">
//               <input type="email" placeholder="Your email address" className="newsletter-input" />
//               <button type="submit" className="newsletter-button">Subscribe</button>
//             </form>
//           </div>
//         </div>
//       </div>
//   </div>
// );
// }

// export default Home;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/hero-image.png';
import NewsletterImage from '../assets/newsletter-image.svg';
import { getProjects } from '../hooks/apiHook';

function Home() {
  const [recentProjects, setRecentProjects] = useState([]);
  const [popularProjects, setPopularProjects] = useState([]);
  const [randomProject, setRandomProject] = useState(null);

 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();

      
        const sortedByDate = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentProjects(sortedByDate.slice(0, 4));

  
        const sortedByViews = [...projects].sort((a, b) => b.views - a.views);
        setPopularProjects(sortedByViews.slice(0, 4));

       
        const randomIndex = Math.floor(Math.random() * projects.length);
        setRandomProject(projects[randomIndex]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      
      <div className="home">
        <div className="hero">
          <img src={HeroImage} alt="Hero" className="hero-image" />
          <div className="hero-text">
            <h1>Your Adventure Begins Here</h1>
            <p>Explore, Learn, Share: Your Go-To Resource for DIY Projects and Ideas</p>
          </div>
        </div>
      </div>
      <div className="recent-projects py-16 px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentProjects.map(project => (
            <Link key={project._id} to={`/projects/${project._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={project.coverImage} alt={project.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="popular-projects py-16 px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Most Popular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProjects.map(project => (
            <Link key={project._id} to={`/projects/${project._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={project.coverImage} alt={project.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
      {randomProject && (
        <div className="diy-of-the-day py-16 px-4 md:px-10 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">DIY OF THE DAY</h2>
          <Link to={`/projects/${randomProject._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img src={randomProject.coverImage} alt={randomProject.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{randomProject.title}</h3>
              <p className="text-gray-700">{randomProject.description}</p>
    
            </div>
          </Link>
        </div>
      )}
      <div className="newsletter">
        <div className="newsletter-left">
          <img src={NewsletterImage} alt="Newsletter" className="newsletter-image" />
        </div>
        <div className="newsletter-right">
          <div className="newsletter-content">
            <h2>Join Our Newsletter!</h2>
            <p>Join 30,000 creatives for a weekly dose of sustainable tips, delivered straight to your inbox every Friday.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
