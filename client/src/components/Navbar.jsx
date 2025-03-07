// Import required hooks and components from React and React Router
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profilePic/Screenshot 2025-02-26 213047.png";

// Navbar component definition
const Navbar = () => {
	// State to track whether the user has scrolled past the viewport height
	const [scrolled, setScrolled] = useState(false);
	// State to track if we're at the very top of the page
	const [atTop, setAtTop] = useState(true);

	// Effect hook to handle scroll events
	useEffect(() => {
		// Function to handle scroll events and update navbar appearance
		const handleScroll = () => {
			// Get current scroll position
			const offset = window.scrollY;
			// Get viewport height
			const viewportHeight = window.innerHeight;

			// Check if we're at the very top
			setAtTop(offset < 10);

			// Update scrolled state based on scroll position
			if (offset > viewportHeight - 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		// Add scroll event listener when component mounts
		window.addEventListener("scroll", handleScroll);
		// Initial check
		handleScroll();

		// Cleanup: remove event listener when component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Empty dependency array means this effect runs once on mount

	// Render the navbar component
	return (
		// Navigation container with dynamic classes based on scroll state
		<nav
			className={`fixed z-50 w-full transition-all duration-300 ease-out will-change-transform transform-gpu ${
				scrolled
					? "top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[700px] scale-100 rounded-full border border-gray-200 bg-white/90"
					: atTop
					? "top-0 left-0 w-full scale-100 bg-gray-900/90 border-b border-gray-800"
					: "top-0 left-0 w-full scale-100 bg-gray-900/90 border-b border-gray-800"
			} backdrop-blur-md shadow-md`}
		>
			<div
				className={`flex items-center justify-between transition-all duration-300 ease-out ${
					scrolled ? "px-6 py-3" : "px-8 py-4 max-w-7xl mx-auto"
				}`}
			>
				{/* Logo and Name */}
				<motion.a
					href="#home"
					className="flex items-center gap-2"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<img
						src={profilePic}
						alt="Shashwat Thakur"
						className={`w-8 h-8 rounded-full object-cover border-2 ${
							scrolled ? "border-gray-800" : "border-white"
						}`}
					/>
					<span
						className={`font-medium transition-colors ${
							scrolled ? "text-gray-800" : "text-white"
						}`}
					>
						Shashwat Thakur
					</span>
				</motion.a>

				{/* Navigation Links */}
				<div className="flex items-center space-x-8">
					<a
						href="#about"
						className={`text-sm font-medium transition-colors ${
							scrolled
								? "text-gray-700 hover:text-black"
								: "text-gray-300 hover:text-white"
						}`}
					>
						About
					</a>
					<a
						href="#projects"
						className={`text-sm font-medium transition-colors ${
							scrolled
								? "text-gray-700 hover:text-black"
								: "text-gray-300 hover:text-white"
						}`}
					>
						Projects
					</a>
					<a
						href="mailto:shashwat.thakur02@gmail.com"
						className={`text-sm font-medium transition-colors ${
							scrolled
								? "text-gray-700 hover:text-black"
								: "text-gray-300 hover:text-white"
						}`}
					>
						Contact
					</a>
					<a
						href="#contact"
						className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
							scrolled
								? "bg-gray-900 text-white hover:bg-black"
								: "bg-white text-gray-900 hover:bg-gray-100"
						}`}
					>
						Get in Touch
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
