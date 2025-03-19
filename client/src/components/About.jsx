import {
	motion,
	useScroll,
	useTransform,
	useMotionValue,
	useSpring,
	useInView,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Lightning from "./Lightning";

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
				boxShadow: "0 10px 30px -15px rgba(79, 70, 229, 0.3)",
				borderColor: "rgba(79, 70, 229, 0.5)",
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
                rgba(79, 70, 229, 0.3) 0%,
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
							borderColor: "rgba(79, 70, 229, 0.3)",
							boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)",
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

	const stats = [
		{ value: 5, label: "Years Experience", icon: "⏱️" },
		{ value: 20, label: "Projects Completed", icon: "🚀" },
		{ value: 15, label: "Happy Clients", icon: "😊" },
		{ value: 3, label: "Awards", icon: "🏆" },
	];

	return (
		<section
			id="about"
			className="relative min-h-screen py-20 overflow-hidden section-bg"
			ref={containerRef}
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
					hue={220}
					xOffset={0}
					speed={1}
					intensity={0.08}
					size={0.25}
				/>
			</div>

			{/* Enhanced Background Elements */}
			<div className="bg-accent-1"></div>
			<div className="bg-accent-2"></div>

			<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				{/* Section Title */}
				<motion.div
					className="text-center mb-16"
					style={{ opacity, scale }}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						About <span className="text-indigo-400">Me</span>
					</h2>
					<div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
					<p className="text-neutral-300 mt-6 max-w-2xl mx-auto">
						Crafting digital experiences through clean, efficient code and
						engaging designs.
					</p>
				</motion.div>

				<div className="space-y-32">
					{/* Section Header with staggered animation */}
					<div className="text-center mb-8">
						<ScrollReveal delay={0.1} direction="up">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#98ff98]/20 to-[#4ade80]/20 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium mb-4 border border-[#98ff98]/30"
							>
								ABOUT ME
							</motion.div>
						</ScrollReveal>

						<ScrollReveal delay={0.2} direction="up">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
							>
								My Journey
							</motion.h2>
						</ScrollReveal>

						<ScrollReveal delay={0.3} direction="up">
							<motion.div
								initial={{ opacity: 0, scaleX: 0 }}
								animate={{ opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98]/50 to-[#4ade80]/50 mx-auto mb-8 rounded-full"
							/>
						</ScrollReveal>
					</div>

					{/* Profile Content with scroll reveal */}
					<div ref={profileRef} className="max-w-4xl mx-auto">
						<ScrollReveal delay={0.1} direction="up">
							<div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10 hover:border-[#98ff98]/30 transition-all duration-500 shadow-xl">
								<div className="space-y-8">
									<ScrollReveal delay={0.2} direction="up">
										<p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light relative">
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
										<p className="text-lg md:text-xl text-gray-400 leading-relaxed">
											My journey in software development began with a curiosity
											about how websites work, which led me to explore HTML,
											CSS, and JavaScript. As I delved deeper into the world of
											web development, I discovered my passion for creating
											intuitive and responsive user interfaces.
										</p>
									</ScrollReveal>

									<ScrollReveal delay={0.4} direction="up">
										<p className="text-lg md:text-xl text-gray-400 leading-relaxed">
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
						className={`relative ${
							statsInView ? "opacity-100" : "opacity-0"
						} transition-opacity duration-1000`}
					>
						<div className="text-center mb-16">
							<h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
								Professional Stats
							</h3>
							<p className="text-lg text-gray-400 max-w-2xl mx-auto">
								A snapshot of my professional achievements and milestones.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<TiltCard
									key={index}
									className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300"
								>
									<div className="text-center">
										<div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
											<span className="text-4xl">{stat.icon}</span>
										</div>
										<div className="relative">
											<AnimatedCounter
												value={stat.value}
												duration={2}
												className="text-5xl font-bold text-white mb-3"
											/>

											<p className="text-lg text-gray-400">{stat.label}</p>
										</div>
									</div>
								</TiltCard>
							))}
						</div>
					</div>

					{/* Timeline Section with scroll reveal */}
					<div
						ref={timelineRef}
						className={`relative ${
							timelineInView ? "opacity-100" : "opacity-0"
						} transition-opacity duration-1000`}
					>
						<div className="text-center mb-16">
							<h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
								Education & Experience
							</h3>
							<p className="text-lg text-gray-400 max-w-2xl mx-auto">
								My professional journey and educational background that have
								shaped my skills and expertise.
							</p>
						</div>

						<div
							ref={timelineScrollRef}
							className="relative max-w-4xl mx-auto will-change-transform"
						>
							{/* Timeline line */}
							<div
								className="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-800/50"
								style={{
									height: "100%",
									transform: "translateX(-50%)",
									zIndex: 4,
								}}
							/>

							{/* Add animated timeline line that grows with scroll */}
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
									willChange: "transform",
								}}
							/>

							{/* Add animated dots that travel down the timeline - simplified animation */}
							<motion.div
								className="absolute left-10 top-0 w-2 h-2 rounded-full bg-[#98ff98] transform -translate-x-1/2 z-6"
								style={{
									boxShadow: "0 0 10px rgba(152, 255, 152, 0.8)",
									y: ["0%", "100%"],
									opacity: [0, 1, 0],
									willChange: "transform, opacity",
								}}
								transition={{
									y: {
										duration: 12,
										repeat: Infinity,
										ease: "linear",
									},
									opacity: {
										duration: 12,
										repeat: Infinity,
										times: [0, 0.1, 1],
										ease: "linear",
									},
								}}
							/>

							{/* Timeline items */}
							{timeline.map((item, index) => (
								<ScrollReveal
									key={item.title}
									delay={0.2 + index * 0.15}
									direction="left"
									className="relative pl-20 mb-24"
								>
									{/* Timeline Dot with simplified pulse effect */}
									<motion.div
										className={`absolute left-10 top-8 w-8 h-8 rounded-full bg-gradient-to-br ${item.color} border-2 border-white/30 transform -translate-x-1/2 z-10 flex items-center justify-center`}
										whileHover={{
											scale: 1.2,
											boxShadow: "0 0 20px rgba(152, 255, 152, 0.5)",
										}}
										animate={
											timelineInView
												? {
														scale: [1, 1.1, 1],
														boxShadow: [
															"0 0 0 0 rgba(152, 255, 152, 0)",
															"0 0 15px rgba(152, 255, 152, 0.5)",
															"0 0 0 0 rgba(152, 255, 152, 0)",
														],
												  }
												: {}
										}
										transition={{
											duration: 4,
											repeat: 0,
											ease: "easeInOut",
										}}
										style={{ willChange: "transform" }}
									>
										{/* Inner dot with simplified animation */}
										<motion.div
											className="w-3 h-3 rounded-full bg-white"
											animate={{
												scale: [1, 1.3, 1],
												opacity: [0.6, 1, 0.6],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												repeatType: "loop",
												ease: "easeInOut",
												delay: index * 0.1,
											}}
											style={{ willChange: "transform, opacity" }}
										/>
									</motion.div>

									{/* Connection line from dot to card */}
									<motion.div
										className="absolute left-10 top-8 h-0.5 bg-gradient-to-r from-[#98ff98]/50 to-transparent z-5"
										style={{
											width: "10px",
											transform: "translateX(3px)",
											transformOrigin: "left",
											willChange: "transform",
										}}
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
									/>

									<TiltCard
										className={`p-8 md:p-10 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 hover:border-[#98ff98]/30 transition-all duration-500 shadow-lg overflow-hidden group ml-2`}
									>
										{/* Simplified gradient overlay with less intensive animation */}
										<motion.div
											className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
											style={{
												background: `linear-gradient(120deg, transparent 30%, ${
													item.type === "education"
														? "rgba(152, 255, 152, 0.2)"
														: "rgba(100, 200, 255, 0.2)"
												} 50%, transparent 70%)`,
												backgroundSize: "200% 100%",
												willChange: "background-position",
											}}
											animate={{
												backgroundPosition: ["0% 0%", "100% 0%"],
											}}
											transition={{
												duration: 8,
												repeat: Infinity,
												repeatType: "reverse",
												ease: "linear",
											}}
										/>

										<div className="flex items-start justify-between mb-8 relative z-10">
											<div className="w-full">
												<motion.div className="flex items-center flex-wrap gap-3 mb-6">
													<motion.h4
														className="text-2xl md:text-3xl font-bold text-white"
														whileHover={{
															color: "rgba(152, 255, 152, 0.9)",
															textShadow: "0 0 8px rgba(152, 255, 152, 0.3)",
														}}
													>
														{item.title}
													</motion.h4>
													<div className="flex items-center gap-3 ml-auto">
														<motion.span
															className="text-sm font-normal bg-black/30 px-3 py-1 rounded-full text-gray-300"
															whileHover={{
																backgroundColor: "rgba(152, 255, 152, 0.2)",
															}}
														>
															{item.type}
														</motion.span>
														{/* Year badge */}
														<motion.span
															className="text-sm font-normal bg-black/50 px-3 py-1 rounded-full text-white/80"
															whileHover={{
																backgroundColor: "rgba(152, 255, 152, 0.2)",
															}}
														>
															{item.year}
														</motion.span>
													</div>
												</motion.div>
												<p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
													{item.description}
												</p>
											</div>
											<motion.div
												className="text-4xl bg-black/20 p-4 rounded-full ml-6 flex-shrink-0 group-hover:bg-black/40 transition-all duration-300"
												animate={
													timelineInView
														? {
																scale: [1, 1.1, 1],
														  }
														: {}
												}
												transition={{
													duration: 3,
													delay: index * 0.2,
													repeat: 0,
												}}
												whileHover={{
													scale: 1.3,
													rotate: [0, 10, 0],
													transition: { duration: 0.5 },
												}}
												style={{ willChange: "transform" }}
											>
												{item.icon}
											</motion.div>
										</div>

										{/* Skills/Keywords - simplified animation */}
										<div className="mt-8">
											<div className="flex flex-wrap gap-4">
												{item.skills.map((skill, i) => (
													<motion.span
														key={skill}
														className="inline-block px-4 py-2 bg-black/30 text-base font-medium text-white/80 rounded-full border border-white/10 group-hover:border-[#98ff98]/30 transition-all duration-300"
														initial={{ opacity: 0, y: 10 }}
														animate={
															timelineInView
																? { opacity: 1, y: 0 }
																: { opacity: 0, y: 10 }
														}
														transition={{
															delay: 0.3 + i * 0.05,
															duration: 0.5,
														}}
														whileHover={{
															backgroundColor: "rgba(152, 255, 152, 0.2)",
															scale: 1.05,
															color: "#ffffff",
														}}
														style={{ willChange: "transform, opacity" }}
													>
														{skill}
													</motion.span>
												))}
											</div>
										</div>

										{/* Simplified hover glow effect */}
										<motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#98ff98]/5 to-transparent rounded-xl transition-opacity duration-300" />
									</TiltCard>
								</ScrollReveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
