import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side */}
        <div className="flex items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="4" fill="#00FF75"/>
          </svg>
          <span className="nav-link">Portfolio</span>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-9">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#about" className="nav-link">About</a>
          <span className="flex items-center">
            <a href="mailto:shashwat.thakur02@gmail.com" className="nav-link ml-1">
            <span className="email-label">Email me</span>
            </a>
          </span>
          <a href="#contact" className="contact-button">
            Contact me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
