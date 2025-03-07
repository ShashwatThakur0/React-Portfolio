// Import required dependencies from framer-motion for animations and React for refs
import { motion } from "framer-motion";
import { useState } from "react";

const Skills = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const skillCategories = {
		"Frontend Development": {
			icon: "🎨",
			color: "from-blue-500/20 to-blue-600/20",
			borderColor: "border-blue-500/20",
			description:
				"Creating beautiful, responsive, and interactive user interfaces",
			skills: [
				{
					name: "React.js",
					level: 90,
					icon: "⚛️",
					projects: 15,
					description:
						"Component-based UI development with modern React practices",
				},
				{
					name: "JavaScript",
					level: 85,
					icon: "📜",
					projects: 20,
					description:
						"ES6+, async programming, and modern JavaScript features",
				},
				{
					name: "HTML5 & CSS3",
					level: 95,
					icon: "🎨",
					projects: 25,
					description:
						"Semantic markup and modern CSS techniques including Flexbox and Grid",
				},
				{
					name: "Tailwind CSS",
					level: 88,
					icon: "🌊",
					projects: 12,
					description: "Utility-first CSS framework for rapid UI development",
				},
				{
					name: "Responsive Design",
					level: 92,
					icon: "📱",
					projects: 18,
					description: "Mobile-first approach and cross-device compatibility",
				},
			],
		},
		"Backend Development": {
			icon: "⚙️",
			color: "from-purple-500/20 to-purple-600/20",
			borderColor: "border-purple-500/20",
			description: "Building robust and scalable server-side applications",
			skills: [
				{
					name: "Node.js",
					level: 85,
					icon: "🟢",
					projects: 10,
					description:
						"Server-side JavaScript with Express.js and RESTful APIs",
				},
				{
					name: "MongoDB",
					level: 80,
					icon: "🍃",
					projects: 8,
					description: "NoSQL database design and optimization",
				},
				{
					name: "API Development",
					level: 88,
					icon: "🔌",
					projects: 12,
					description: "RESTful and GraphQL API design and implementation",
				},
				{
					name: "Authentication",
					level: 85,
					icon: "🔐",
					projects: 10,
					description: "JWT, OAuth, and secure user authentication systems",
				},
			],
		},
		"Development Tools": {
			icon: "🛠",
			color: "from-green-500/20 to-green-600/20",
			borderColor: "border-green-500/20",
			description: "Mastering tools that enhance development workflow",
			skills: [
				{
					name: "Git & GitHub",
					level: 92,
					icon: "📚",
					projects: 30,
					description: "Version control and collaborative development",
				},
				{
					name: "VS Code",
					level: 95,
					icon: "👨‍💻",
					projects: 40,
					description: "Advanced IDE usage and custom configurations",
				},
				{
					name: "Webpack",
					level: 85,
					icon: "📦",
					projects: 15,
					description: "Module bundling and build optimization",
				},
				{
					name: "DevTools",
					level: 90,
					icon: "🔧",
					projects: 35,
					description: "Browser debugging and performance optimization",
				},
			],
		},
		"Soft Skills": {
			icon: "🤝",
			color: "from-yellow-500/20 to-yellow-600/20",
			borderColor: "border-yellow-500/20",
			description: "Essential non-technical skills for successful development",
			skills: [
				{
					name: "Problem Solving",
					level: 95,
					icon: "🧩",
					projects: 50,
					description: "Analytical thinking and creative solution development",
				},
				{
					name: "Communication",
					level: 90,
					icon: "💬",
					projects: 40,
					description: "Clear and effective technical communication",
				},
				{
					name: "Team Work",
					level: 88,
					icon: "👥",
					projects: 25,
					description: "Collaborative development and peer programming",
				},
				{
					name: "Time Management",
					level: 85,
					icon: "⏰",
					projects: 30,
					description: "Project planning and deadline management",
				},
			],
		},
	};

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-24">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.1 }}
					transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
					className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
				></motion.div>
			</div>

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-24">
					{/* Section Header */}
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="inline-block px-4 py-1.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium mb-4 border border-white/10 hover:border-white/20 transition-colors"
						>
							WHAT I CAN DO
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-6xl font-bold tracking-tight text-white mb-4"
						>
							Skills & Expertise
						</motion.h2>
						<motion.div
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-24 h-1.5 bg-gradient-to-r from-white/50 to-white/10 mx-auto mb-8 rounded-full"
						></motion.div>
					</div>

					{/* Category Navigation */}
					<div className="flex flex-wrap justify-center gap-4 mb-16">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setActiveCategory("all")}
							className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
								activeCategory === "all"
									? "bg-white text-gray-900"
									: "bg-white/10 text-white hover:bg-white/20"
							}`}
						>
							All Skills
						</motion.button>
						{Object.keys(skillCategories).map((category) => (
							<motion.button
								key={category}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveCategory(category)}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									activeCategory === category
										? "bg-white text-gray-900"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
							>
								{category}
							</motion.button>
						))}
					</div>

					{/* Skills Grid */}
					<div className="grid gap-8">
						{(activeCategory === "all"
							? Object.entries(skillCategories)
							: [[activeCategory, skillCategories[activeCategory]]]
						).map(
							([
								category,
								{ icon, color, borderColor, description, skills },
							]) => (
								<motion.div
									key={category}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className="space-y-8"
								>
									<div className="flex items-center gap-4 mb-8">
										<div className="text-4xl">{icon}</div>
										<div>
											<h3 className="text-2xl font-bold text-white">
												{category}
											</h3>
											<p className="text-gray-400">{description}</p>
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-6">
										{skills.map((skill, index) => (
											<motion.div
												key={skill.name}
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												whileHover={{ scale: 1.02 }}
												className={`p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-sm border ${borderColor} hover:border-white/20 transition-all duration-300 group`}
											>
												<div className="flex items-start gap-4">
													<div className="text-3xl group-hover:scale-110 transition-transform duration-300">
														{skill.icon}
													</div>
													<div className="flex-1 space-y-4">
														<div>
															<h4 className="text-xl font-bold text-white">
																{skill.name}
															</h4>
															<p className="text-sm text-gray-300 mt-1">
																{skill.description}
															</p>
														</div>

														<div className="space-y-2">
															<div className="flex justify-between text-sm">
																<span className="text-gray-300">
																	Proficiency
																</span>
																<span className="text-white font-medium">
																	{skill.level}%
																</span>
															</div>
															<div className="h-2 bg-white/10 rounded-full overflow-hidden">
																<motion.div
																	initial={{ width: 0 }}
																	whileInView={{ width: `${skill.level}%` }}
																	viewport={{ once: true }}
																	transition={{ duration: 1, delay: 0.2 }}
																	className="h-full bg-white/30 rounded-full"
																/>
															</div>
														</div>

														<div className="flex items-center gap-2 text-sm text-gray-300">
															<span className="text-white font-medium">
																{skill.projects}
															</span>
															Projects Completed
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skills;
