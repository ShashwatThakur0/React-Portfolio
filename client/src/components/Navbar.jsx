import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			const viewportHeight = window.innerHeight;
			if (offset > viewportHeight - 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed z-50 w-full transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform transform-gpu ${
				scrolled
					? "top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[600px] scale-100 rounded-full border border-white/20 bg-white/60"
					: "top-0 left-1/2 -translate-x-1/2 w-full scale-100 bg-white/5"
			} backdrop-blur-lg shadow-lg px-6 py-3`}
		>
			<div
				className={`flex items-center transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform ${
					scrolled ? "justify-center" : "justify-end"
				} space-x-8 ${scrolled ? "" : "max-w-7xl mx-auto"}`}
			>
				<a
					href="#projects"
					className={`text-sm font-medium transition-colors hover:text-gray-600 ${
						scrolled ? "text-gray-800" : "text-gray-900"
					}`}
				>
					Projects
				</a>
				<a
					href="#about"
					className={`text-sm font-medium transition-colors hover:text-gray-600 ${
						scrolled ? "text-gray-800" : "text-gray-900"
					}`}
				>
					About
				</a>
				<a
					href="mailto:shashwat.thakur02@gmail.com"
					className={`text-sm font-medium transition-colors hover:text-gray-600 ${
						scrolled ? "text-gray-800" : "text-gray-900"
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
		</nav>
	);
};

export default Navbar;
