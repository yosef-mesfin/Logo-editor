import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFile } from "./contexts/FileContext";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const dropContainerRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { file, setFile } = useFile();
	const [fileSelected, setFileSelected] = useState(false);
	console.log("🚀 ~ App ~ file:", file);
	console.log("🚀 ~ App ~ fileSelected:", fileSelected);

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
		<div className="rootContainer">
			<h1 className="title">Generate Logo variation in seconds.</h1>
			<div className="uploadContainer">
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
			</div>
			<button
				disabled={!fileSelected}
				className="nextButton"
				onClick={() => navigate("/editor")}
			>
				Next
			</button>
		</div>
	);
}

export default App;
