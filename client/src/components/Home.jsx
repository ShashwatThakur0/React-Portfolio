import { motion } from "framer-motion";
import profilePic from "../assets/profilePic/Screenshot 2025-02-26 213047.png";
import { useEffect } from "react";

const Home = () => {
	// Enhanced button click handler with multiple approaches
	const handleButtonClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		console.log("Button clicked - attempting to scroll to projects section");

		// Try multiple approaches to ensure it works
		// Approach 1: Use the global function
		if (typeof window.scrollToSection === "function") {
			console.log("Using global scrollToSection function");
			window.scrollToSection("projects");
			return;
		}

		// Approach 2: Direct DOM manipulation
		const projectsSection = document.getElementById("projects");
		if (projectsSection) {
			console.log("Using direct DOM manipulation");
			const yOffset = -80;
			const y =
				projectsSection.getBoundingClientRect().top +
				window.pageYOffset +
				yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
			return;
		}

		// Approach 3: Fallback to a fixed position if section not found
		console.log("Section not found, using fallback");
		const viewportHeight = window.innerHeight;
		window.scrollTo({ top: viewportHeight * 2, behavior: "smooth" });
	};

	// Add a direct event listener to the button after component mounts
	useEffect(() => {
		const setupButtonListener = () => {
			const button = document.getElementById("seeProjectsButton");
			if (button) {
				console.log("Setting up direct click listener on button");
				// Remove any existing listeners to avoid duplicates
				const newButton = button.cloneNode(true);
				button.parentNode.replaceChild(newButton, button);

				// Add the new listener
				newButton.addEventListener(
					"click",
					(e) => {
						e.preventDefault();
						e.stopPropagation();
						console.log("Direct button click detected");

						const projectsSection = document.getElementById("projects");
						if (projectsSection) {
							const yOffset = -80;
							const y =
								projectsSection.getBoundingClientRect().top +
								window.pageYOffset +
								yOffset;
							window.scrollTo({ top: y, behavior: "smooth" });
						} else {
							// Fallback
							window.scrollTo({
								top: window.innerHeight * 2,
								behavior: "smooth",
							});
						}

						return false;
					},
					true
				);
			}
		};

		// Set up the listener after a short delay to ensure DOM is ready
		const timerId = setTimeout(setupButtonListener, 500);

		// Clean up
		return () => clearTimeout(timerId);
	}, []);

	return (
		<div className="relative min-h-screen bg-[#fafafa] overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-gradient-radial from-gray-100 to-transparent opacity-40" />

			{/* Main content */}
			<div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-40">
				{/* Profile section */}
				<div className="flex flex-col md:flex-row items-start gap-8">
					{/* Left side - Profile image and social links */}
					<div className="flex flex-col items-center md:sticky md:top-0 w-full md:w-auto">
						<div className="relative">
							<img
								src={profilePic}
								alt="Shashwat Thakur"
								className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
							/>
							<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
								<a
									href="https://github.com/shashwatthakur0"
									target="_blank"
									rel="noopener noreferrer"
									className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
								>
									<img src="/github.svg" alt="GitHub" className="w-4 h-4" />
								</a>
								<a
									href="https://instagram.com/_.shashwat._thakur"
									target="_blank"
									rel="noopener noreferrer"
									className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
								>
									<img
										src="/instagram.svg"
										alt="Instagram"
										className="w-4 h-4"
									/>
								</a>
								<a
									href="mailto:shashwat.thakur02@gmail.com"
									className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
								>
									<img src="/email.svg" alt="Email" className="w-4 h-4" />
								</a>
							</div>
						</div>
						<div className="mt-9 text-center">
							<h2 className="text-xl font-medium text-black">
								Shashwat Thakur
							</h2>
							<p className="text-sm text-gray-700">
								Full Stack Developer | Data Science Enthusiast
							</p>
						</div>
						<div className="mt-1 text-sm text-gray-700">
							Available for opportunities
						</div>
					</div>

					{/* Right side - Main heading and description */}
					<div className="flex-1 text-center md:text-left md:pl-6">
						<div className="text-4xl font-normal leading-tight text-black">
							Hi! I'm{" "}
							<motion.span
								className="inline-block px-4 py-2 bg-[#CEDCEB] rounded-full text-black shadow-md"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								Shashwat Thakur
							</motion.span>
							<br />
							<div className="mt-1 text-4xl">
								a{" "}
								<motion.span
									className="inline-block px-3 py-1 bg-[#111] text-white rounded-full shadow-md"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								>
									Problem Solver
								</motion.span>
							</div>
							<div className="mt-1 text-4xl">
								who loves to{" "}
								<motion.span
									className="inline-block px-3 py-1 bg-[#CEDCEB] rounded-full text-black shadow-md"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								>
									create
								</motion.span>
								<br />
								and bring
								<br />
								innovation to
								<br />
								the digital world.
							</div>
						</div>

						<p className="mt-1 text-base text-gray-900 max-w-1xl leading-relaxed">
							I'm a curious developer who thrives at the intersection of web
							development and data science. By combining clean code with
							data-driven insights, I build solutions that not only work
							flawlessly but also adapt and scale. Currently exploring new
							technologies and always open to exciting collaborations.
						</p>
						<div className="mt-2 mb-16 flex justify-center md:justify-start gap-6">
							<motion.button
								type="button"
								id="seeProjectsButton"
								className="inline-flex items-center gap-2 px-6 py-3 bg-[#98ff98] rounded-full font-medium hover:bg-[#7aff7a] hover:scale-105 transition-all duration-300 text-black shadow-lg hover:shadow-xl transform active:scale-95"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleButtonClick}
							>
								See what I can do
								<motion.span
									className="inline-block"
									initial={{ x: 0 }}
									whileHover={{ x: 5 }}
									transition={{ duration: 0.3 }}
								>
									→
								</motion.span>
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
