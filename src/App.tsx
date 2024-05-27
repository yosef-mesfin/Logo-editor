import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import "./App.css";
import Modal from "./components/modal";
import Editor from "./Editor";

function App() {
	const dropContainerRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [fileSelected, setFileSelected] = useState(false);
	const ref = useRef<{ open: VoidFunction; close: VoidFunction }>();

	const spring = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 1000,
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
			if (fileInputRef.current.files?.[0]) {
				setFile(fileInputRef.current.files[0]);
				setFileSelected(true);
			}
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

		return () => {
			dropContainer.removeEventListener("dragover", handleDragOver, false);
			dropContainer.removeEventListener("dragenter", handleDragEnter, false);
			dropContainer.removeEventListener("dragleave", handleDragLeave, false);
			dropContainer.removeEventListener("drop", handleDrop, false);
		};
	}, []);

	useEffect(() => {
		if (file) {
			ref.current?.open();
		}
	}, [fileSelected]);

	return (
		<div className="rootContainer">
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
			{fileSelected && (
				<button className="editButton" onClick={() => ref.current?.open()}>
					Resume
				</button>
			)}
			<Modal ref={ref}>
				<Editor file={file} onClose={() => ref.current?.close()} />
			</Modal>
		</div>
	);
}

export default App;
