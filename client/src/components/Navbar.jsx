// Import required hooks and components from React and React Router
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profilePic/Screenshot 2025-02-26 213047.png";

// Navbar component definition
const Navbar = () => {
	// State to track whether the user has scrolled past the viewport height
	const [scrolled, setScrolled] = useState(false);

	// Effect hook to handle scroll events
	useEffect(() => {
		// Function to handle scroll events and update navbar appearance
		const handleScroll = () => {
			// Get current scroll position
			const offset = window.scrollY;
			// Get viewport height
			const viewportHeight = window.innerHeight;
			// Update scrolled state based on scroll position
			if (offset > viewportHeight - 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		// Add scroll event listener when component mounts
		window.addEventListener("scroll", handleScroll);
		// Cleanup: remove event listener when component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Empty dependency array means this effect runs once on mount

	// Render the navbar component
	return (
		// Navigation container with dynamic classes based on scroll state
		<nav
			className={`fixed z-50 w-full transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform transform-gpu ${
				scrolled
					? "top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[700px] scale-100 rounded-full border border-white/20 bg-white/60"
					: "top-0 left-1/2 -translate-x-1/2 w-full scale-100 bg-white/5"
			} backdrop-blur-lg shadow-lg px-6 py-3`}
		>
			<div
				className={`flex items-center transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform ${
					scrolled ? "justify-between" : "justify-between"
				} ${scrolled ? "" : "max-w-7xl mx-auto"}`}
			>
				{/* Logo and Name */}
				<motion.a
					href="#home"
					className="flex items-center gap-2"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
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
				<div className="flex items-center space-x-6">
					<a
						href="#about"
						className={`text-sm font-medium transition-colors hover:text-blue-400 ${
							scrolled ? "text-gray-800" : "text-white"
						}`}
					>
						About
					</a>
					<a
						href="#projects"
						className={`text-sm font-medium transition-colors hover:text-blue-400 ${
							scrolled ? "text-gray-800" : "text-white"
						}`}
					>
						Projects
					</a>
					<a
						href="mailto:shashwat.thakur02@gmail.com"
						className={`text-sm font-medium transition-colors hover:text-blue-400 ${
							scrolled ? "text-gray-800" : "text-white"
						}`}
					>
						Email me
					</a>
					<a
						href="#contact"
						className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
							scrolled
								? "bg-black text-white hover:bg-gray-800"
								: "bg-black/80 text-white hover:bg-black"
						}`}
					>
						Contact me
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
