import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const skillsData = {
  "Frontend Development": {
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Responsive Design", level: 92 }
    ],
    icon: "💻"
  },
  "Backend & Data": {
    skills: [
      { name: "Python", level: 85 },
      { name: "Data Analysis", level: 80 },
      { name: "Facial Recognition", level: 75 },
      { name: "API Integration", level: 88 }
    ],
    icon: "🔧"
  },
  "Development Tools": {
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "npm", level: 88 },
      { name: "Vite", level: 85 },
      { name: "Command Line", level: 90 }
    ],
    icon: "🛠"
  }
};

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black"
      style={{
        opacity,
        y,
        scale
      }}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Skills & Expertise</h2>
          <p className="text-xl text-gray-400">
            A showcase of my technical abilities and professional toolkit
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(skillsData).map(([category, { skills, icon }]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 hover:border-white/40 transition-all duration-300 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-6">{icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-6">{category}</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-blue-300 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
