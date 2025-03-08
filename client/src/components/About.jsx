import {
	motion,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
	useInView,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

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
              rotateX(${(mousePosition.y - 0.5) * 15}deg)
              rotateY(${(mousePosition.x - 0.5) * -15}deg)
              translateZ(20px)
            `
					: "none",
				transition: "transform 0.3s ease",
			}}
			whileHover={{
				boxShadow: "0 10px 30px -15px rgba(152, 255, 152, 0.3)",
				borderColor: "rgba(152, 255, 152, 0.5)",
			}}
			className={className}
		>
			{children}
			{isHovered && (
				<>
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background: `
              radial-gradient(
                circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                rgba(152, 255, 152, 0.3) 0%,
                transparent 50%
              )
            `,
							zIndex: 1,
						}}
					/>
					<motion.div
						className="absolute inset-0 pointer-events-none border-2 rounded-2xl"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{
							borderColor: "rgba(152, 255, 152, 0.3)",
							boxShadow: "0 0 15px rgba(152, 255, 152, 0.3)",
						}}
					/>
				</>
			)}
		</motion.div>
	);
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
	const [count, setCount] = useState(0);
	const countRef = useRef(null);

	useEffect(() => {
		let startTime;
		let animationFrame;

		const updateCount = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
			setCount(Math.floor(progress * value));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(updateCount);
			}
		};

		animationFrame = requestAnimationFrame(updateCount);

		return () => cancelAnimationFrame(animationFrame);
	}, [value, duration]);

	return <span ref={countRef}>{count}</span>;
};

// Animated Progress Bar Component
const ProgressBar = ({ value, label, color }) => {
	const barRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: barRef,
		offset: ["start end", "end center"],
	});

	const scaleX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, value / 100]),
		{
			stiffness: 100,
			damping: 30,
		}
	);

	return (
		<div ref={barRef} className="mb-6">
			<div className="flex justify-between mb-2">
				<span className="text-white font-medium">{label}</span>
				<span className="text-gray-400">
					<AnimatedCounter value={value} />%
				</span>
			</div>
			<div className="h-2 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					className={`h-full ${color}`}
					style={{ scaleX, transformOrigin: "left" }}
				/>
			</div>
		</div>
	);
};

// Scroll Reveal Component
const ScrollReveal = ({
	children,
	delay = 0,
	direction = "up",
	className = "",
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	const variants = {
		hidden: {
			y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
			x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
			opacity: 0,
			scale: direction === "scale" ? 0.7 : 1,
			rotate: direction === "rotate" ? -5 : 0,
		},
		visible: {
			y: 0,
			x: 0,
			opacity: 1,
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				damping: 20,
				stiffness: 80,
				duration: 0.8,
				delay,
			},
		},
	};

	const debugClass = "";

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={variants}
			className={`${className} ${debugClass}`}
		>
			{children}
		</motion.div>
	);
};

const About = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll();
	const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

	// Parallax effect for background
	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

	// Add a rotation effect based on scroll
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

	// Add a scale effect based on scroll
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

	// 3D perspective effect
	const perspective = useTransform(scrollYProgress, [0, 1], [1000, 800]);
	const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

	// Section refs for scroll animations
	const profileRef = useRef(null);
	const timelineRef = useRef(null);
	const statsRef = useRef(null);
	const skillsRef = useRef(null);

	// Timeline scroll animation - simplified direct approach
	const timelineScrollRef = useRef(null);
	const { scrollYProgress: timelineProgress } = useScroll({
		target: timelineScrollRef,
		offset: ["start end", "end center"],
	});

	// Check if sections are in view
	const profileInView = useInView(profileRef, { once: true, amount: 0.1 });
	const timelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
	const statsInView = useInView(statsRef, { once: true, amount: 0.1 });
	const skillsInView = useInView(skillsRef, { once: true, amount: 0.1 });

	// Mouse position for interactive background
	const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: e.clientX / window.innerWidth,
				y: e.clientY / window.innerHeight,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Education and experience data
	const timeline = [
		{
			year: "2022 - Present",
			title: "Full Stack Developer",
			description:
				"Working on modern web applications using React, Node.js, and MongoDB.",
			type: "experience",
			icon: "💻",
			color: "from-blue-500/20 to-blue-600/20",
			borderColor: "border-blue-500/20",
			skills: ["React", "Node.js", "MongoDB", "Team Lead"],
		},
		{
			year: "2020 - 2022",
			title: "Frontend Developer",
			description:
				"Specialized in creating responsive and interactive user interfaces.",
			type: "experience",
			icon: "🎨",
			color: "from-purple-500/20 to-purple-600/20",
			borderColor: "border-purple-500/20",
			skills: ["HTML/CSS", "JavaScript", "UI/UX", "Responsive Design"],
		},
		{
			year: "2018 - 2020",
			title: "Bachelor's in Computer Science",
			description: "Focused on web technologies and software development.",
			type: "education",
			icon: "🎓",
			color: "from-green-500/20 to-green-600/20",
			borderColor: "border-green-500/20",
			skills: [
				"Algorithms",
				"Data Structures",
				"Software Engineering",
				"Web Dev",
			],
		},
	];

	// Professional skills data
	const skills = [
		{ name: "Frontend Development", level: 90, color: "bg-blue-500" },
		{ name: "Backend Development", level: 85, color: "bg-purple-500" },
		{ name: "UI/UX Design", level: 80, color: "bg-green-500" },
		{ name: "Database Management", level: 75, color: "bg-yellow-500" },
		{ name: "DevOps", level: 70, color: "bg-red-500" },
	];

	const stats = [
		{ value: 5, label: "Years Experience", icon: "⏱️" },
		{ value: 20, label: "Projects Completed", icon: "🚀" },
		{ value: 15, label: "Happy Clients", icon: "😊" },
		{ value: 3, label: "Awards", icon: "🏆" },
	];

	return (
		<motion.div
			ref={containerRef}
			style={{
				scale,
				opacity: opacity,
				perspective: perspective,
				rotateX: rotateX,
			}}
			className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-24 overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			{/* Animated background with parallax and interactive effects */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"
					style={{
						y: backgroundY,
						filter: "blur(1px)",
					}}
				/>
				<motion.div
					animate={{
						background: [
							"radial-gradient(circle at 0% 0%, rgba(152,255,152,0.3) 0%, transparent 50%)",
							"radial-gradient(circle at 100% 100%, rgba(152,255,152,0.3) 0%, transparent 50%)",
							"radial-gradient(circle at 0% 100%, rgba(152,255,152,0.3) 0%, transparent 50%)",
							"radial-gradient(circle at 100% 0%, rgba(152,255,152,0.3) 0%, transparent 50%)",
						],
					}}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute inset-0"
				/>

				{/* Interactive gradient that follows mouse */}
				<motion.div
					className="absolute inset-0"
					style={{
						background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
							mousePosition.y * 100
						}%, rgba(152, 255, 152, 0.15) 0%, transparent 40%)`,
						opacity: 0.8,
					}}
				/>

				{/* Floating particles with glow effect */}
				<div className="absolute inset-0">
					{[...Array(15)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								width: `${Math.random() * 10 + 5}px`,
								height: `${Math.random() * 10 + 5}px`,
								background: "rgba(152, 255, 152, 0.3)",
								boxShadow: "0 0 10px 2px rgba(152, 255, 152, 0.3)",
								filter: "blur(1px)",
							}}
							animate={{
								y: [0, -150, 0],
								x: [0, Math.random() * 100 - 50, 0],
								opacity: [0, 0.8, 0],
								scale: [0, 1, 0],
							}}
							transition={{
								duration: 8 + Math.random() * 7,
								repeat: Infinity,
								delay: i * 0.7,
							}}
						/>
					))}
				</div>
			</div>

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-24">
					{/* Section Header with staggered animation */}
					<div className="text-center">
						<ScrollReveal delay={0.1} direction="up">
							<div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#98ff98]/20 to-[#4ade80]/20 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium mb-4 border border-[#98ff98]/30">
								PROFESSIONAL PROFILE
							</div>
						</ScrollReveal>

						<ScrollReveal delay={0.2} direction="up">
							<motion.h2
								className="text-6xl font-bold tracking-tight text-white mb-4"
								whileHover={{
									textShadow: "0 0 15px rgba(152, 255, 152, 0.5)",
									color: "rgba(152, 255, 152, 1)",
									transition: { duration: 0.3 },
								}}
							>
								About Me
							</motion.h2>
						</ScrollReveal>

						<ScrollReveal delay={0.3} direction="scale">
							<motion.div
								className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98]/50 to-[#4ade80]/50 mx-auto mb-8 rounded-full"
								whileHover={{
									width: "150px",
									boxShadow: "0 0 10px rgba(152, 255, 152, 0.5)",
								}}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
							/>
						</ScrollReveal>
					</div>

					{/* Profile Content with scroll reveal */}
					<div ref={profileRef} className="max-w-4xl mx-auto">
						<ScrollReveal delay={0.1} direction="up">
							<div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#98ff98]/30 transition-all duration-500 shadow-xl">
								<div className="space-y-6">
									<ScrollReveal delay={0.2} direction="up">
										<p className="text-xl text-gray-300 leading-relaxed font-light relative">
											{/* Add a highlight animation */}
											{profileInView && (
												<motion.div
													className="absolute -inset-1 rounded-lg bg-[#98ff98]/5 -z-10"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ duration: 0.8, delay: 0.4 }}
												/>
											)}
											I'm a{" "}
											<motion.span
												className="text-white font-medium bg-[#98ff98]/10 px-2 py-0.5 rounded-md border border-[#98ff98]/30"
												whileHover={{
													backgroundColor: "rgba(152, 255, 152, 0.2)",
													scale: 1.05,
												}}
												// Add a special animation when in view
												animate={
													profileInView
														? {
																scale: [1, 1.1, 1],
																backgroundColor: [
																	"rgba(152, 255, 152, 0.1)",
																	"rgba(152, 255, 152, 0.3)",
																	"rgba(152, 255, 152, 0.1)",
																],
														  }
														: {}
												}
												transition={{
													duration: 2,
													delay: 0.6,
													repeat: 2,
													repeatType: "reverse",
												}}
											>
												passionate Full Stack Developer
											</motion.span>{" "}
											with a strong foundation in web technologies and a keen
											eye for creating user-friendly applications. With
											experience in both frontend and backend development, I
											enjoy bringing ideas to life through code.
										</p>
									</ScrollReveal>

									<ScrollReveal delay={0.3} direction="up">
										<p className="text-gray-400 leading-relaxed">
											My journey in software development began with a curiosity
											about how websites work, which led me to explore HTML,
											CSS, and JavaScript. As I delved deeper into the world of
											web development, I discovered my passion for creating
											intuitive and responsive user interfaces.
										</p>
									</ScrollReveal>

									<ScrollReveal delay={0.4} direction="up">
										<p className="text-gray-400 leading-relaxed">
											Today, I specialize in building modern web applications
											using React, Node.js, and MongoDB, with a focus on
											performance, accessibility, and user experience. I'm
											constantly learning and exploring new technologies to stay
											at the forefront of web development.
										</p>
									</ScrollReveal>
								</div>
							</div>
						</ScrollReveal>
					</div>

					{/* Stats Section with staggered reveal */}
					<div
						ref={statsRef}
						className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
					>
						{stats.map((stat, index) => (
							<ScrollReveal
								key={stat.label}
								delay={0.1 + index * 0.15}
								direction={index % 2 === 0 ? "left" : "right"}
							>
								<TiltCard className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-[#98ff98]/30 transition-all duration-500 p-6 text-center">
									{/* Add a flash effect when card comes into view */}
									{statsInView && (
										<motion.div
											className="absolute inset-0 bg-gradient-to-br from-[#98ff98]/30 to-transparent"
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 0.8, 0] }}
											transition={{ duration: 1.5, delay: 0.2 + index * 0.2 }}
										/>
									)}

									<motion.div
										initial={{ scale: 0, rotate: -30 }}
										animate={
											statsInView
												? { scale: 1, rotate: 0 }
												: { scale: 0, rotate: -30 }
										}
										transition={{
											type: "spring",
											stiffness: 260,
											damping: 20,
											delay: 0.2 + index * 0.2,
										}}
										className="text-3xl mb-2"
										whileHover={{
											scale: 1.3,
											rotate: [0, -10, 10, 0],
											transition: { duration: 0.5 },
										}}
									>
										{stat.icon}
									</motion.div>
									<motion.div
										className="text-3xl font-bold text-white mb-1"
										initial={{ opacity: 0, y: 20 }}
										animate={
											statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
										}
										transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
									>
										<AnimatedCounter value={stat.value} />
									</motion.div>
									<motion.div
										className="text-sm text-gray-400"
										initial={{ opacity: 0, y: 10 }}
										animate={
											statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
										}
										transition={{ duration: 0.7, delay: 0.5 + index * 0.2 }}
									>
										{stat.label}
									</motion.div>

									{/* Add a hover effect glow */}
									<motion.div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#98ff98]/10 to-transparent rounded-2xl"
										transition={{ duration: 0.3 }}
									/>
								</TiltCard>
							</ScrollReveal>
						))}
					</div>

					{/* Skills Section */}
					<div ref={skillsRef} className="max-w-4xl mx-auto">
						<ScrollReveal delay={0.1} direction="up">
							<h3 className="text-3xl font-bold text-white mb-8 relative">
								Professional Skills
								{/* Animated underline */}
								{skillsInView && (
									<motion.div
										className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#98ff98] to-transparent"
										initial={{ width: 0 }}
										animate={{ width: "40%" }}
										transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
									/>
								)}
							</h3>
						</ScrollReveal>

						<div className="space-y-6">
							{skills.map((skill, index) => (
								<ScrollReveal
									key={skill.name}
									delay={0.2 + index * 0.1}
									direction="right"
								>
									<ProgressBar
										value={skill.level}
										label={skill.name}
										color={skill.color}
									/>
								</ScrollReveal>
							))}
						</div>
					</div>

					{/* Timeline Section with scroll reveal */}
					<div ref={timelineRef} className="space-y-8">
						<ScrollReveal delay={0.1} direction="up">
							<h3 className="text-3xl font-bold text-white mb-12 relative inline-block">
								Experience & Education
								{/* Animated underline */}
								{timelineInView && (
									<motion.div
										className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#98ff98] to-transparent"
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
									/>
								)}
								{/* Add a subtle glow effect */}
								{timelineInView && (
									<motion.div
										className="absolute -inset-4 rounded-lg bg-[#98ff98]/5 -z-10"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.8, delay: 0.4 }}
									/>
								)}
							</h3>
						</ScrollReveal>

						<div className="space-y-16 relative" ref={timelineScrollRef}>
							{/* Timeline Line with animation that grows with scroll */}
							<motion.div
								className="absolute left-10 top-0 bottom-0 w-1"
								style={{
									background:
										"linear-gradient(to bottom, rgba(152, 255, 152, 0.9), rgba(152, 255, 152, 0.3), transparent)",
									boxShadow: "0 0 12px rgba(152, 255, 152, 0.5)",
									scaleY: timelineProgress,
									transformOrigin: "top",
									height: "100%",
									borderRadius: "4px",
									zIndex: 5,
								}}
							/>

							{/* Add a subtle background line for contrast */}
							<div
								className="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-800/50"
								style={{
									height: "100%",
									transform: "translateX(-50%)",
									zIndex: 4,
								}}
							/>

							{/* Add animated dots that travel down the timeline */}
							<motion.div
								className="absolute left-10 top-0 w-2 h-2 rounded-full bg-[#98ff98] transform -translate-x-1/2 z-6"
								style={{
									boxShadow: "0 0 10px rgba(152, 255, 152, 0.8)",
									y: ["0%", "100%"],
									opacity: [0, 1, 0],
								}}
								transition={{
									y: {
										duration: 8,
										repeat: Infinity,
										ease: "linear",
									},
									opacity: {
										duration: 8,
										repeat: Infinity,
										times: [0, 0.1, 1],
										ease: "linear",
									},
								}}
							/>

							<motion.div
								className="absolute left-10 top-0 w-2 h-2 rounded-full bg-white transform -translate-x-1/2 z-6"
								style={{
									boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
									y: ["0%", "100%"],
									opacity: [0, 1, 0],
								}}
								transition={{
									y: {
										duration: 12,
										repeat: Infinity,
										ease: "linear",
										delay: 2,
									},
									opacity: {
										duration: 12,
										repeat: Infinity,
										times: [0, 0.1, 1],
										ease: "linear",
										delay: 2,
									},
								}}
							/>

							{timeline.map((item, index) => (
								<ScrollReveal
									key={item.title}
									delay={0.2 + index * 0.2}
									direction="left"
									className="relative pl-20"
								>
									{/* Timeline Dot with pulse effect - improved alignment */}
									<motion.div
										className={`absolute left-10 top-8 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} border-2 border-white/30 transform -translate-x-1/2 z-10 flex items-center justify-center`}
										whileHover={{
											scale: 1.5,
											boxShadow: "0 0 20px rgba(152, 255, 152, 0.5)",
										}}
										animate={
											timelineInView
												? {
														scale: [1, 1.2, 1],
														boxShadow: [
															"0 0 0 0 rgba(152, 255, 152, 0)",
															"0 0 20px rgba(152, 255, 152, 0.5)",
															"0 0 0 0 rgba(152, 255, 152, 0)",
														],
												  }
												: {}
										}
										transition={{
											duration: 3,
											repeat: Infinity,
											repeatType: "loop",
											ease: "easeInOut",
										}}
									>
										{/* Inner dot for more modern look */}
										<motion.div
											className="w-2 h-2 rounded-full bg-white"
											animate={{
												scale: [1, 1.5, 1],
												opacity: [0.5, 1, 0.5],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												repeatType: "loop",
												ease: "easeInOut",
												delay: index * 0.2,
											}}
										/>
									</motion.div>

									{/* Connection line from dot to card */}
									<motion.div
										className="absolute left-10 top-8 h-0.5 bg-gradient-to-r from-[#98ff98]/50 to-transparent z-5"
										style={{
											width: "10px",
											transform: "translateX(3px)",
											transformOrigin: "left",
										}}
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
									/>

									<TiltCard
										className={`p-6 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 hover:border-[#98ff98]/30 transition-all duration-500 shadow-lg overflow-hidden group ml-2`}
									>
										{/* Add a subtle animated gradient overlay */}
										<motion.div
											className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
											style={{
												background: `linear-gradient(120deg, transparent 30%, ${
													item.type === "education"
														? "rgba(152, 255, 152, 0.2)"
														: "rgba(100, 200, 255, 0.2)"
												} 50%, transparent 70%)`,
												backgroundSize: "200% 100%",
											}}
											animate={{
												backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
											}}
											transition={{
												duration: 5,
												repeat: Infinity,
												repeatType: "loop",
												ease: "linear",
											}}
										/>

										{/* Add a subtle particle effect */}
										<motion.div
											className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
											initial={{ opacity: 0 }}
											animate={{ opacity: 0.2 }}
											transition={{ duration: 1 }}
										>
											{Array.from({ length: 5 }).map((_, i) => (
												<motion.div
													key={i}
													className="absolute w-1 h-1 rounded-full bg-white"
													initial={{
														x: Math.random() * 100 + "%",
														y: Math.random() * 100 + "%",
														scale: 0,
													}}
													animate={{
														x: [
															Math.random() * 100 + "%",
															Math.random() * 100 + "%",
															Math.random() * 100 + "%",
														],
														y: [
															Math.random() * 100 + "%",
															Math.random() * 100 + "%",
															Math.random() * 100 + "%",
														],
														scale: [0, 1.5, 0],
													}}
													transition={{
														duration: 8,
														repeat: Infinity,
														delay: i * 1.5,
														ease: "linear",
													}}
												/>
											))}
										</motion.div>

										{/* Add a subtle shine effect on hover */}
										<motion.div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
											style={{
												background:
													"linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
												backgroundSize: "200% 100%",
											}}
											animate={{
												backgroundPosition: ["200% 0%", "-100% 0%"],
											}}
											transition={{
												duration: 1.5,
												ease: "easeInOut",
												repeat: 0,
											}}
										/>

										<div className="flex items-start justify-between mb-4 relative z-10">
											<div className="w-full">
												<motion.div className="flex items-center flex-wrap gap-2 mb-2">
													<motion.h4
														className="text-xl font-bold text-white"
														whileHover={{
															color: "rgba(152, 255, 152, 0.9)",
															textShadow: "0 0 8px rgba(152, 255, 152, 0.3)",
														}}
													>
														{item.title}
													</motion.h4>
													<div className="flex items-center gap-2 ml-auto">
														<motion.span
															className="text-xs font-normal bg-black/30 px-2 py-0.5 rounded-full text-gray-300"
															whileHover={{
																backgroundColor: "rgba(152, 255, 152, 0.2)",
															}}
														>
															{item.type}
														</motion.span>
														{/* Add the year as a badge */}
														<motion.span
															className="text-xs font-normal bg-black/50 px-2 py-0.5 rounded-full text-white/80"
															whileHover={{
																backgroundColor: "rgba(152, 255, 152, 0.2)",
															}}
														>
															{item.year}
														</motion.span>
													</div>
												</motion.div>
												<p className="text-gray-300 leading-relaxed">
													{item.description}
												</p>
											</div>
											<motion.div
												className="text-3xl bg-black/20 p-2 rounded-full ml-4 flex-shrink-0 group-hover:bg-black/40 transition-all duration-300"
												animate={
													timelineInView
														? {
																scale: [1, 1.2, 1],
																rotate: [0, 10, -10, 0],
														  }
														: {}
												}
												transition={{
													duration: 2,
													delay: index * 0.3,
													repeat: Infinity,
													repeatType: "reverse",
												}}
												whileHover={{
													scale: 1.5,
													rotate: [0, 15, -15, 0],
													transition: { duration: 0.5 },
												}}
											>
												{item.icon}
											</motion.div>
										</div>

										{/* Skills/Keywords */}
										<div className="mt-4">
											<div className="flex flex-wrap gap-2">
												{item.skills.map((skill, i) => (
													<motion.span
														key={skill}
														className="inline-block px-3 py-1 bg-black/30 text-xs font-medium text-white/80 rounded-full border border-white/10 group-hover:border-[#98ff98]/30 transition-all duration-300"
														initial={{ opacity: 0, y: 20 }}
														animate={
															timelineInView
																? { opacity: 1, y: 0 }
																: { opacity: 0, y: 20 }
														}
														transition={{ delay: 0.5 + i * 0.1 + index * 0.2 }}
														whileHover={{
															backgroundColor: "rgba(152, 255, 152, 0.2)",
															scale: 1.05,
															color: "#ffffff",
															boxShadow: "0 0 10px rgba(152, 255, 152, 0.3)",
														}}
													>
														{skill}
													</motion.span>
												))}
											</div>
										</div>

										{/* Add a hover effect glow */}
										<motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#98ff98]/5 to-transparent rounded-xl transition-opacity duration-500" />
									</TiltCard>
								</ScrollReveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default About;
