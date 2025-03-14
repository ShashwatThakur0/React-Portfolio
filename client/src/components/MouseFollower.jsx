import { useState, useEffect } from "react";
import CircularText from "./CircularText";

const MouseFollower = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: e.clientX - 30,
				y: e.clientY - 30,
			});
		};

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
