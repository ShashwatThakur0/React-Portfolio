import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Optimized smooth scrolling implementation
const smoothScrollTo = (y, duration = 300) => {
	const startingY = window.pageYOffset;
	const diff = y - startingY;
	let start;

	// Add will-change to body before animation
	document.body.style.willChange = "scroll-position";

	const step = (timestamp) => {
		if (!start) start = timestamp;
		const time = timestamp - start;
		const percent = Math.min(time / duration, 1);

		// Easing function for smoother animation
		const easeInOutCubic = (t) =>
			t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

		window.scrollTo({
			top: startingY + diff * easeInOutCubic(percent),
			behavior: "auto", // Use auto instead of smooth for better control
		});

		if (time < duration) {
			window.requestAnimationFrame(step);
		} else {
			// Remove will-change after animation completes
			document.body.style.willChange = "auto";
		}
	};

	window.requestAnimationFrame(step);
};

// Expose the smoothScrollTo function globally
window.smoothScrollTo = smoothScrollTo;

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

				// Use our optimized smooth scroll function
				smoothScrollTo(y);
			}
		});
	});

	// Add scroll margin to projects section
	setTimeout(() => {
		const projectsSection = document.getElementById("projects");
		if (projectsSection) {
			projectsSection.style.scrollMarginTop = "100px";
		}
	}, 500);

	// Expose scrollToSection globally for use in components
	window.scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			const yOffset = -80;
			const y =
				section.getBoundingClientRect().top + window.pageYOffset + yOffset;
			smoothScrollTo(y);
		}
	};
});

// Add passive event listeners for better scroll performance
window.addEventListener("load", () => {
	// Use passive listeners for touch and wheel events
	window.addEventListener("touchstart", () => {}, { passive: true });
	window.addEventListener("touchmove", () => {}, { passive: true });
	window.addEventListener("wheel", () => {}, { passive: true });
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
