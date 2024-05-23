import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFile } from "./contexts/FileContext";
import { animated, useSpring } from "@react-spring/web";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const dropContainerRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { file, setFile } = useFile();
	const [fileSelected, setFileSelected] = useState(false);
	const [startSlideOut, setStartSlideOut] = useState(false);

	const spring = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 1000,
		},
	});

	const slideOut = useSpring({
		transform: startSlideOut ? "translateX(-100%)" : "translateX(0%)",
		config: {
			duration: 500,
		},
		onRest: () => {
			if (startSlideOut) {
				navigate("/editor");
			}
		},
	});

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	};

	const handleDragEnter = (e: DragEvent) => {
		e.preventDefault();
		dropContainerRef.current?.classList.add("drag-active");
	};

	const handleDragLeave = (e: DragEvent) => {
		e.preventDefault();
		dropContainerRef.current?.classList.remove("drag-active");
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		dropContainerRef.current?.classList.remove("drag-active");
		if (fileInputRef.current) {
			fileInputRef.current.files = e.dataTransfer?.files || null;
		}
	};

	useEffect(() => {
		const dropContainer = dropContainerRef.current;
		const fileInput = fileInputRef.current;

		if (!dropContainer || !fileInput) return;

		dropContainer.addEventListener("dragover", handleDragOver, false);
		dropContainer.addEventListener("dragenter", handleDragEnter, false);
		dropContainer.addEventListener("dragleave", handleDragLeave, false);
		dropContainer.addEventListener("drop", handleDrop, false);

		// Cleanup event listeners on component unmount
		return () => {
			dropContainer.removeEventListener("dragover", handleDragOver, false);
			dropContainer.removeEventListener("dragenter", handleDragEnter, false);
			dropContainer.removeEventListener("dragleave", handleDragLeave, false);
			dropContainer.removeEventListener("drop", handleDrop, false);
		};
	}, []);

	useEffect(() => {
		if (file) {
			setFileSelected(true);
		}
	}, [fileSelected]);

	return (
		<animated.div style={slideOut} className="rootContainer">
			<h1 className="title">Generate Logo variation in seconds.</h1>
			<animated.div style={spring} className="uploadContainer">
				<div ref={dropContainerRef} className="dropBox" id="dropbox">
					<span className="uploadTitle">Drop files here</span>
					or
					<input
						className="inputFile"
						type="file"
						ref={fileInputRef}
						id="file-selector"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								setFile(file);
								setFileSelected(true);
							}
						}}
					/>
				</div>
			</animated.div>
			<button
				disabled={!fileSelected}
				className="nextButton"
				onClick={() => setStartSlideOut(true)}
			></button>
		</animated.div>
	);
}

export default App;
