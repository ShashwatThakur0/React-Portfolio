import { motion } from 'framer-motion';
import profilePic from '../assets/profilePic/Screenshot 2025-02-26 213047.png';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-100 to-transparent opacity-50" />
      
      {/* Main content */}
      <div className="max-w-[1500px] mx-auto px-12 md:px-20 pt-40">
        {/* Profile section */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left side - Profile image and social links */}
          <div className="flex flex-col items-center md:sticky md:top-0 w-full md:w-auto">
            <div className="relative">
              <img 
                src={profilePic}
                alt="Shashwat Thakur" 
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                <a 
                  href="https://github.com/shashwatthakur0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <img src="/github.svg" alt="GitHub" className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/_.shashwat._thakur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <img src="/instagram.svg" alt="Instagram" className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:shashwat.thakur02@gmail.com"
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <img src="/email.svg" alt="Email" className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="mt-9  text-center">
              <h2 className="text-xl font-medium">Shashwat Thakur</h2>
              <p className="text-sm text-gray-600">Web developer | Data Science</p>
            </div>
            <div className="mt-1 text-sm text-gray-500">(2018 - PRESENT)</div>
          </div>

          {/* Right side - Main heading and description */}
          <div className="flex-1 text-center md:text-left md:pl-6">
            <div className="text-5xl font-normal leading-tight">
              Hi! I'm <span className="inline-block px-4 py-2 bg-[#e8f3ff] rounded-lg">Shashwat</span><br />
              <div className="mt-1 text-4xl">
                a <span className="inline-block px-3 py-2 bg-[#111] text-white rounded-lg">Problem Solver</span>
              </div>
              <div className="mt-0 text-4xl">
                who loves to <span className="inline-block px-1 py-1 bg-gray-100 rounded-lg">create</span><br />
                and bring<br />
                innovation to<br />
                the digital world.
              </div>
            </div>
            
            <p className="mt-3 text-base text-gray-600 max-w-1xl leading-relaxed">
              I'm a curious developer who thrives at the intersection of web development and data science. 
              By combining clean code with data-driven insights, I build solutions that not only work 
              flawlessly but also adapt and scale. Currently exploring new technologies and always open 
              to exciting collaborations.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <motion.a 
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#98ff98] rounded-full font-medium hover:bg-[#7aff7a] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See what I can do
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
