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

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
