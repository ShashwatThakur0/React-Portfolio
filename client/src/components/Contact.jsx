// Import necessary hooks and libraries
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Simple Particles Component
const SimpleParticles = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	const particlesInit = async (main) => {
		try {
			await loadSlim(main);
			setIsLoaded(true);
		} catch (error) {
			console.error("Failed to initialize particles:", error);
		}
	};

	const options = {
		fullScreen: {
			enable: false,
		},
		background: {
			color: {
				value: "transparent",
			},
		},
		fpsLimit: 120,
		particles: {
			color: {
				value: "#4a5568",
			},
			links: {
				color: "#4a5568",
				distance: 150,
				enable: true,
				opacity: 0.3,
				width: 1,
			},
			move: {
				direction: "none",
				enable: true,
				outModes: {
					default: "bounce",
				},
				random: false,
				speed: 1,
				straight: false,
			},
			number: {
				density: {
					enable: true,
					area: 800,
				},
				value: 80,
			},
			opacity: {
				value: 0.3,
			},
			shape: {
				type: "circle",
			},
			size: {
				value: { min: 1, max: 3 },
			},
		},
		detectRetina: true,
		interactivity: {
			events: {
				onClick: {
					enable: true,
					mode: "push",
				},
				onHover: {
					enable: true,
					mode: "repulse",
				},
				resize: true,
			},
			modes: {
				push: {
					quantity: 4,
				},
				repulse: {
					distance: 100,
					duration: 0.4,
				},
			},
		},
	};

	return (
		<div className="absolute inset-0 z-0">
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={options}
				className="absolute inset-0 w-full h-full"
			/>
		</div>
	);
};

// Contact component for handling user messages
const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [focusedInput, setFocusedInput] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// Template parameters - updated to match email template variables
		const templateParams = {
			user_name: form.name,
			user_email: form.email,
			message: form.message,
		};

		emailjs
			.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				templateParams,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			)
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
				setLoading(false);
				setSuccess(true);
				setForm({
					name: "",
					email: "",
					message: "",
				});

				setTimeout(() => {
					setSuccess(false);
				}, 5000);
			})
			.catch((error) => {
				console.error("FAILED...", error);
				setLoading(false);
				setError(
					"Failed to send message. Please try again. Error: " + error.text
				);
			});
	};

	return (
		<div
			id="contact"
			className="relative min-h-screen py-24 overflow-hidden bg-[#fafafa]"
		>
			{/* Background animation */}
			<SimpleParticles />

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-16">
					{/* Section Header */}
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="inline-block px-4 py-1.5 contact-card text-sm text-gray-800 font-medium mb-4 hover:scale-105 contact-element"
						>
							GET IN TOUCH
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 contact-glow"
						>
							Let's Connect
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="max-w-2xl mx-auto text-gray-600 text-lg"
						>
							Have a question or want to work together? I'd love to hear from
							you!
							<br />
							<span className="text-sm italic mt-2 inline-block">
								(Move your mouse around to interact with the background!)
							</span>
						</motion.p>
					</div>

					{/* Main Content */}
					<div className="grid md:grid-cols-2 gap-12 items-start">
						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="space-y-8"
						>
							<div className="space-y-6">
								<h3 className="text-2xl font-bold text-gray-900 contact-glow">
									Let's Build Something Amazing Together
								</h3>
								<p className="text-gray-600 leading-relaxed">
									I'm always open to discussing new projects, creative ideas, or
									opportunities to be part of your visions.
								</p>
							</div>

							<div className="space-y-6">
								{/* Contact Methods */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="p-6 contact-card contact-element"
								>
									<h4 className="text-lg font-semibold text-gray-900 mb-4">
										Contact Information
									</h4>
									<div className="space-y-4">
										{/* Contact links with modern styling */}
										<motion.a
											href="mailto:shashwat.thakur02@gmail.com"
											className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
											whileHover={{ x: 5 }}
										>
											<div className="w-10 h-10 rounded-full bg-[#98ff98]/10 flex items-center justify-center group-hover:bg-[#98ff98]/20 transition-colors duration-300">
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													/>
												</svg>
											</div>
											<span className="group-hover:text-[#98ff98] transition-colors duration-300">
												shashwat.thakur02@gmail.com
											</span>
										</motion.a>
										<motion.a
											href="https://github.com/shashwatthakur0"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
											whileHover={{ x: 5 }}
										>
											<div className="w-10 h-10 rounded-full bg-[#98ff98]/10 flex items-center justify-center group-hover:bg-[#98ff98]/20 transition-colors duration-300">
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														fillRule="evenodd"
														d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<span className="group-hover:text-[#98ff98] transition-colors duration-300">
												GitHub
											</span>
										</motion.a>
										<motion.a
											href="https://linkedin.com/in/yourprofile"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
											whileHover={{ x: 5 }}
										>
											<div className="w-10 h-10 rounded-full bg-[#98ff98]/10 flex items-center justify-center group-hover:bg-[#98ff98]/20 transition-colors duration-300">
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
												</svg>
											</div>
											<span className="group-hover:text-[#98ff98] transition-colors duration-300">
												LinkedIn
											</span>
										</motion.a>
									</div>
								</motion.div>

								{/* Availability Card */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="p-6 contact-card contact-element"
								>
									<div className="flex items-center gap-4 mb-4">
										<div className="w-10 h-10 rounded-full bg-[#98ff98]/20 flex items-center justify-center">
											<svg
												className="w-5 h-5 text-gray-800"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</div>
										<h4 className="text-lg font-semibold text-gray-900">
											Current Availability
										</h4>
									</div>
									<p className="text-gray-600">
										I'm currently available for freelance work and open to
										discussing new opportunities.
									</p>
								</motion.div>
							</div>
						</motion.div>

						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="contact-card p-8 bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-100">
								<div className="flex items-center gap-3 mb-8">
									<div className="w-12 h-12 rounded-full bg-[#98ff98]/20 flex items-center justify-center">
										<svg
											className="w-6 h-6 text-[#98ff98]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div>
										<h3 className="text-2xl font-bold text-gray-900">
											Send Me a Message
										</h3>
										<p className="text-gray-600 text-sm">
											I'll get back to you as soon as possible
										</p>
									</div>
								</div>

								<form
									ref={formRef}
									onSubmit={handleSubmit}
									className="space-y-6"
								>
									{/* Name Input */}
									<div className="relative group">
										<motion.label
											htmlFor="name"
											className={`absolute left-3 bg-white px-2 font-medium transition-all duration-300 z-20 ${
												focusedInput === "name" || form.name
													? "-top-2.5 text-sm text-[#98ff98]"
													: "top-4 text-gray-400"
											}`}
										>
											Full Name
										</motion.label>
										<motion.input
											type="text"
											id="name"
											name="name"
											value={form.name}
											onChange={handleChange}
											onFocus={() => setFocusedInput("name")}
											onBlur={() => setFocusedInput(null)}
											required
											className="block w-full px-4 py-4 mt-1 text-gray-900 bg-white/50 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-[#98ff98] transition-all duration-300 z-10"
										/>
									</div>

									{/* Email Input */}
									<div className="relative group">
										<motion.label
											htmlFor="email"
											className={`absolute left-3 bg-white px-2 font-medium transition-all duration-300 z-20 ${
												focusedInput === "email" || form.email
													? "-top-2.5 text-sm text-[#98ff98]"
													: "top-4 text-gray-400"
											}`}
										>
											Email Address
										</motion.label>
										<motion.input
											type="email"
											id="email"
											name="email"
											value={form.email}
											onChange={handleChange}
											onFocus={() => setFocusedInput("email")}
											onBlur={() => setFocusedInput(null)}
											required
											className="block w-full px-4 py-4 mt-1 text-gray-900 bg-white/50 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-[#98ff98] transition-all duration-300 z-10"
										/>
									</div>

									{/* Message Input */}
									<div className="relative group">
										<motion.label
											htmlFor="message"
											className={`absolute left-3 bg-white px-2 font-medium transition-all duration-300 z-20 ${
												focusedInput === "message" || form.message
													? "-top-2.5 text-sm text-[#98ff98]"
													: "top-4 text-gray-400"
											}`}
										>
											Your Message
										</motion.label>
										<motion.textarea
											id="message"
											name="message"
											rows="5"
											value={form.message}
											onChange={handleChange}
											onFocus={() => setFocusedInput("message")}
											onBlur={() => setFocusedInput(null)}
											required
											className="block w-full px-4 py-4 mt-1 text-gray-900 bg-white/50 border-2 border-gray-100 rounded-xl focus:ring-0 focus:border-[#98ff98] transition-all duration-300 z-10 resize-none"
										/>
										<div className="mt-2 flex items-start gap-2 text-xs text-gray-500">
											<svg
												className="w-4 h-4 text-[#98ff98] mt-0.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>
												Feel free to be as detailed as you'd like. The more
												information you provide, the better I can understand
												your needs.
											</span>
										</div>
									</div>

									{/* Submit Button */}
									<motion.button
										type="submit"
										disabled={loading}
										className="relative w-full px-8 py-4 mt-4 text-gray-900 bg-gradient-to-r from-[#98ff98] to-[#7aff7a] rounded-xl font-medium shadow-lg shadow-[#98ff98]/20 hover:shadow-xl hover:shadow-[#98ff98]/30 transform transition-all duration-300 overflow-hidden group disabled:opacity-70"
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.98 }}
									>
										<span className="relative z-10 flex items-center justify-center gap-2">
											{loading ? (
												<>
													<svg
														className="animate-spin h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														/>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														/>
													</svg>
													<span>Sending Message...</span>
												</>
											) : (
												<>
													<span>Send Message</span>
													<svg
														className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M14 5l7 7m0 0l-7 7m7-7H3"
														/>
													</svg>
												</>
											)}
										</span>
										<div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
									</motion.button>

									{/* Success/Error Messages */}
									<AnimatePresence>
										{success && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className="p-4 rounded-xl bg-[#98ff98]/10 border border-[#98ff98]/30 flex items-start gap-3"
											>
												<svg
													className="w-6 h-6 text-[#98ff98] mt-0.5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<div>
													<p className="font-medium text-gray-900">
														Message sent successfully!
													</p>
													<p className="text-sm text-gray-600 mt-1">
														Thank you for reaching out. I'll get back to you as
														soon as possible.
													</p>
												</div>
											</motion.div>
										)}
										{error && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
											>
												<svg
													className="w-6 h-6 text-red-500 mt-0.5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<div>
													<p className="font-medium text-red-700">
														Message could not be sent
													</p>
													<p className="text-sm text-red-600 mt-1">{error}</p>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</form>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
