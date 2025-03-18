// Import required dependencies from framer-motion for animations and React for refs
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import FlowingMenu from "./FlowingMenu";
import ScrollVelocity from "./ScrollVelocity";
import Lightning from "./Lightning";

// Floating Element Component
const FloatingElement = ({
	children,
	xOffset = 0,
	yOffset = 50,
	delay = 0,
	className,
}) => {
	const elementRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: elementRef,
		offset: ["start end", "end start"],
	});

	// Create smooth transformations based on scroll position
	const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);
	const x = useTransform(scrollYProgress, [0, 1], [xOffset, -xOffset]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 0.98]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, xOffset * 0.03]);

	// Apply spring physics for smoother motion
	const springY = useSpring(y, { stiffness: 80, damping: 25 });
	const springX = useSpring(x, { stiffness: 80, damping: 25 });
	const springRotate = useSpring(rotate, { stiffness: 80, damping: 25 });
	const springScale = useSpring(scale, { stiffness: 80, damping: 25 });

	return (
		<motion.div
			ref={elementRef}
			style={{
				y: springY,
				x: springX,
				rotate: springRotate,
				scale: springScale,
				willChange: "transform",
			}}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.6, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

// Parallax Background Element
const ParallaxBackground = ({ speed = 0.2, className }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, 500 * speed]);

	return (
		<motion.div
			ref={ref}
			style={{ y, willChange: "transform" }}
			className={`absolute pointer-events-none ${className}`}
		/>
	);
};

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
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
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				transform: isHovered
					? `
              perspective(1000px)
              rotateX(${(mousePosition.y - 0.5) * 10}deg)
              rotateY(${(mousePosition.x - 0.5) * -10}deg)
              translateZ(15px)
              scale(1.01)
            `
					: "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
				transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
				willChange: "transform",
			}}
			className={className}
			whileHover={{ boxShadow: "0 10px 30px rgba(79, 70, 229, 0.15)" }}
		>
			{children}
			{isHovered && (
				<div
					className="absolute inset-0 pointer-events-none rounded-xl"
					style={{
						background: `
              radial-gradient(
                circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                rgba(79, 70, 229, 0.15) 0%,
                transparent 60%
              )
            `,
						zIndex: 1,
					}}
				/>
			)}
		</motion.div>
	);
};

// Animated Skill Bar Component
const SkillBar = ({
	name,
	level,
	icon,
	projects,
	description,
	delay = 0,
	isSelected,
}) => {
	const barRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: barRef,
		offset: ["start end", "end center"],
	});

	const scaleX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, level / 100]),
		{
			stiffness: 70,
			damping: 20,
		}
	);

	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			ref={barRef}
			initial={{ opacity: 0, y: 15 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, delay }}
			className={`mb-8 ${
				isSelected ? "scale-105 transition-all duration-300" : ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ willChange: isHovered ? "transform, opacity" : "auto" }}
		>
			<div
				className={`flex justify-between items-center mb-2 ${
					isSelected
						? "bg-green-50 p-2 rounded-lg border border-green-200 shadow-lg shadow-green-100"
						: ""
				}`}
			>
				<div className="flex items-center">
					<motion.div
						className="text-xl mr-2 p-2 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100"
						animate={{
							scale: isHovered || isSelected ? [1, 1.1, 1] : 1,
							rotate: isHovered || isSelected ? [0, 5, 0] : 0,
						}}
						transition={{ duration: 0.5 }}
						style={{ willChange: isHovered ? "transform" : "auto" }}
					>
						{icon}
					</motion.div>
					<span
						className={`font-medium ${
							isSelected ? "text-green-600" : "text-gray-700"
						} text-lg transition-colors duration-300`}
					>
						{name}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<span className="text-green-600 font-bold">{level}%</span>
					<span className="text-gray-600 text-sm bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
						{projects} projects
					</span>
				</div>
			</div>

			<div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
				<motion.div
					className={`h-full bg-gradient-to-r ${
						isSelected
							? "from-green-500 to-green-400 shadow-lg shadow-green-100"
							: "from-green-400 to-green-300"
					}`}
					style={{ scaleX, transformOrigin: "left", willChange: "transform" }}
				/>
			</div>

			<motion.div
				className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200"
				initial={{ height: 0, opacity: 0 }}
				animate={{
					height: isHovered || isSelected ? "auto" : 0,
					opacity: isHovered || isSelected ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
				style={{ willChange: isHovered ? "height, opacity" : "auto" }}
			>
				{description}
			</motion.div>
		</motion.div>
	);
};

const Skills = () => {
	const [activeCategory, setActiveCategory] = useState("all");
	const containerRef = useRef(null);
	const [selectedSkill, setSelectedSkill] = useState(null);
	const { scrollYProgress } = useScroll();

	// Create scroll-driven animations
	const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const backgroundOpacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.8, 1],
		[1, 0.8, 0.8, 0.6]
	);

	// Update color schemes for light theme
	const skillCategories = {
		"Frontend Development": {
			icon: "🎨",
			color: "from-blue-50 to-blue-100",
			borderColor: "border-blue-200",
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
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
				},
				{
					name: "JavaScript",
					level: 85,
					icon: "📜",
					projects: 20,
					description:
						"ES6+, async programming, and modern JavaScript features",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
				},
				{
					name: "HTML5 & CSS3",
					level: 95,
					icon: "🎨",
					projects: 25,
					description:
						"Semantic markup and modern CSS techniques including Flexbox and Grid",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png",
				},
				{
					name: "Tailwind CSS",
					level: 88,
					icon: "🌊",
					projects: 12,
					description: "Utility-first CSS framework for rapid UI development",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
				},
				{
					name: "Responsive Design",
					level: 92,
					icon: "📱",
					projects: 18,
					description: "Mobile-first approach and cross-device compatibility",
					image: "https://cdn-icons-png.flaticon.com/512/6347/6347307.png",
				},
			],
		},
		"Backend Development": {
			icon: "⚙️",
			color: "from-purple-50 to-purple-100",
			borderColor: "border-purple-200",
			description: "Building robust and scalable server-side applications",
			skills: [
				{
					name: "Node.js",
					level: 85,
					icon: "🟢",
					projects: 10,
					description:
						"Server-side JavaScript with Express.js and RESTful APIs",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
				},
				{
					name: "MongoDB",
					level: 80,
					icon: "🍃",
					projects: 8,
					description: "NoSQL database design and optimization",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
				},
				{
					name: "API Development",
					level: 88,
					icon: "🔌",
					projects: 12,
					description: "RESTful and GraphQL API design and implementation",
					image:
						"https://cdn.liveapi.com/website/img/product-icons/128x128/rest-api.png",
				},
				{
					name: "Authentication",
					level: 85,
					icon: "🔐",
					projects: 10,
					description: "JWT, OAuth, and secure user authentication systems",
					image: "https://cdn-icons-png.flaticon.com/512/6911/6911466.png",
				},
			],
		},
		"Development Tools": {
			icon: "🛠",
			color: "from-green-50 to-green-100",
			borderColor: "border-green-200",
			description: "Mastering tools that enhance development workflow",
			skills: [
				{
					name: "Git & GitHub",
					level: 92,
					icon: "��",
					projects: 30,
					description: "Version control and collaborative development",
					image:
						"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
				},
				{
					name: "VS Code",
					level: 95,
					icon: "👨‍💻",
					projects: 40,
					description: "Advanced IDE usage and custom configurations",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png",
				},
				{
					name: "Webpack",
					level: 85,
					icon: "📦",
					projects: 15,
					description: "Module bundling and build optimization",
					image:
						"https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png",
				},
				{
					name: "DevTools",
					level: 90,
					icon: "🔧",
					projects: 35,
					description: "Browser debugging and performance optimization",
					image: "https://developer.chrome.com/images/meta/chromium-47x48.png",
				},
			],
		},
		"Soft Skills": {
			icon: "🤝",
			color: "from-amber-50 to-amber-100",
			borderColor: "border-amber-200",
			description: "Essential non-technical skills for successful development",
			skills: [
				{
					name: "Problem Solving",
					level: 95,
					icon: "🧩",
					projects: 50,
					description: "Analytical thinking and creative solution development",
					image: "https://cdn-icons-png.flaticon.com/512/1077/1077198.png",
				},
				{
					name: "Communication",
					level: 90,
					icon: "💬",
					projects: 40,
					description: "Clear and effective technical communication",
					image: "https://cdn-icons-png.flaticon.com/512/745/745205.png",
				},
				{
					name: "Team Work",
					level: 88,
					icon: "👥",
					projects: 25,
					description: "Collaborative development and peer programming",
					image: "https://cdn-icons-png.flaticon.com/512/5188/5188421.png",
				},
				{
					name: "Time Management",
					level: 85,
					icon: "⏰",
					projects: 30,
					description: "Project planning and deadline management",
					image: "https://cdn-icons-png.flaticon.com/512/2972/2972531.png",
				},
			],
		},
	};

	// Handle skill click
	const handleSkillClick = (skillName) => {
		setSelectedSkill(skillName === selectedSkill ? null : skillName);
	};

	return (
		<section
			id="skills"
			className="relative min-h-screen py-20 overflow-hidden section-bg"
		>
			{/* Lightning Effect */}
			<div
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 0,
				}}
			>
				<Lightning
					hue={180}
					xOffset={0.2}
					speed={0.8}
					intensity={0.9}
					size={1.2}
				/>
			</div>

			<div className="bg-accent-1"></div>
			<div className="bg-accent-2"></div>

			<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				{/* Section Title */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Technical <span className="text-indigo-400">Skills</span>
					</h2>
					<div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
					<p className="text-neutral-300 mt-6 max-w-2xl mx-auto">
						A comprehensive overview of my technical expertise and proficiency
						levels.
					</p>
				</motion.div>

				<div className="space-y-24">
					{/* Light theme section header */}
					<div className="text-center">
						<FloatingElement yOffset={20} delay={0.1}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-50 to-green-100 rounded-full text-sm text-green-600 font-medium mb-4 border border-green-200 shadow-md"
							>
								WHAT I CAN DO
							</motion.div>
						</FloatingElement>

						<FloatingElement yOffset={15} delay={0.2}>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-4"
							>
								Skills & Expertise
							</motion.h2>
						</FloatingElement>

						<FloatingElement yOffset={10} delay={0.3}>
							<motion.div
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-green-300 mx-auto mb-8 rounded-full shadow-md"
								style={{ willChange: "transform, opacity" }}
							/>
						</FloatingElement>
					</div>

					{/* Light theme category navigation */}
					<FloatingElement yOffset={10} xOffset={5}>
						<div className="relative flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16">
							<div className="absolute inset-0 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 blur-xl rounded-full -z-10"></div>
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveCategory("all")}
								className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
									activeCategory === "all"
										? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md"
										: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-300"
								}`}
								style={{ willChange: "transform" }}
							>
								All Skills
							</motion.button>
							{Object.keys(skillCategories).map((category, index) => (
								<motion.button
									key={category}
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveCategory(category)}
									className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
										activeCategory === category
											? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md"
											: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-300"
									}`}
									style={{ willChange: "transform" }}
								>
									<span className="mr-2">{skillCategories[category].icon}</span>
									{category}
								</motion.button>
							))}
						</div>
					</FloatingElement>

					{/* Light theme skills grid */}
					<div className="grid gap-6 md:gap-12">
						{(activeCategory === "all"
							? Object.entries(skillCategories)
							: [[activeCategory, skillCategories[activeCategory]]]
						).map(
							(
								[category, { icon, color, borderColor, description, skills }],
								categoryIndex
							) => (
								<FloatingElement
									key={category}
									yOffset={20}
									xOffset={categoryIndex % 2 === 0 ? 8 : -8}
									delay={categoryIndex * 0.08}
								>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
										className="relative"
										style={{ willChange: "transform, opacity" }}
									>
										<div className="relative">
											{/* Light theme category header card */}
											<TiltCard
												className={`p-5 md:p-7 rounded-xl bg-gradient-to-br ${color} backdrop-blur-sm border ${borderColor} hover:border-green-300 transition-all duration-300 mb-6 md:mb-10 shadow-md group`}
											>
												<div className="flex items-center gap-3 md:gap-5">
													<motion.div
														className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white/60 text-3xl md:text-4xl shadow-md group-hover:bg-white/80 transition-colors duration-300"
														animate={{
															rotate: [0, 3, -3, 0],
															scale: [1, 1.03, 1],
														}}
														transition={{
															duration: 4,
															repeat: Infinity,
															repeatType: "reverse",
														}}
														style={{ willChange: "transform" }}
													>
														{icon}
													</motion.div>
													<div>
														<h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-green-800 transition-all duration-300">
															{category}
														</h3>
														<p className="text-sm md:text-base text-gray-600 mt-1 group-hover:text-gray-800 transition-color duration-300">
															{description}
														</p>
													</div>
													<motion.div
														className="ml-auto p-1.5 rounded-full bg-white/60 border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
														animate={{
															scale: [1, 1.08, 1],
														}}
														transition={{
															duration: 2,
															repeat: Infinity,
															repeatType: "reverse",
														}}
														style={{ willChange: "transform" }}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="w-5 h-5 text-green-600"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
															/>
														</svg>
													</motion.div>
												</div>
											</TiltCard>

											{/* Light theme FlowingMenu container */}
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5 }}
												className={`relative bg-gradient-to-br ${color} backdrop-blur-sm rounded-xl p-5 md:p-7 border ${borderColor} shadow-md`}
												style={{ willChange: "transform, opacity" }}
											>
												<div className="text-gray-700 text-lg md:text-xl font-semibold mb-6 md:mb-8 text-center bg-white/60 py-2 px-4 rounded-lg backdrop-blur-sm border border-gray-200">
													<span className="text-green-600">Skills</span> in{" "}
													{category}
												</div>
												<div
													style={{
														height: skills.length * 70 + "px",
														position: "relative",
													}}
													className="rounded-lg overflow-hidden"
												>
													<FlowingMenu
														items={skills.map((skill) => ({
															text: skill.name,
															icon: skill.icon,
															description: `${skill.description} (${skill.projects} projects)`,
															image: skill.image,
														}))}
														onItemClick={handleSkillClick}
													/>
												</div>
											</motion.div>
										</div>
									</motion.div>
								</FloatingElement>
							)
						)}
					</div>
				</div>
			</div>

			{/* Tech Stack Showcase - Scrolling */}
			<div className="relative mt-20 overflow-hidden">
				{/* Line 1 */}
				<ScrollVelocity
					texts={[
						"React ⚛️ Node.js 🟢 MongoDB 🍃 JavaScript 📜 TypeScript 🔷 HTML5 📝 CSS3 🎨 Git 📚",
					]}
					velocity={40}
					className="text-gray-700 font-semibold"
					numCopies={3}
					velocityMapping={{ input: [0, 1000], output: [0, 2] }}
				/>

				{/* Line 2 */}
				<div className="-mt-11">
					<ScrollVelocity
						texts={[
							"Redux 🔄 GraphQL 📊 Tailwind CSS 🌊 Firebase 🔥 Docker 🐋 AWS ☁️ Next.js ▲ Express 🚂",
						]}
						velocity={-30}
						className="text-gray-700 font-semibold"
						numCopies={3}
						velocityMapping={{ input: [0, 1000], output: [0, 2] }}
					/>
				</div>

				{/* Line 3 */}
				<div className="-mt-11">
					<ScrollVelocity
						texts={[
							"PostgreSQL 🐘 REST API 🔄 SASS 💅 Jest 🧪 Webpack 📦 Figma 🎨 Authentication 🔐",
						]}
						velocity={40}
						className="text-gray-700 font-semibold"
						numCopies={3}
						velocityMapping={{ input: [0, 1000], output: [0, 2] }}
					/>
				</div>
			</div>
		</section>
	);
};

export default Skills;
