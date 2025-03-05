import { motion } from "framer-motion";

const About = () => {
	const skills = [
		"JavaScript",
		"React",
		"Node.js",
		"Express",
		"MongoDB",
		"HTML5",
		"CSS3",
		"Tailwind CSS",
		"Git",
		"RESTful APIs",
	];

	return (
		<div className="container mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-5xl font-bold tracking-tighter text-white mb-12 relative">
					About Me
				</h2>

				<div className="grid md:grid-cols-2 gap-12">
					<div>
						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-xl text-gray-300 mb-8 leading-relaxed font-light"
						>
							I'm a passionate Full Stack Developer with a strong foundation in
							web technologies and a keen eye for creating user-friendly
							applications. With experience in both frontend and backend
							development, I enjoy bringing ideas to life through code.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-xl text-gray-300 leading-relaxed font-light"
						>
							When I'm not coding, you can find me exploring new technologies,
							contributing to open-source projects, or sharing my knowledge with
							the developer community.
						</motion.p>
					</div>

					<div>
						<h3 className="text-3xl font-bold tracking-tight text-white mb-6">
							Skills
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{skills.map((skill, index) => (
								<motion.div
									key={skill}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-4 text-center text-gray-200 font-medium hover:from-gray-700 hover:to-gray-800 transition-colors"
								>
									{skill}
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default About;
