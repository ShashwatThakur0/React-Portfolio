// Import necessary hooks and libraries
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const ParticleBackground = () => {
	useEffect(() => {
		const canvas = document.getElementById("particle-canvas");
		const ctx = canvas.getContext("2d");
		let particles = [];
		let animationFrameId;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		class Particle {
			constructor() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.size = Math.random() * 5 + 1;
				this.speedX = Math.random() * 3 - 1.5;
				this.speedY = Math.random() * 3 - 1.5;
				this.color = `rgba(152, 255, 152, ${Math.random() * 0.5})`;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				if (this.size > 0.2) this.size -= 0.1;

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
			particles = [];
			for (let i = 0; i < 50; i++) {
				particles.push(new Particle());
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach((particle, index) => {
				particle.update();
				particle.draw();
				if (particle.size <= 0.2) {
					particles.splice(index, 1);
					particles.push(new Particle());
				}
			});
			animationFrameId = requestAnimationFrame(animate);
		};

		init();
		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			id="particle-canvas"
			className="absolute inset-0 pointer-events-none"
			style={{ opacity: 0.6 }}
		/>
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

		emailjs
			.send(
				"YOUR_SERVICE_ID",
				"YOUR_TEMPLATE_ID",
				{
					from_name: form.name,
					to_name: "Shashwat Thakur",
					from_email: form.email,
					to_email: "shashwat.thakur02@gmail.com",
					message: form.message,
				},
				"YOUR_PUBLIC_KEY"
			)
			.then(() => {
				setLoading(false);
				setSuccess(true);
				setForm({
					name: "",
					email: "",
					message: "",
				});
			})
			.catch((error) => {
				setLoading(false);
				setError("Failed to send message. Please try again.");
				console.error(error);
			});
	};

	return (
		<div className="relative min-h-screen bg-[#fafafa] py-24 overflow-hidden">
			{/* Animated background */}
			<ParticleBackground />
			<div className="absolute inset-0 bg-gradient-radial from-gray-100 to-transparent opacity-40" />

			<div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
				<div className="space-y-24">
					{/* Section Header */}
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#98ff98]/20 to-[#7aff7a]/20 backdrop-blur-sm rounded-full text-sm text-gray-800 font-medium mb-4 border border-[#98ff98]/30 hover:border-[#98ff98]/50 transition-all duration-300 hover:scale-105"
						>
							GET IN TOUCH
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-6xl font-bold tracking-tight text-gray-900 mb-4"
						>
							Let's Connect
						</motion.h2>
						<motion.div
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="w-24 h-1.5 bg-gradient-to-r from-[#98ff98] to-[#7aff7a] mx-auto mb-8 rounded-full"
						></motion.div>
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
								<h3 className="text-2xl font-bold text-gray-900">
									Let's Build Something Amazing Together
								</h3>
								<p className="text-gray-600 leading-relaxed">
									I'm always open to discussing new projects, creative ideas, or
									opportunities to be part of your visions. Whether you have a
									question or just want to say hi, I'll try my best to get back
									to you!
								</p>
							</div>

							<div className="space-y-6">
								{/* Contact Methods */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#98ff98]/50 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-500"
								>
									<h4 className="text-lg font-semibold text-gray-900 mb-4">
										Contact Information
									</h4>
									<div className="space-y-4">
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
											href="https://instagram.com/_.shashwat._thakur"
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
													<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
												</svg>
											</div>
											<span className="group-hover:text-[#98ff98] transition-colors duration-300">
												Instagram
											</span>
										</motion.a>
									</div>
								</motion.div>

								{/* Working Hours */}
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#98ff98]/50 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-500"
								>
									<h4 className="text-lg font-semibold text-gray-900 mb-4">
										Availability
									</h4>
									<p className="text-gray-600">
										I'm typically available Monday through Friday, 9:00 AM to
										6:00 PM IST. I'll respond to your message as soon as
										possible!
									</p>
								</motion.div>
							</div>
						</motion.div>

						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<AnimatePresence mode="wait">
								{success ? (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:border-[#98ff98]/50 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-500"
									>
										<div className="text-center space-y-4">
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{ type: "spring", duration: 0.5 }}
												className="w-16 h-16 bg-[#98ff98]/20 rounded-full flex items-center justify-center mx-auto"
											>
												<svg
													className="w-8 h-8 text-[#98ff98]"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</motion.div>
											<h3 className="text-2xl font-bold text-gray-900">
												Message Sent!
											</h3>
											<p className="text-gray-600">
												Thank you for reaching out. I'll get back to you soon!
											</p>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => setSuccess(false)}
												className="px-6 py-3 bg-[#98ff98]/10 text-gray-900 rounded-lg hover:bg-[#98ff98]/20 transition-all duration-300"
											>
												Send Another Message
											</motion.button>
										</div>
									</motion.div>
								) : (
									<motion.form
										ref={formRef}
										onSubmit={handleSubmit}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg space-y-6 hover:border-[#98ff98]/50 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-500"
									>
										{error && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
											>
												{error}
											</motion.div>
										)}

										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Your Name
											</label>
											<motion.div
												animate={{
													scale: focusedInput === "name" ? 1.02 : 1,
													borderColor:
														focusedInput === "name" ? "#98ff98" : "transparent",
												}}
											>
												<input
													type="text"
													name="name"
													id="name"
													value={form.name}
													onChange={handleChange}
													onFocus={() => setFocusedInput("name")}
													onBlur={() => setFocusedInput(null)}
													required
													className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#98ff98] focus:ring-1 focus:ring-[#98ff98] transition-all duration-300"
													placeholder="John Doe"
												/>
											</motion.div>
										</div>

										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Your Email
											</label>
											<motion.div
												animate={{
													scale: focusedInput === "email" ? 1.02 : 1,
													borderColor:
														focusedInput === "email"
															? "#98ff98"
															: "transparent",
												}}
											>
												<input
													type="email"
													name="email"
													id="email"
													value={form.email}
													onChange={handleChange}
													onFocus={() => setFocusedInput("email")}
													onBlur={() => setFocusedInput(null)}
													required
													className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#98ff98] focus:ring-1 focus:ring-[#98ff98] transition-all duration-300"
													placeholder="john@example.com"
												/>
											</motion.div>
										</div>

										<div>
											<label
												htmlFor="message"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Your Message
											</label>
											<motion.div
												animate={{
													scale: focusedInput === "message" ? 1.02 : 1,
													borderColor:
														focusedInput === "message"
															? "#98ff98"
															: "transparent",
												}}
											>
												<textarea
													name="message"
													id="message"
													value={form.message}
													onChange={handleChange}
													onFocus={() => setFocusedInput("message")}
													onBlur={() => setFocusedInput(null)}
													required
													rows={6}
													className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#98ff98] focus:ring-1 focus:ring-[#98ff98] transition-all duration-300 resize-none"
													placeholder="Hello, I'd like to talk about..."
												/>
											</motion.div>
										</div>

										<motion.button
											type="submit"
											disabled={loading}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="w-full px-8 py-4 bg-gradient-to-r from-[#98ff98] to-[#7aff7a] text-gray-900 rounded-lg font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(152,255,152,0.4)]"
										>
											<motion.div
												className="absolute inset-0 bg-white/20"
												initial={{ scale: 0 }}
												whileHover={{ scale: 1 }}
												transition={{ duration: 0.3 }}
											/>
											<span className="relative">
												{loading ? (
													<div className="flex items-center justify-center">
														<div className="w-5 h-5 border-2 border-gray-600/30 border-t-gray-600 rounded-full animate-spin mr-2" />
														Sending...
													</div>
												) : (
													"Send Message"
												)}
											</span>
										</motion.button>
									</motion.form>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
