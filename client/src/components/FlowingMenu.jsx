import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

import "./FlowingMenu.css";

function FlowingMenu({ items = [], onItemClick }) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return (
		<div className="menu-wrap">
			<nav className="menu">
				{items.map((item, idx) => (
					<MenuItem
						key={idx}
						{...item}
						onClick={onItemClick}
						isMobile={isMobile}
					/>
				))}
			</nav>
		</div>
	);
}

function MenuItem({ text, image, icon, description, onClick, isMobile }) {
	const itemRef = React.useRef(null);
	const marqueeRef = React.useRef(null);
	const marqueeInnerRef = React.useRef(null);

	const animationDefaults = { duration: 0.6, ease: "expo" };

	const findClosestEdge = (mouseX, mouseY, width, height) => {
		const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
		const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
		return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
	};

	const distMetric = (x, y, x2, y2) => {
		const xDiff = x - x2;
		const yDiff = y - y2;
		return xDiff * xDiff + yDiff * yDiff;
	};

	const handleMouseEnter = (ev) => {
		if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
			return;
		const rect = itemRef.current.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;
		const edge = findClosestEdge(x, y, rect.width, rect.height);

		gsap
			.timeline({ defaults: animationDefaults })
			.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
			.set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
			.to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
	};

	const handleMouseLeave = (ev) => {
		if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
			return;
		const rect = itemRef.current.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;
		const edge = findClosestEdge(x, y, rect.width, rect.height);

		gsap
			.timeline({ defaults: animationDefaults })
			.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
			.to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
	};

	const handleClick = () => {
		if (onClick) {
			onClick(text);
		}
	};

	// Adjust the number of repetitions based on screen size
	const repeats = isMobile ? 2 : 4;

	const repeatedMarqueeContent = Array.from({ length: repeats }).map(
		(_, idx) => (
			<React.Fragment key={idx}>
				<span className="marquee__text">{text}</span>
				<div className="marquee__icon">{icon}</div>
				<div className="marquee__description">{description}</div>
				{image && (
					<div
						className="marquee__img"
						style={{ backgroundImage: image ? `url(${image})` : "none" }}
					/>
				)}
			</React.Fragment>
		)
	);

	return (
		<div
			className={`menu__item ${isMobile ? "menu__item--mobile" : ""}`}
			ref={itemRef}
		>
			<div
				className="menu__item-link"
				onMouseEnter={isMobile ? null : handleMouseEnter}
				onMouseLeave={isMobile ? null : handleMouseLeave}
				onClick={handleClick}
			>
				<span className="menu__item-icon">{icon}</span>
				<span className="menu__item-text">{text}</span>
			</div>
			<div
				className={`marquee ${isMobile ? "marquee--visible" : ""}`}
				ref={marqueeRef}
			>
				<div className="marquee__inner-wrap" ref={marqueeInnerRef}>
					<div className="marquee__inner" aria-hidden="true">
						{repeatedMarqueeContent}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FlowingMenu;
