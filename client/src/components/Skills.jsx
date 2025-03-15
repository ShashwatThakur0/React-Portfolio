// Import required dependencies from framer-motion for animations and React for refs
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import FlowingMenu from "./FlowingMenu";

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
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, xOffset * 0.05]);

	// Apply spring physics for smoother motion
	const springY = useSpring(y, { stiffness: 100, damping: 30 });
	const springX = useSpring(x, { stiffness: 100, damping: 30 });
	const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
	const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

	return (
		<motion.div
			ref={elementRef}
			style={{
				y: springY,
				x: springX,
				rotate: springRotate,
				scale: springScale,
			}}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, margin: "-100px" }}
			transition={{ duration: 0.8, delay }}
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
			style={{ y }}
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
              translateZ(10px)
            `
					: "none",
				transition: "transform 0.3s ease",
			}}
			className={className}
		>
			{children}
			{isHovered && (
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: `
              radial-gradient(
                circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                rgba(152, 255, 152, 0.15) 0%,
                transparent 50%
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
			stiffness: 100,
			damping: 30,
		}
	);

	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			ref={barRef}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
			className={`mb-8 ${
				isSelected ? "scale-105 transition-all duration-300" : ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`flex justify-between items-center mb-2 ${
					isSelected
						? "bg-[#98ff98]/10 p-2 rounded-lg border border-[#98ff98]/30"
						: ""
				}`}
			>
				<div className="flex items-center">
					<motion.span
						className="text-xl mr-2"
						animate={{
							scale: isHovered || isSelected ? [1, 1.2, 1] : 1,
							rotate: isHovered || isSelected ? [0, 5, -5, 0] : 0,
						}}
						transition={{ duration: 0.5 }}
					>
						{icon}
					</motion.span>
					<span
						className={`font-medium ${
							isSelected ? "text-[#98ff98]" : "text-white"
						}`}
					>
						{name}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<span className="text-[#98ff98] font-bold">{level}%</span>
					<span className="text-gray-400 text-sm">({projects} projects)</span>
				</div>
			</div>

			<div className="h-2 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					className={`h-full bg-gradient-to-r ${
						isSelected
							? "from-[#98ff98] to-[#4ade80]"
							: "from-[#98ff98]/80 to-[#4ade80]/80"
					}`}
					style={{ scaleX, transformOrigin: "left" }}
				/>
			</div>

			<motion.div
				className="mt-2 text-sm text-gray-400"
				initial={{ height: 0, opacity: 0 }}
				animate={{
					height: isHovered || isSelected ? "auto" : 0,
					opacity: isHovered || isSelected ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
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
					icon: "📚",
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
		<div
			ref={containerRef}
			className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-24 overflow-hidden"
		>
			{/* Animated background */}
			<motion.div
				className="absolute inset-0 overflow-hidden pointer-events-none"
				style={{ y: backgroundY, opacity: backgroundOpacity }}
			>
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
			</motion.div>

			{/* Floating background elements */}
			<ParallaxBackground
				speed={-0.2}
				className="top-1/4 -left-20 w-64 h-64 rounded-full bg-green-100 blur-3xl"
			/>
			<ParallaxBackground
				speed={0.3}
				className="bottom-1/4 -right-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl"
			/>
			<ParallaxBackground
				speed={0.15}
				className="top-3/4 left-1/3 w-40 h-40 rounded-full bg-purple-100 blur-3xl"
			/>

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-24">
					{/* Section Header */}
					<div className="text-center">
						<FloatingElement yOffset={20} delay={0.1}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-100 to-green-200 backdrop-blur-sm rounded-full text-sm text-gray-800 font-medium mb-4 border border-green-300"
							>
								WHAT I CAN DO
							</motion.div>
						</FloatingElement>

						<FloatingElement yOffset={15} delay={0.2}>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-4xl md:text-6xl font-bold tracking-tight text-gray-800 mb-4"
							>
								Skills & Expertise
							</motion.h2>
						</FloatingElement>

						<FloatingElement yOffset={10} delay={0.3}>
							<motion.div
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-green-300 mx-auto mb-8 rounded-full"
							/>
						</FloatingElement>
					</div>

					{/* Category Navigation */}
					<FloatingElement yOffset={10} xOffset={5}>
						<div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16">
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveCategory("all")}
								className={`px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
									activeCategory === "all"
										? "bg-green-500 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								All Skills
							</motion.button>
							{Object.keys(skillCategories).map((category, index) => (
								<motion.button
									key={category}
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveCategory(category)}
									className={`px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
										activeCategory === category
											? "bg-green-500 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{category}
								</motion.button>
							))}
						</div>
					</FloatingElement>

					{/* Skills FlowingMenus by Category */}
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
									yOffset={30}
									xOffset={categoryIndex % 2 === 0 ? 10 : -10}
									delay={categoryIndex * 0.1}
								>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
										className="relative"
									>
										<div className="relative">
											<TiltCard
												className={`p-4 md:p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-sm border ${borderColor} hover:border-green-400 transition-all duration-300 mb-4 md:mb-8`}
											>
												<div className="flex items-center gap-2 md:gap-4">
													<motion.div
														className="text-2xl md:text-4xl"
														animate={{
															rotate: [0, 10, -10, 0],
															scale: [1, 1.1, 1],
														}}
														transition={{
															duration: 3,
															repeat: Infinity,
															repeatType: "reverse",
														}}
													>
														{icon}
													</motion.div>
													<div>
														<h3 className="text-xl md:text-2xl font-bold text-gray-800">
															{category}
														</h3>
														<p className="text-sm md:text-base text-gray-600 mt-1">
															{description}
														</p>
													</div>
												</div>
											</TiltCard>

											{/* FlowingMenu for this category's skills */}
											<motion.div
												initial={{ opacity: 0, y: 30 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5 }}
												className={`relative bg-gradient-to-br ${color} backdrop-blur-sm rounded-xl p-4 md:p-6 border ${borderColor}`}
											>
												<div className="text-gray-800 text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
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
		</div>
	);
};

export default Skills;
