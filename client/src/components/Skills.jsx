import { motion } from 'framer-motion';

const skillsData = {
  "Frontend Development": {
    skills: ["React.js", "JavaScript", "HTML5 & CSS3", "Tailwind CSS", "Responsive Design"],
    icon: "💻"
  },
  "Backend & Data": {
    skills: ["Python", "Data Analysis", "Facial Recognition", "API Integration"],
    icon: "🔧"
  },
  "Development Tools": {
    skills: ["Git & GitHub", "VS Code", "npm", "Vite", "Command Line"],
    icon: "🛠"
  }
};

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600">
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
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={skillVariants}
                    className="flex items-center"
                  >
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
