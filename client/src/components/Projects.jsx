// Import required hooks and libraries
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import { fetchGithubProjects } from "../services/github"; // GitHub API service

// Projects component to display GitHub projects
const Projects = () => {
	// State for storing projects data and loading status
	const [projects, setProjects] = useState([]); // Array of GitHub projects
	const [loading, setLoading] = useState(true); // Loading state indicator

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

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="text-center text-white">Loading projects...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="text-4xl font-bold text-white mb-8 text-shadow">
					My Projects
				</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300"
						>
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-48 object-cover"
							/>

							<div className="p-6">
								<h3 className="text-xl font-semibold text-white mb-2 text-shadow">
									{project.title}
								</h3>

								<p className="text-gray-200 mb-4">{project.description}</p>

								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.map(
										(tech) =>
											tech && (
												<span
													key={tech}
													className="px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm font-medium"
												>
													{tech}
												</span>
											)
									)}
								</div>

								<div className="flex items-center gap-4 mb-4">
									{project.stars > 0 && (
										<span className="flex items-center text-sm text-gray-200">
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
										<span className="flex items-center text-sm text-gray-200">
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
								</div>

								<div className="flex gap-4">
									{project.liveLink && (
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-primary"
										>
											Live Demo
										</a>
									)}
									<a
										href={project.githubLink}
										target="_blank"
										rel="noopener noreferrer"
										className="btn bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
									>
										GitHub
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default Projects;
