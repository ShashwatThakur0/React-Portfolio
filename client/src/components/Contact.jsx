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
					to_name: "Your Name", // Recipient's name
					from_email: form.email, // Sender's email
					to_email: "your.email@example.com", // Recipient's email
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
		<div className="container mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="max-w-2xl mx-auto"
			>
				<h2 className="text-4xl font-bold text-white mb-8 text-shadow">
					Contact Me
				</h2>

				{success ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
					>
						Thank you for your message! I'll get back to you soon.
					</motion.div>
				) : (
					<form ref={formRef} onSubmit={handleSubmit}>
						<div className="mb-6">
							<label
								htmlFor="name"
								className="block text-white text-sm font-bold mb-2"
							>
								Your Name
							</label>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="John Doe"
								className="shadow appearance-none border border-white/20 rounded w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
								required
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="email"
								className="block text-white text-sm font-bold mb-2"
							>
								Your Email
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="john@example.com"
								className="shadow appearance-none border border-white/20 rounded w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
								required
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="message"
								className="block text-white text-sm font-bold mb-2"
							>
								Your Message
							</label>
							<textarea
								name="message"
								value={form.message}
								onChange={handleChange}
								placeholder="Hello, I'd like to talk about..."
								className="shadow appearance-none border border-white/20 rounded w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32 placeholder-gray-400"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="btn btn-primary w-full"
						>
							{loading ? "Sending..." : "Send Message"}
						</button>
					</form>
				)}
			</motion.div>
		</div>
	);
};

export default Contact;
