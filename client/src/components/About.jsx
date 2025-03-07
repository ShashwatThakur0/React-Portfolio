import { motion } from "framer-motion";

const About = () => {
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
		},
		{
			year: "2018 - 2020",
			title: "Bachelor's in Computer Science",
			description: "Focused on web technologies and software development.",
			type: "education",
			icon: "🎓",
			color: "from-green-500/20 to-green-600/20",
			borderColor: "border-green-500/20",
		},
	];

	const interests = [
		{
			name: "Web Development",
			icon: "🌐",
			color: "from-blue-500/20 to-blue-600/20",
		},
		{
			name: "Data Science",
			icon: "📊",
			color: "from-green-500/20 to-green-600/20",
		},
		{
			name: "UI/UX Design",
			icon: "🎨",
			color: "from-purple-500/20 to-purple-600/20",
		},
		{
			name: "Open Source",
			icon: "🌟",
			color: "from-yellow-500/20 to-yellow-600/20",
		},
	];

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
							DISCOVER MY STORY
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-6xl font-bold tracking-tight text-white mb-4"
						>
							About Me
						</motion.h2>
						<motion.div
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-24 h-1.5 bg-gradient-to-r from-white/50 to-white/10 mx-auto mb-8 rounded-full"
						></motion.div>
					</div>

					{/* Main Content */}
					<div className="grid md:grid-cols-3 gap-12">
						{/* Profile Image Column */}
						<div className="md:col-span-1">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="relative md:sticky md:top-24"
							>
								<motion.div
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.3 }}
									className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-white/10 hover:border-white/20 group transition-all duration-300"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300"></div>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-7xl font-bold text-white/20 group-hover:text-white/30 transition-all duration-300">
											ST
										</div>
									</div>
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
										<h3 className="text-2xl font-bold text-white mb-1">
											Shashwat Thakur
										</h3>
										<p className="text-lg text-gray-300">
											Full Stack Developer
										</p>
									</div>
								</motion.div>

								{/* Social Links */}
								<div className="flex justify-center mt-8 space-x-4">
									<motion.a
										href="https://github.com/shashwatthakur0"
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
										whileHover={{ y: -4, scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<svg
											className="w-6 h-6 text-white"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
												clipRule="evenodd"
											/>
										</svg>
									</motion.a>
									<motion.a
										href="https://linkedin.com"
										target="_blank"
										rel="noopener noreferrer"
										className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
										whileHover={{ y: -4, scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<svg
											className="w-6 h-6 text-white"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
									</motion.a>
									<motion.a
										href="mailto:shashwat.thakur02@gmail.com"
										className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
										whileHover={{ y: -4, scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											></path>
										</svg>
									</motion.a>
								</div>

								{/* Interests */}
								<div className="mt-12">
									<h3 className="text-xl font-semibold text-white mb-6">
										Interests
									</h3>
									<div className="grid grid-cols-2 gap-4">
										{interests.map((interest, index) => (
											<motion.div
												key={interest.name}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												whileHover={{ y: -4, scale: 1.05 }}
												className={`p-4 rounded-xl bg-gradient-to-br ${interest.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}
											>
												<div className="text-2xl mb-2">{interest.icon}</div>
												<div className="text-sm font-medium text-white">
													{interest.name}
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</motion.div>
						</div>

						{/* Content Column */}
						<div className="md:col-span-2 space-y-24">
							{/* Profile Content */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
								className="space-y-8"
							>
								<h3 className="text-3xl font-bold text-white mb-8">Profile</h3>
								<div className="space-y-6">
									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.1 }}
										className="text-xl text-gray-300 leading-relaxed font-light"
									>
										I'm a{" "}
										<span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">
											passionate Full Stack Developer
										</span>{" "}
										with a strong foundation in web technologies and a keen eye
										for creating user-friendly applications. With experience in
										both frontend and backend development, I enjoy bringing
										ideas to life through code.
									</motion.p>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.2 }}
										className="text-xl text-gray-300 leading-relaxed font-light"
									>
										My approach combines{" "}
										<span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">
											technical expertise
										</span>{" "}
										with{" "}
										<span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md">
											creative problem-solving
										</span>{" "}
										to develop solutions that are not only functional but also
										intuitive and enjoyable to use.
									</motion.p>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.3 }}
										className="text-xl text-gray-300 leading-relaxed font-light"
									>
										When I'm not coding, you can find me exploring new
										technologies, contributing to open-source projects, or
										sharing my knowledge with the developer community.
									</motion.p>
								</div>
							</motion.div>

							{/* Experience Section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								<h3 className="text-3xl font-bold text-white mb-12">
									Experience & Education
								</h3>
								<div className="space-y-8">
									{timeline.map((item, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											whileHover={{ scale: 1.02 }}
											className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border ${item.borderColor} hover:border-white/20 transition-all duration-300`}
										>
											<div className="flex items-start gap-4">
												<div className="text-3xl">{item.icon}</div>
												<div className="flex-1">
													<span className="text-sm font-medium text-white/70">
														{item.year}
													</span>
													<h3 className="text-xl font-bold text-white mt-1">
														{item.title}
													</h3>
													<p className="text-gray-300 mt-2">
														{item.description}
													</p>
													<div className="mt-4">
														<span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90">
															{item.type === "experience"
																? "Work Experience"
																: "Education"}
														</span>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
