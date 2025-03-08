// Import required dependencies from framer-motion for animations and React for refs
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";

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

// Falling Text Animation Component
const FallingTextAnimation = () => {
	const containerRef = useRef(null);
	const [texts, setTexts] = useState([]);

	// Programming terms, languages, and technologies
	const programmingTerms = [
		"React",
		"JavaScript",
		"HTML",
		"CSS",
		"Node.js",
		"MongoDB",
		"Express",
		"API",
		"Redux",
		"TypeScript",
		"Git",
		"GitHub",
		"Webpack",
		"Tailwind",
		"REST",
		"GraphQL",
		"JSON",
		"AJAX",
		"Frontend",
		"Backend",
		"Fullstack",
		"UI/UX",
		"Responsive",
		"Component",
		"Function",
		"Hook",
		"State",
		"Props",
		"Effect",
		"Async",
		"Promise",
		"Database",
		"Server",
		"Client",
		"Deploy",
		"Algorithm",
		"Data Structure",
		"Authentication",
		"Authorization",
		"API",
		"Framework",
		"Library",
		"Debugging",
		"Testing",
		"Performance",
	];

	useEffect(() => {
		if (!containerRef.current) return;

		// Get container dimensions
		const updateDimensions = () => {
			const { width, height } = containerRef.current.getBoundingClientRect();

			// Create initial falling texts
			const initialTexts = Array.from({ length: 25 }, (_, i) =>
				createText(width, height, i * -800)
			);
			setTexts(initialTexts);
		};

		// Create a new falling text object
		const createText = (width, height, startY = -100) => {
			return {
				id: Math.random().toString(36).substr(2, 9),
				text: programmingTerms[
					Math.floor(Math.random() * programmingTerms.length)
				],
				x: Math.random() * width,
				y: startY,
				size: Math.random() * 14 + 10, // Font size between 10px and 24px
				speed: Math.random() * 1 + 0.5, // Speed between 0.5 and 1.5
				opacity: Math.random() * 0.3 + 0.1, // Opacity between 0.1 and 0.4
				rotation: Math.random() * 360, // Random rotation
			};
		};

		window.addEventListener("resize", updateDimensions);
		updateDimensions();

		// Animation loop
		let animationFrameId;
		let lastTime = 0;

		const animate = (timestamp) => {
			if (!containerRef.current) return;

			const { width, height } = containerRef.current.getBoundingClientRect();
			const deltaTime = timestamp - lastTime;
			lastTime = timestamp;

			if (deltaTime > 0) {
				setTexts((prevTexts) => {
					return prevTexts.map((text) => {
						// Move text downward
						const y = text.y + text.speed * (deltaTime / 16);

						// If text is out of view, reset it to the top with new properties
						if (y > height + 100) {
							return createText(width, height);
						}

						return { ...text, y };
					});
				});
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("resize", updateDimensions);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 overflow-hidden pointer-events-none z-0"
			aria-hidden="true"
		>
			{texts.map(({ id, text, x, y, size, opacity, rotation }) => (
				<div
					key={id}
					className="absolute font-mono whitespace-nowrap"
					style={{
						left: `${x}px`,
						top: `${y}px`,
						fontSize: `${size}px`,
						opacity,
						color: "rgba(152, 255, 152, " + opacity + ")",
						transform: `rotate(${rotation}deg)`,
						textShadow: "0 0 5px rgba(152, 255, 152, 0.3)",
						willChange: "transform",
					}}
				>
					{text}
				</div>
			))}
		</div>
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
const SkillBar = ({ name, level, icon, projects, description, delay = 0 }) => {
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
			className="mb-8"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex justify-between items-center mb-2">
				<div className="flex items-center">
					<motion.span
						className="text-xl mr-2"
						animate={{
							scale: isHovered ? [1, 1.2, 1] : 1,
							rotate: isHovered ? [0, 5, -5, 0] : 0,
						}}
						transition={{ duration: 0.5 }}
					>
						{icon}
					</motion.span>
					<span className="text-white font-medium">{name}</span>
				</div>
				<div className="flex items-center space-x-2">
					<span className="text-[#98ff98] font-bold">{level}%</span>
					<span className="text-gray-400 text-sm">({projects} projects)</span>
				</div>
			</div>

			<div className="h-2 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-gradient-to-r from-[#98ff98]/80 to-[#4ade80]/80"
					style={{ scaleX, transformOrigin: "left" }}
				/>
			</div>

			<motion.div
				className="mt-2 text-sm text-gray-400"
				initial={{ height: 0, opacity: 0 }}
				animate={{
					height: isHovered ? "auto" : 0,
					opacity: isHovered ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
			>
				{description}
			</motion.div>
		</motion.div>
	);
};

// Particle Animation Component
const ParticleBackground = ({ category }) => {
	const canvasRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		const particles = [];
		const particleCount = 30;

		const resizeCanvas = () => {
			const parent = canvas.parentElement;
			if (!parent) return;

			const { width, height } = parent.getBoundingClientRect();
			canvas.width = width;
			canvas.height = height;
			setDimensions({ width, height });
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		// Get color based on category
		const getColor = () => {
			switch (category) {
				case "Frontend Development":
					return "rgba(59, 130, 246, 0.5)"; // blue
				case "Backend Development":
					return "rgba(168, 85, 247, 0.5)"; // purple
				case "Development Tools":
					return "rgba(34, 197, 94, 0.5)"; // green
				case "Soft Skills":
					return "rgba(234, 179, 8, 0.5)"; // yellow
				default:
					return "rgba(152, 255, 152, 0.5)"; // default green
			}
		};

		class Particle {
			constructor() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.size = Math.random() * 3 + 1;
				this.speedX = Math.random() * 1 - 0.5;
				this.speedY = Math.random() * 1 - 0.5;
				this.color = getColor();
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
				if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
			}

			draw() {
				ctx.fillStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		const init = () => {
			for (let i = 0; i < particleCount; i++) {
				particles.push(new Particle());
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < particles.length; i++) {
				particles[i].update();
				particles[i].draw();
			}

			requestAnimationFrame(animate);
		};

		init();
		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [category]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 pointer-events-none z-0"
		/>
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

				{/* Add Falling Text Animation */}
				<FallingTextAnimation />
			</motion.div>

			{/* Floating background elements */}
			<ParallaxBackground
				speed={-0.2}
				className="top-1/4 -left-20 w-64 h-64 rounded-full bg-[#98ff98]/5 blur-3xl"
			/>
			<ParallaxBackground
				speed={0.3}
				className="bottom-1/4 -right-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
			/>
			<ParallaxBackground
				speed={0.15}
				className="top-3/4 left-1/3 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl"
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
								className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#98ff98]/20 to-[#4ade80]/20 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium mb-4 border border-[#98ff98]/30"
							>
								WHAT I CAN DO
							</motion.div>
						</FloatingElement>

						<FloatingElement yOffset={15} delay={0.2}>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-6xl font-bold tracking-tight text-white mb-4"
							>
								Skills & Expertise
							</motion.h2>
						</FloatingElement>

						<FloatingElement yOffset={10} delay={0.3}>
							<motion.div
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98]/50 to-[#4ade80]/50 mx-auto mb-8 rounded-full"
							/>
						</FloatingElement>
					</div>

					{/* Category Navigation */}
					<FloatingElement yOffset={10} xOffset={5}>
						<div className="flex flex-wrap justify-center gap-4 mb-16">
							<motion.button
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveCategory("all")}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									activeCategory === "all"
										? "bg-[#98ff98] text-gray-900"
										: "bg-white/10 text-white hover:bg-white/20"
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
									className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
										activeCategory === category
											? "bg-[#98ff98] text-gray-900"
											: "bg-white/10 text-white hover:bg-white/20"
									}`}
								>
									{category}
								</motion.button>
							))}
						</div>
					</FloatingElement>

					{/* Skills Grid */}
					<div className="grid gap-12">
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
											<ParticleBackground category={category} />

											<TiltCard
												className={`p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-sm border ${borderColor} hover:border-[#98ff98]/30 transition-all duration-300 mb-8`}
											>
												<div className="flex items-center gap-4">
													<motion.div
														className="text-4xl"
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
														<h3 className="text-2xl font-bold text-white">
															{category}
														</h3>
														<p className="text-gray-300 mt-1">{description}</p>
													</div>
												</div>
											</TiltCard>

											<div className="space-y-2">
												{skills.map((skill, index) => (
													<SkillBar
														key={skill.name}
														{...skill}
														delay={index * 0.1}
													/>
												))}
											</div>
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
