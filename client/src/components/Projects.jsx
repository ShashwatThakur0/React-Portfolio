// Import required hooks and libraries
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGithubProjects } from "../services/github"; // GitHub API service

const ProjectCard = ({ project, index }) => {
	const cardRef = useRef(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		setMousePosition({ x, y });
	};

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				transform: isHovered
					? `
						perspective(1000px)
						rotateX(${(mousePosition.y - 0.5) * 20}deg)
						rotateY(${(mousePosition.x - 0.5) * 20}deg)
						translateZ(10px)
					`
					: "none",
				transition: "transform 0.3s ease",
			}}
			className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
		>
			{/* Animated Gradient Background */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{
					background: `
						radial-gradient(
							circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
							rgba(152, 255, 152, 0.15) 0%,
							transparent 50%
						)
					`,
				}}
			/>

			{/* Project Preview */}
			<div className="relative h-48 overflow-hidden">
				<motion.div
					className="absolute inset-0 bg-gradient-to-br from-[#98ff98]/20 to-[#4ade80]/20"
					animate={{
						backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
					}}
					transition={{ duration: 3, ease: "linear", repeat: Infinity }}
					style={{ backgroundSize: "200% 200%" }}
				/>
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					animate={{
						scale: isHovered ? 1.1 : 1,
						rotate: isHovered ? [0, 5, -5, 0] : 0,
					}}
				>
					<div className="relative">
						<div className="text-6xl font-bold text-white/10 blur-sm absolute inset-0 flex items-center justify-center">
							{project.title
								.split(" ")
								.map((word) => word[0])
								.join("")}
						</div>
						<div className="text-6xl font-bold text-white/30 relative">
							{project.title
								.split(" ")
								.map((word) => word[0])
								.join("")}
						</div>
					</div>
				</motion.div>
			</div>

			{/* Project Info */}
			<div className="relative p-6 space-y-4">
				<motion.div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

				<div className="relative space-y-4">
					<motion.h3
						className="text-xl font-bold text-white"
						animate={{
							color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
						}}
					>
						{project.title}
					</motion.h3>

					<p className="text-gray-400 text-sm line-clamp-2">
						{project.description}
					</p>

					{/* Technologies */}
					<div className="flex flex-wrap gap-2">
						{project.technologies.map(
							(tech) =>
								tech && (
									<motion.span
										key={tech}
										whileHover={{ scale: 1.1, y: -2 }}
										className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/5 hover:border-white/20 transition-colors"
									>
										{tech}
									</motion.span>
								)
						)}
					</div>

					{/* Project Stats */}
					<div className="flex items-center gap-4 text-sm text-gray-400">
						{project.stars > 0 && (
							<motion.div
								whileHover={{ scale: 1.1, y: -2 }}
								className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<span>{project.stars}</span>
							</motion.div>
						)}
						{project.forks > 0 && (
							<motion.div
								whileHover={{ scale: 1.1, y: -2 }}
								className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v11.586l-4-4-4 4V3z" />
								</svg>
								<span>{project.forks}</span>
							</motion.div>
						)}
						<motion.div
							whileHover={{ scale: 1.1, y: -2 }}
							className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full"
						>
							<svg
								className="w-4 h-4"
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
							<span>{new Date(project.updatedAt).toLocaleDateString()}</span>
						</motion.div>
					</div>

					{/* Project Links */}
					<div className="flex gap-4 pt-4">
						{project.liveLink && (
							<motion.a
								href={project.liveLink}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								className="flex-1 px-4 py-2 bg-[#98ff98] text-gray-900 rounded-lg font-medium text-center hover:bg-[#7aff7a] transition-all duration-300 shadow-lg hover:shadow-[#98ff98]/20"
							>
								<span className="flex items-center justify-center gap-2">
									Live Demo
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</span>
							</motion.a>
						)}
						<motion.a
							href={project.githubLink}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-center hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-white/20"
						>
							<span className="flex items-center justify-center gap-2">
								View Code
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									/>
								</svg>
							</span>
						</motion.a>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

// Projects component to display GitHub projects
const Projects = () => {
	// State for storing projects data and loading status
	const [projects, setProjects] = useState([]); // Array of GitHub projects
	const [loading, setLoading] = useState(true); // Loading state indicator
	const [filter, setFilter] = useState("all");
	const containerRef = useRef(null);

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
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 360, 0],
							borderRadius: ["20%", "50%", "20%"],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="w-16 h-16 border-4 border-[#98ff98] border-t-transparent mx-auto"
					/>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="text-white text-lg"
					>
						Loading amazing projects...
					</motion.p>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-24"
		>
			{/* Modern Animated Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
				<motion.div
					animate={{
						background: [
							"radial-gradient(circle at 0% 0%, rgba(152,255,152,0.1) 0%, transparent 50%)",
							"radial-gradient(circle at 100% 100%, rgba(152,255,152,0.1) 0%, transparent 50%)",
							"radial-gradient(circle at 0% 100%, rgba(152,255,152,0.1) 0%, transparent 50%)",
							"radial-gradient(circle at 100% 0%, rgba(152,255,152,0.1) 0%, transparent 50%)",
						],
					}}
					transition={{ duration: 10, repeat: Infinity }}
					className="absolute inset-0"
				/>
			</div>

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-24">
					{/* Section Header */}
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#98ff98]/20 to-[#4ade80]/20 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium mb-4 border border-[#98ff98]/30"
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
							className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98]/50 to-[#4ade80]/50 mx-auto mb-8 rounded-full"
						/>
					</div>

					{/* Technology Filter */}
					<div className="flex flex-wrap justify-center gap-4 mb-16">
						<motion.button
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setFilter("all")}
							className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
								filter === "all"
									? "bg-[#98ff98] text-gray-900"
									: "bg-white/10 text-white hover:bg-white/20"
							}`}
						>
							All Projects
						</motion.button>
						{uniqueTechnologies.map((tech) => (
							<motion.button
								key={tech}
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setFilter(tech)}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									filter === tech
										? "bg-[#98ff98] text-gray-900"
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
						<AnimatePresence mode="wait">
							{filteredProjects.map((project, index) => (
								<ProjectCard key={project.id} project={project} index={index} />
							))}
						</AnimatePresence>
					</motion.div>

					{/* Empty State */}
					{filteredProjects.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-16"
						>
							<motion.div
								animate={{
									scale: [1, 1.2, 1],
									rotate: [0, 10, -10, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatType: "reverse",
								}}
								className="text-6xl mb-4"
							>
								🔍
							</motion.div>
							<motion.h3
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
								className="text-xl font-medium text-white mb-2"
							>
								No projects found
							</motion.h3>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
								className="text-gray-400"
							>
								Try selecting a different technology filter
							</motion.p>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
