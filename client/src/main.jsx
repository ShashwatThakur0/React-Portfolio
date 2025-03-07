import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Global fix for smooth scrolling
document.addEventListener("DOMContentLoaded", () => {
	// Fix for smooth scrolling to anchors
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href").substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				const yOffset = -80;
				const y =
					targetElement.getBoundingClientRect().top +
					window.pageYOffset +
					yOffset;

				window.scrollTo({
					top: y,
					behavior: "smooth",
				});
			}
		});
	});
});

// Make sure the projects section is properly accessible
document.addEventListener("DOMContentLoaded", () => {
	// Add a specific style to the projects section
	setTimeout(() => {
		const projectsSection = document.getElementById("projects");
		if (projectsSection) {
			projectsSection.style.scrollMarginTop = "100px";
		}

		// Add a direct click handler to the button
		const button = document.getElementById("seeProjectsButton");
		if (button) {
			button.addEventListener(
				"click",
				(e) => {
					e.preventDefault();
					e.stopPropagation();

					const projectsSection = document.getElementById("projects");
					if (projectsSection) {
						const yOffset = -80;
						const y =
							projectsSection.getBoundingClientRect().top +
							window.pageYOffset +
							yOffset;

						window.scrollTo({
							top: y,
							behavior: "smooth",
						});
					}

					return false;
				},
				true
			); // Use capture phase to ensure this handler runs first
		}
	}, 1000); // Wait for everything to be fully loaded
});

// Initialize the React application
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
