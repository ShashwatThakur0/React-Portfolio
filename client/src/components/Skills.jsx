// Import required dependencies from framer-motion for animations and React for refs
import { motion } from "framer-motion";
import { useRef } from "react";

// Define the skills data structure with categories, skill levels, and icons
const skillsData = {
	// Frontend Development category with related skills and proficiency levels
	"Frontend Development": {
		skills: [
			{ name: "React.js", level: 90 }, // Advanced React.js proficiency
			{ name: "JavaScript", level: 85 }, // Strong JavaScript fundamentals
			{ name: "HTML5 & CSS3", level: 95 }, // Expert in HTML5 and CSS3
			{ name: "Tailwind CSS", level: 88 }, // Proficient in Tailwind CSS framework
			{ name: "Responsive Design", level: 92 }, // Strong responsive design skills
		],
		icon: "💻", // Computer emoji representing frontend development
	},
	// Backend & Data category with data processing and backend skills
	"Backend & Data": {
		skills: [
			{ name: "Python", level: 85 }, // Strong Python programming skills
			{ name: "Data Analysis", level: 80 }, // Proficient in data analysis
			{ name: "Facial Recognition", level: 75 }, // Experience with facial recognition
			{ name: "API Integration", level: 88 }, // Strong API integration skills
		],
		icon: "🔧", // Wrench emoji representing backend tools
	},
	// Development Tools category with various development environment skills
	"Development Tools": {
		skills: [
			{ name: "Git & GitHub", level: 92 }, // Expert in version control
			{ name: "VS Code", level: 95 }, // Mastery of VS Code editor
			{ name: "npm", level: 88 }, // Proficient in package management
			{ name: "Vite", level: 85 }, // Strong knowledge of Vite build tool
			{ name: "Command Line", level: 90 }, // Advanced command line skills
		],
		icon: "🛠", // Tools emoji representing development tools
	},
};

const Skills = () => {
	const containerRef = useRef(null);

	return (
		<motion.section
			ref={containerRef}
			className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: "-20%" }}
			transition={{ duration: 1.2, ease: "easeOut" }}
		>
			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-10%" }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold text-white mb-4 tracking-tight text-shadow">
						Skills & Expertise
					</h2>
					<p className="text-xl text-gray-200">
						A showcase of my technical abilities and professional toolkit
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{Object.entries(skillsData).map(([category, { skills, icon }], index) => (
						<motion.div
							key={category}
							initial={{ opacity: 0, scale: 0.98, y: 20 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							viewport={{ once: true, margin: "-5%" }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
						>
							<div className="text-5xl mb-6">{icon}</div>
							<h3 className="text-2xl font-semibold text-white mb-6">
								{category}
							</h3>
							<div className="space-y-4">
								{skills.map((skill) => (
									<div key={skill.name} className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="text-white font-medium text-shadow">
												{skill.name}
											</span>
											<span className="text-blue-300 text-sm font-medium text-shadow">
												{skill.level}%
											</span>
										</div>
										<div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
											<motion.div
												className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
												initial={{ width: 0 }}
												whileInView={{ width: `${skill.level}%` }}
												viewport={{ once: true }}
												transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
											/>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default Skills;
