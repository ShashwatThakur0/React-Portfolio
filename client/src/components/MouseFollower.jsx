import { useState, useEffect } from "react";
import CircularText from "./CircularText";

const MouseFollower = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e) => {
		setMousePosition({
			x: e.clientX - 40, // Reduced from 60 to 40 for smaller size
			y: e.clientY - 40, // Reduced from 60 to 40 for smaller size
		});
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<CircularText
			text="SCROLL*ME*"
			onHover="speedUp"
			spinDuration={5}
			style={{
				left: mousePosition.x,
				top: mousePosition.y,
				pointerEvents: "none",
			}}
		/>
	);
};

export default MouseFollower;
