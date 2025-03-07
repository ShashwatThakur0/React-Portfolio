// Import necessary hooks and libraries
import { useState, useRef } from "react";
import { motion } from "framer-motion"; // For animations
import emailjs from "@emailjs/browser"; // For email functionality

// Contact component for handling user messages
const Contact = () => {
	// Reference to the form element for EmailJS
	const formRef = useRef();
	// State to manage form input values
	const [form, setForm] = useState({
		name: "", // User's name
		email: "", // User's email
		message: "", // User's message
	});
	// State to manage loading and success states
	const [loading, setLoading] = useState(false); // Loading state during form submission
	const [success, setSuccess] = useState(false); // Success state after form submission

	// Handle input changes in the form
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value }); // Update form state with new values
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission
		setLoading(true); // Set loading state

		// Send email using EmailJS service
		emailjs
			.send(
				"YOUR_SERVICE_ID", // Your EmailJS service ID
				"YOUR_TEMPLATE_ID", // Your EmailJS template ID
				{
					from_name: form.name, // Sender's name
					to_name: "Shashwat Thakur", // Recipient's name
					from_email: form.email, // Sender's email
					to_email: "shashwat.thakur02@gmail.com", // Recipient's email
					message: form.message, // Message content
				},
				"YOUR_PUBLIC_KEY" // Your EmailJS public key
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
				console.log(error);
				alert("Something went wrong. Please try again.");
			});
	};

	return (
		<div className="relative min-h-screen bg-[#fafafa] overflow-hidden">
			{/* Background pattern - exactly the same as Home component */}
			<div className="absolute inset-0 bg-gradient-radial from-gray-100 to-transparent opacity-40" />

			{/* Main content */}
			<div className="container mx-auto px-4 py-16 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-2xl"
				>
					<h2 className="text-4xl font-bold text-black mb-2 text-shadow-xl">
						Get In Touch
					</h2>
					<p className="text-gray-700 mb-8">
						Feel free to reach out for collaborations, questions, or just to say
						hello!
					</p>

					{success ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg relative mb-6 shadow-md"
						>
							<h3 className="font-bold text-xl mb-2">Thank You!</h3>
							<p>
								Your message has been sent successfully. I'll get back to you as
								soon as possible.
							</p>
						</motion.div>
					) : (
						<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-black text-sm font-medium mb-2"
								>
									Your Name
								</label>
								<input
									type="text"
									name="name"
									value={form.name}
									onChange={handleChange}
									placeholder="John Doe"
									className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 bg-white/80 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all duration-300"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-black text-sm font-medium mb-2"
								>
									Your Email
								</label>
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									placeholder="john@example.com"
									className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 bg-white/80 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all duration-300"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-black text-sm font-medium mb-2"
								>
									Your Message
								</label>
								<textarea
									name="message"
									value={form.message}
									onChange={handleChange}
									placeholder="Hello, I'd like to talk about..."
									className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 bg-white/80 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-40 placeholder-gray-400 transition-all duration-300"
									required
								/>
							</div>

							<motion.button
								type="submit"
								disabled={loading}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className="w-full py-3 px-6 bg-[#98ff98] text-black font-medium rounded-full hover:bg-[#7aff7a] transition-all duration-300 shadow-lg hover:shadow-xl transform disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{loading ? (
									<span className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
											xmlns="http://www.w3.org/2000/svg"
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
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									</span>
								) : (
									"Send Message"
								)}
							</motion.button>
						</form>
					)}

					{/* Contact information */}
					<div className="mt-10 pt-8 border-t border-gray-200">
						<div className="flex flex-col md:flex-row justify-between gap-6">
							<div>
								<h3 className="text-black font-medium mb-2">Email</h3>
								<a
									href="mailto:shashwat.thakur02@gmail.com"
									className="text-gray-700 hover:text-[#98ff98] transition-colors"
								>
									shashwat.thakur02@gmail.com
								</a>
							</div>
							<div>
								<h3 className="text-black font-medium mb-2">Connect</h3>
								<div className="flex space-x-4">
									<a
										href="https://github.com/shashwatthakur0"
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-700 hover:text-black transition-colors"
									>
										GitHub
									</a>
									<a
										href="https://instagram.com/_.shashwat._thakur"
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-700 hover:text-black transition-colors"
									>
										Instagram
									</a>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
