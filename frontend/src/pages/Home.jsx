import HeroImage from '../assets/hero-image.png';
import NewsletterImage from '../assets/newsletter-image.svg';

function Home() {
  return (
    <div className="home">
    <div className="hero">
      <img src={HeroImage} alt="Hero" className="hero-image" />
      <div className="hero-text">
        <h1>Your Adventure Begins Here</h1>
        <p>Explore, Learn, Share: Your Go-To Resource for DIY Projects and Ideas</p>
      </div>
    </div>

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