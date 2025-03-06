import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.98,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.98,
		transition: {
			duration: 0.4,
			ease: "easeIn",
		},
	},
};

function App() {
	const sectionsRef = useRef([]);

	useEffect(() => {
		const handleScroll = () => {
			sectionsRef.current.forEach((section) => {
				if (!section) return;
				const rect = section.getBoundingClientRect();
				const isInView =
					rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
				if (isInView) {
					section.style.opacity = "1";
					section.style.transform = "translateY(0) scale(1)";
				}
			});
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen overflow-hidden max-w-[100vw] bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
			<Navbar />
			<AnimatePresence mode="wait">
				<motion.div
					key="content"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={pageVariants}
					className="relative z-10 overflow-hidden"
				>
					<motion.section
						id="home"
						ref={(el) => (sectionsRef.current[0] = el)}
						key="home"
						variants={pageVariants}
						className="section min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900"
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<Home />
					</motion.section>
					<motion.section
						id="about"
						ref={(el) => (sectionsRef.current[1] = el)}
						key="about"
						variants={pageVariants}
						className="section min-h-screen relative bg-gradient-to-b from-black via-gray-900 to-black"
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<About />
					</motion.section>
					<motion.section
						id="skills"
						ref={(el) => (sectionsRef.current[2] = el)}
						key="skills"
						variants={pageVariants}
						className="section min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900"
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<Skills />
					</motion.section>
					<motion.section
						id="projects"
						ref={(el) => (sectionsRef.current[3] = el)}
						key="projects"
						variants={pageVariants}
						className="section min-h-screen relative bg-gradient-to-b from-black via-gray-900 to-black"
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						style={{
							opacity: 0,
							transform: "translateY(50px) scale(0.95)",
							scrollMarginTop: "100px",
						}}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<Projects />
					</motion.section>
					<motion.section
						id="contact"
						ref={(el) => (sectionsRef.current[4] = el)}
						key="contact"
						variants={pageVariants}
						className="section min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900"
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<Contact />
					</motion.section>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

export default App;
