// Import required hooks and libraries
import { useState, useEffect, useRef } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useTransform,
	useSpring,
} from "framer-motion";
import { fetchGithubProjects } from "../services/github"; // GitHub API service

const ProjectCard = ({ project, index, isSelected, onClick }) => {
	const cardRef = useRef(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	// Motion values for parallax effect
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [30, -30]);
	const rotateY = useTransform(x, [-100, 100], [-30, 30]);

	// Spring animations for smoother movement
	const springConfig = { damping: 25, stiffness: 300 };
	const rotateXSpring = useSpring(rotateX, springConfig);
	const rotateYSpring = useSpring(rotateY, springConfig);

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();

		// Calculate mouse position relative to card center
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		// Update motion values
		x.set(mouseX);
		y.set(mouseY);

		// Update state for other effects
		setMousePosition({
			x: (e.clientX - rect.left) / rect.width,
			y: (e.clientY - rect.top) / rect.height,
		});
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		// Reset position with spring animation
		x.set(0);
		y.set(0);
	};

	const toggleDetails = (e) => {
		e.stopPropagation();
		setShowDetails(!showDetails);
	};

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onClick={() => onClick && onClick(project)}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX: isHovered ? rotateXSpring : 0,
				rotateY: isHovered ? rotateYSpring : 0,
				transformPerspective: 1200,
				transformStyle: "preserve-3d",
				cursor: "pointer",
			}}
			className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 ${
				isSelected ? "ring-2 ring-[#98ff98] scale-[1.02]" : ""
			}`}
			whileHover={{ scale: 1.02 }}
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

				{/* Project Logo/Icon */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					style={{
						z: 20,
						transform: "translateZ(20px)",
					}}
					animate={{
						scale: isHovered ? 1.1 : 1,
						y: isHovered ? -5 : 0,
					}}
					transition={{ duration: 0.3 }}
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

				{/* Floating particles effect */}
				<div className="absolute inset-0 overflow-hidden">
					{Array.from({ length: 5 }).map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-2 h-2 rounded-full bg-[#98ff98]/30"
							initial={{
								x: Math.random() * 100 + "%",
								y: Math.random() * 100 + "%",
								opacity: 0.3 + Math.random() * 0.5,
							}}
							animate={{
								y: ["-10%", "110%"],
								opacity: [0.3, 0.7, 0.3],
							}}
							transition={{
								duration: 3 + Math.random() * 5,
								repeat: Infinity,
								delay: Math.random() * 5,
								ease: "linear",
							}}
						/>
					))}
				</div>
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
						style={{ transform: "translateZ(10px)" }}
					>
						{project.title}
					</motion.h3>

					<p className="text-gray-400 text-sm line-clamp-2">
						{project.description}
					</p>

					{/* Technologies */}
					<div className="flex flex-wrap gap-2">
						{project.technologies.slice(0, 4).map(
							(tech) =>
								tech && (
									<motion.span
										key={tech}
										whileHover={{ scale: 1.1, y: -2 }}
										className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/5 hover:border-white/20 transition-colors"
										style={{ transform: "translateZ(5px)" }}
									>
										{tech}
									</motion.span>
								)
						)}
						{project.technologies.length > 4 && (
							<motion.button
								whileHover={{ scale: 1.1, y: -2 }}
								onClick={toggleDetails}
								className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/5 hover:border-white/20 transition-colors"
							>
								+{project.technologies.length - 4}
							</motion.button>
						)}
					</div>

					{/* Project Stats */}
					<div className="flex items-center gap-4 text-sm text-gray-400">
						{project.stars > 0 && (
							<motion.div
								whileHover={{ scale: 1.1, y: -2 }}
								className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full"
								style={{ transform: "translateZ(5px)" }}
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
								style={{ transform: "translateZ(5px)" }}
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
							style={{ transform: "translateZ(5px)" }}
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
								style={{ transform: "translateZ(15px)" }}
								onClick={(e) => e.stopPropagation()}
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
							style={{ transform: "translateZ(15px)" }}
							onClick={(e) => e.stopPropagation()}
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

			{/* Expandable details panel */}
			<AnimatePresence>
				{showDetails && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="bg-black/50 backdrop-blur-sm p-4 border-t border-white/10"
						onClick={(e) => e.stopPropagation()}
					>
						<h4 className="text-sm font-medium text-white mb-2">
							All Technologies
						</h4>
						<div className="flex flex-wrap gap-2 mb-4">
							{project.technologies.map((tech) => (
								<span
									key={tech}
									className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-full"
								>
									{tech}
								</span>
							))}
						</div>

						{project.readmeContent && (
							<>
								<h4 className="text-sm font-medium text-white mb-2">
									README Preview
								</h4>
								<div className="text-xs text-gray-400 max-h-32 overflow-y-auto bg-black/30 p-2 rounded">
									{project.readmeContent.slice(0, 300)}...
								</div>
							</>
						)}

						<button
							onClick={toggleDetails}
							className="mt-3 text-xs text-[#98ff98] hover:underline"
						>
							Close Details
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
	if (!project) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.9, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.9, y: 20 }}
				transition={{ type: "spring", damping: 25, stiffness: 300 }}
				className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header with gradient */}
				<div className="relative h-48 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-[#98ff98]/30 to-[#4ade80]/30" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-8xl font-bold text-white/20">
							{project.title
								.split(" ")
								.map((word) => word[0])
								.join("")}
						</div>
					</div>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div
					className="p-6 overflow-y-auto custom-scrollbar"
					style={{ maxHeight: "calc(90vh - 12rem)" }}
				>
					<div className="space-y-6">
						{/* Project Title and Links */}
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<h2 className="text-3xl font-bold text-white">{project.title}</h2>
							<div className="flex gap-3">
								{project.liveLink && (
									<a
										href={project.liveLink}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-[#98ff98] text-gray-900 rounded-lg font-medium hover:bg-[#7aff7a] transition-all duration-300 flex items-center gap-2"
									>
										<span>Live Demo</span>
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
									</a>
								)}
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
								>
									<span>GitHub</span>
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
								</a>
							</div>
						</div>

						{/* Project Description */}
						<div className="bg-white/5 rounded-xl p-6 border border-white/10">
							<h3 className="text-xl font-medium text-white mb-3">
								About this project
							</h3>
							<p className="text-gray-300 leading-relaxed">
								{project.description}
							</p>
						</div>

						{/* Project Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
								<div className="text-2xl font-bold text-white mb-1">
									{project.stars}
								</div>
								<div className="text-gray-400 text-sm">Stars</div>
							</div>
							<div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
								<div className="text-2xl font-bold text-white mb-1">
									{project.forks}
								</div>
								<div className="text-gray-400 text-sm">Forks</div>
							</div>
							<div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
								<div className="text-2xl font-bold text-white mb-1">
									{project.watchersCount || 0}
								</div>
								<div className="text-gray-400 text-sm">Watchers</div>
							</div>
							<div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
								<div className="text-2xl font-bold text-white mb-1">
									{project.openIssues || 0}
								</div>
								<div className="text-gray-400 text-sm">Open Issues</div>
							</div>
						</div>

						{/* Technologies */}
						<div className="bg-white/5 rounded-xl p-6 border border-white/10">
							<h3 className="text-xl font-medium text-white mb-3">
								Technologies
							</h3>
							<div className="flex flex-wrap gap-2">
								{project.technologies.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1.5 bg-white/10 text-white/90 rounded-lg border border-white/5"
									>
										{tech}
									</span>
								))}
							</div>
						</div>

						{/* README Preview */}
						{project.readmeContent && (
							<div className="bg-white/5 rounded-xl p-6 border border-white/10">
								<h3 className="text-xl font-medium text-white mb-3">README</h3>
								<div
									className="bg-black/30 p-4 rounded-lg text-gray-300 font-mono text-sm overflow-auto custom-scrollbar"
									style={{ maxHeight: "300px" }}
								>
									<pre className="whitespace-pre-wrap">
										{project.readmeContent}
									</pre>
								</div>
							</div>
						)}

						{/* Timeline */}
						<div className="bg-white/5 rounded-xl p-6 border border-white/10">
							<h3 className="text-xl font-medium text-white mb-3">Timeline</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-full bg-[#98ff98]/20 flex items-center justify-center flex-shrink-0 mt-1">
										<svg
											className="w-5 h-5 text-[#98ff98]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
									</div>
									<div>
										<h4 className="text-white font-medium">Created</h4>
										<p className="text-gray-400 text-sm">
											{new Date(project.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 rounded-full bg-[#98ff98]/20 flex items-center justify-center flex-shrink-0 mt-1">
										<svg
											className="w-5 h-5 text-[#98ff98]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
											/>
										</svg>
									</div>
									<div>
										<h4 className="text-white font-medium">Last Updated</h4>
										<p className="text-gray-400 text-sm">
											{new Date(project.updatedAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

// Projects component to display GitHub projects
const Projects = () => {
	// State for storing projects data and loading status
	const [projects, setProjects] = useState([]); // Array of GitHub projects
	const [loading, setLoading] = useState(true); // Loading state indicator
	const [filter, setFilter] = useState("all");
	const [selectedProject, setSelectedProject] = useState(null);
	const [view, setView] = useState("grid"); // "grid" or "carousel"
	const [categories, setCategories] = useState([]);
	const containerRef = useRef(null);
	const carouselRef = useRef(null);

	// Effect hook to fetch projects on component mount
	useEffect(() => {
		// Async function to load projects from GitHub
		const loadProjects = async () => {
			const githubProjects = await fetchGithubProjects(); // Fetch projects
			setProjects(githubProjects); // Update projects state

			// Extract unique categories from projects
			const allTechnologies = [
				...new Set(githubProjects.flatMap((project) => project.technologies)),
			].filter(Boolean);

			// Group technologies into categories
			const techCategories = {
				Frontend: [
					"React",
					"Vue",
					"Angular",
					"JavaScript",
					"TypeScript",
					"HTML",
					"CSS",
					"TailwindCSS",
					"Bootstrap",
				],
				Backend: [
					"Node.js",
					"Express",
					"Django",
					"Flask",
					"PHP",
					"Laravel",
					"Spring",
					"ASP.NET",
				],
				Database: [
					"MongoDB",
					"MySQL",
					"PostgreSQL",
					"SQLite",
					"Firebase",
					"Supabase",
				],
				Mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
				DevOps: [
					"Docker",
					"Kubernetes",
					"AWS",
					"Azure",
					"GCP",
					"CI/CD",
					"GitHub Actions",
				],
				Other: [],
			};

			// Create category objects
			const categoryObjects = Object.entries(techCategories)
				.map(([name, techs]) => ({
					name,
					technologies: techs.filter((tech) => allTechnologies.includes(tech)),
					count: techs.filter((tech) => allTechnologies.includes(tech)).length,
				}))
				.filter((cat) => cat.count > 0);

			// Add "Other" category for uncategorized technologies
			const categorizedTechs = Object.values(techCategories).flat();
			const otherTechs = allTechnologies.filter(
				(tech) => !categorizedTechs.includes(tech)
			);

			if (otherTechs.length > 0) {
				categoryObjects.push({
					name: "Other",
					technologies: otherTechs,
					count: otherTechs.length,
				});
			}

			setCategories(categoryObjects);
			setLoading(false); // Set loading to false when done
		};

		loadProjects(); // Call the load function
	}, []); // Empty dependency array means this runs once on mount

	// Handle project selection
	const handleProjectClick = (project) => {
		setSelectedProject(selectedProject?.id === project.id ? null : project);
	};

	// Close modal
	const closeModal = () => {
		setSelectedProject(null);
	};

	// Filter projects based on selected filter
	const filteredProjects = projects.filter((project) => {
		if (filter === "all") return true;
		if (filter === "featured") return project.stars > 0 || project.forks > 0;

		// Check if filter is a category
		const category = categories.find((cat) => cat.name === filter);
		if (category) {
			return project.technologies.some((tech) =>
				category.technologies.includes(tech)
			);
		}

		// Otherwise filter is a specific technology
		return project.technologies.includes(filter);
	});

	// Get featured projects (most stars or recent updates)
	const featuredProjects = [...projects]
		.sort((a, b) => b.stars + b.forks - (a.stars + a.forks))
		.slice(0, 3);

	// Get unique technologies for filtering
	const uniqueTechnologies = [
		...new Set(projects.flatMap((project) => project.technologies)),
	].filter(Boolean);

	// Handle carousel navigation
	const scrollCarousel = (direction) => {
		if (!carouselRef.current) return;

		const scrollAmount =
			direction === "left"
				? -carouselRef.current.offsetWidth * 0.8
				: carouselRef.current.offsetWidth * 0.8;

		carouselRef.current.scrollBy({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

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
						className="w-16 h-16 border-4 border-[#98ff98] border-t-transparent mx-auto rounded-full"
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
			id="projects"
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
				<div className="space-y-16">
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
							className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
						>
							Featured Projects
						</motion.h2>
						<motion.div
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98]/50 to-[#4ade80]/50 mx-auto mb-8 rounded-full"
						/>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="max-w-2xl mx-auto text-gray-400 text-lg"
						>
							Explore my latest projects and open-source contributions. Each
							project represents my passion for creating elegant solutions to
							complex problems.
						</motion.p>
					</div>

					{/* Featured Project Showcase */}
					<div className="relative">
						<div className="flex justify-between items-center mb-8">
							<h3 className="text-2xl font-bold text-white">
								Spotlight Projects
							</h3>
							<div className="flex space-x-2">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => scrollCarousel("left")}
									className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 19l-7-7 7-7"
										/>
									</svg>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => scrollCarousel("right")}
									className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</motion.button>
							</div>
						</div>

						<div
							ref={carouselRef}
							className="overflow-x-auto pb-4 hide-scrollbar flex space-x-6 snap-x snap-mandatory"
							style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
						>
							{featuredProjects.map((project, index) => (
								<div
									key={project.id}
									className="snap-start min-w-[300px] md:min-w-[400px] flex-shrink-0"
								>
									<ProjectCard
										project={project}
										index={index}
										isSelected={selectedProject?.id === project.id}
										onClick={handleProjectClick}
									/>
								</div>
							))}
						</div>
					</div>

					{/* View Toggle and Filters */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
						<div className="flex items-center space-x-4">
							<h3 className="text-xl font-bold text-white">All Projects</h3>
							<div className="flex p-1 bg-white/10 rounded-lg">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setView("grid")}
									className={`p-2 rounded ${
										view === "grid"
											? "bg-[#98ff98] text-gray-900"
											: "text-white"
									}`}
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
										/>
									</svg>
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setView("list")}
									className={`p-2 rounded ${
										view === "list"
											? "bg-[#98ff98] text-gray-900"
											: "text-white"
									}`}
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</motion.button>
							</div>
						</div>

						<div className="w-full md:w-auto">
							<div className="relative">
								<input
									type="text"
									placeholder="Search projects..."
									className="w-full md:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#98ff98]/50"
								/>
								<div className="absolute right-3 top-2.5 text-white/50">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Category Filters */}
					<div className="space-y-6">
						<div className="flex flex-wrap gap-3">
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setFilter("all")}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
									filter === "all"
										? "bg-[#98ff98] text-gray-900"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
							>
								All Projects
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setFilter("featured")}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
									filter === "featured"
										? "bg-[#98ff98] text-gray-900"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
							>
								Featured
							</motion.button>

							{/* Category buttons */}
							{categories.map((category) => (
								<motion.button
									key={category.name}
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setFilter(category.name)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
										filter === category.name
											? "bg-[#98ff98] text-gray-900"
											: "bg-white/10 text-white hover:bg-white/20"
									}`}
								>
									{category.name} ({category.count})
								</motion.button>
							))}
						</div>

						{/* Technology tags (only show if a category is selected) */}
						{categories.find((cat) => cat.name === filter) && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="flex flex-wrap gap-2"
							>
								{categories
									.find((cat) => cat.name === filter)
									.technologies.map((tech) => (
										<motion.button
											key={tech}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => setFilter(tech)}
											className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
												filter === tech
													? "bg-[#98ff98] text-gray-900"
													: "bg-white/5 text-white/80 hover:bg-white/10"
											}`}
										>
											{tech}
										</motion.button>
									))}
							</motion.div>
						)}
					</div>

					{/* Projects Grid/List */}
					<AnimatePresence mode="wait">
						{view === "grid" ? (
							<motion.div
								key="grid"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								layout
								className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
							>
								{filteredProjects.map((project, index) => (
									<ProjectCard
										key={project.id}
										project={project}
										index={index}
										isSelected={selectedProject?.id === project.id}
										onClick={handleProjectClick}
									/>
								))}
							</motion.div>
						) : (
							<motion.div
								key="list"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="space-y-4"
							>
								{filteredProjects.map((project, index) => (
									<motion.div
										key={project.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className={`flex flex-col md:flex-row gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all ${
											selectedProject?.id === project.id
												? "ring-2 ring-[#98ff98]"
												: ""
										}`}
										onClick={() => handleProjectClick(project)}
									>
										<div className="w-full md:w-48 h-32 bg-gradient-to-br from-[#98ff98]/20 to-[#4ade80]/20 rounded-lg flex items-center justify-center">
											<div className="text-4xl font-bold text-white/30">
												{project.title
													.split(" ")
													.map((word) => word[0])
													.join("")}
											</div>
										</div>
										<div className="flex-1 space-y-3">
											<h3 className="text-xl font-bold text-white">
												{project.title}
											</h3>
											<p className="text-gray-400 text-sm">
												{project.description}
											</p>
											<div className="flex flex-wrap gap-2">
												{project.technologies.slice(0, 5).map((tech) => (
													<span
														key={tech}
														className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-full"
													>
														{tech}
													</span>
												))}
												{project.technologies.length > 5 && (
													<span className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-full">
														+{project.technologies.length - 5}
													</span>
												)}
											</div>
										</div>
										<div className="flex md:flex-col justify-end gap-3 mt-4 md:mt-0">
											{project.liveLink && (
												<a
													href={project.liveLink}
													target="_blank"
													rel="noopener noreferrer"
													className="px-4 py-2 bg-[#98ff98] text-gray-900 rounded-lg font-medium text-center hover:bg-[#7aff7a] transition-all duration-300"
													onClick={(e) => e.stopPropagation()}
												>
													Live Demo
												</a>
											)}
											<a
												href={project.githubLink}
												target="_blank"
												rel="noopener noreferrer"
												className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-center hover:bg-white/20 transition-all duration-300"
												onClick={(e) => e.stopPropagation()}
											>
												GitHub
											</a>
										</div>
									</motion.div>
								))}
							</motion.div>
						)}
					</AnimatePresence>

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
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 }}
								onClick={() => setFilter("all")}
								className="mt-4 px-6 py-2 bg-[#98ff98] text-gray-900 rounded-lg font-medium hover:bg-[#7aff7a] transition-all duration-300"
							>
								View All Projects
							</motion.button>
						</motion.div>
					)}

					{/* Project Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
						>
							<h4 className="text-3xl font-bold text-white mb-2">
								{projects.length}
							</h4>
							<p className="text-gray-400">Total Projects</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
						>
							<h4 className="text-3xl font-bold text-white mb-2">
								{projects.reduce((sum, project) => sum + project.stars, 0)}
							</h4>
							<p className="text-gray-400">GitHub Stars</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
						>
							<h4 className="text-3xl font-bold text-white mb-2">
								{uniqueTechnologies.length}
							</h4>
							<p className="text-gray-400">Technologies</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
						>
							<h4 className="text-3xl font-bold text-white mb-2">
								{projects.reduce((sum, project) => sum + project.forks, 0)}
							</h4>
							<p className="text-gray-400">Forks</p>
						</motion.div>
					</div>

					{/* Call to Action */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-gradient-to-r from-[#98ff98]/20 to-[#4ade80]/20 backdrop-blur-sm rounded-2xl p-8 text-center border border-[#98ff98]/30 mt-16"
					>
						<h3 className="text-2xl font-bold text-white mb-4">
							Interested in collaborating?
						</h3>
						<p className="text-gray-300 mb-6 max-w-2xl mx-auto">
							I'm always open to discussing new projects, creative ideas or
							opportunities to be part of your vision.
						</p>
						<motion.a
							href="#contact"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-block px-8 py-3 bg-[#98ff98] text-gray-900 rounded-lg font-medium hover:bg-[#7aff7a] transition-all duration-300 shadow-lg hover:shadow-[#98ff98]/20"
							onClick={() => window.scrollToSection("contact")}
						>
							Let's Connect
						</motion.a>
					</motion.div>
				</div>
			</div>

			{/* Project Modal */}
			<AnimatePresence>
				{selectedProject && (
					<ProjectModal project={selectedProject} onClose={closeModal} />
				)}
			</AnimatePresence>
		</div>
	);
};

export default Projects;
