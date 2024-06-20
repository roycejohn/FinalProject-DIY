import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Link to="/" className="px-3 hover:underline">
            Home
          </Link>
          <Link to="/projects" className="px-3 hover:underline">
            Projects
          </Link>
          <Link to="/community" className="px-3 hover:underline">
            Community
          </Link>
          <Link to="/about" className="px-3 hover:underline">
            About
          </Link>
        </div>
        <p className="text-sm">&copy; 2024 DIYHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
