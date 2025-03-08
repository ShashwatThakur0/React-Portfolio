// Import required hooks and libraries
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGithubProjects } from "../services/github"; // GitHub API service

// Projects component to display GitHub projects
const Projects = () => {
	// State for storing projects data and loading status
	const [projects, setProjects] = useState([]); // Array of GitHub projects
	const [loading, setLoading] = useState(true); // Loading state indicator
	const [selectedProject, setSelectedProject] = useState(null);
	const [filter, setFilter] = useState("all");

	// Effect hook to fetch projects on component mount
	useEffect(() => {
		// Async function to load projects from GitHub
		const loadProjects = async () => {
			const githubProjects = await fetchGithubProjects(); // Fetch projects
			setProjects(githubProjects); // Update projects state
			setLoading(false); // Set loading to false when done
		};

		loadProjects(); // Call the load function
	}, []); // Empty dependency array means this runs once on mount

	const filteredProjects = projects.filter((project) => {
		if (filter === "all") return true;
		return project.technologies.includes(filter);
	});

	const uniqueTechnologies = [
		...new Set(projects.flatMap((project) => project.technologies)),
	].filter(Boolean);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-24 flex items-center justify-center">
				<div className="text-center space-y-4">
					<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="text-white text-lg">Loading amazing projects...</p>
				</div>
			</div>
		);
	}

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
							MY WORK
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-6xl font-bold tracking-tight text-white mb-4"
						>
							Featured Projects
						</motion.h2>
						<motion.div
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-24 h-1.5 bg-gradient-to-r from-white/50 to-white/10 mx-auto mb-8 rounded-full"
						></motion.div>
					</div>

					{/* Technology Filter */}
					<div className="flex flex-wrap justify-center gap-4 mb-16">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setFilter("all")}
							className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
								filter === "all"
									? "bg-white text-gray-900"
									: "bg-white/10 text-white hover:bg-white/20"
							}`}
						>
							All Projects
						</motion.button>
						{uniqueTechnologies.map((tech) => (
							<motion.button
								key={tech}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setFilter(tech)}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									filter === tech
										? "bg-white text-gray-900"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
							>
								{tech}
							</motion.button>
						))}
					</div>

					{/* Projects Grid */}
					<motion.div
						layout
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence>
							{filteredProjects.map((project, index) => (
								<motion.div
									key={project.id}
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									whileHover={{ y: -8 }}
									className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
								>
									{/* Project Image with Overlay */}
									<div className="relative h-48 overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500"></div>
										<div className="absolute inset-0 bg-black/50"></div>
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="text-5xl font-bold text-white/20 group-hover:text-white/30 transition-all duration-300">
												{project.title
													.split(" ")
													.map((word) => word[0])
													.join("")}
											</div>
										</div>
									</div>

									{/* Project Info */}
									<div className="p-6 space-y-4">
										<h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
											{project.title}
										</h3>

										<p className="text-gray-400 text-sm line-clamp-2">
											{project.description}
										</p>

										<div className="flex flex-wrap gap-2">
											{project.technologies.map(
												(tech) =>
													tech && (
														<span
															key={tech}
															className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full"
														>
															{tech}
														</span>
													)
											)}
										</div>

										<div className="flex items-center gap-4 text-sm text-gray-400">
											{project.stars > 0 && (
												<span className="flex items-center">
													<svg
														className="w-4 h-4 mr-1"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
													</svg>
													{project.stars}
												</span>
											)}
											{project.forks > 0 && (
												<span className="flex items-center">
													<svg
														className="w-4 h-4 mr-1"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v11.586l-4-4-4 4V3z" />
													</svg>
													{project.forks}
												</span>
											)}
											<span className="flex items-center">
												<svg
													className="w-4 h-4 mr-1"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												{new Date(project.updatedAt).toLocaleDateString()}
											</span>
										</div>

										{/* Project Links */}
										<div className="flex gap-4 pt-4">
											{project.liveLink && (
												<motion.a
													href={project.liveLink}
													target="_blank"
													rel="noopener noreferrer"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-center hover:bg-gray-100 transition-colors duration-300"
												>
													Live Demo
												</motion.a>
											)}
											<motion.a
												href={project.githubLink}
												target="_blank"
												rel="noopener noreferrer"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-center hover:bg-white/20 transition-colors duration-300"
											>
												View Code
											</motion.a>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>

					{/* Empty State */}
					{filteredProjects.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-16"
						>
							<div className="text-4xl mb-4">🔍</div>
							<h3 className="text-xl font-medium text-white mb-2">
								No projects found
							</h3>
							<p className="text-gray-400">
								Try selecting a different technology filter
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
