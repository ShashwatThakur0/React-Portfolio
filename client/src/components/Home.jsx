import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 h-screen flex items-center">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Hi, I'm [Your Name]
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          Full Stack Developer | UI/UX Enthusiast | Problem Solver
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <Link
            to="/projects"
            className="btn btn-primary"
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
