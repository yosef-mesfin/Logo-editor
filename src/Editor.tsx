import React, { useEffect, useState } from "react";
import styles from "./Editor.module.css";
import Format from "./components/format/Format";
import PaddingAndSizes from "./components/padding-and-sizes";
import styled from "styled-components";
import Color from "./components/color/Color";
import { animated, useSpring } from "@react-spring/web";
import { updateSVGColor, updateSVGPaddings } from "./utils/UpdateSVG";
import { ReadFile } from "./utils/ReadFile";

interface TabProps {
	active: boolean;
}

const Tab = styled.button<TabProps>`
	background: #333;
	border: none;
	width: 100%;
	font-size: 1.2rem;
	text-align: center;
	padding: 0.6rem;
	border: 2px solid transparent;
	outline: 0;
	color: #b3b3b3;
	cursor: pointer;
	${({ active }: { active: boolean }) =>
		active &&
		`
    border-bottom: 2px solid #2ecc71;
    color: #fff;
  `};
	@media (max-width: 768px) {
		font-size: 1rem;
		padding: 0.5rem;
	}

	@media (max-width: 480px) {
		font-size: 0.9rem;
		padding: 0.4rem;
	}
`;

const tabs = ["format", "padding and size", "color"];
const downloadOptions = ["Default", "Digital", "Print", "Favicon"];

type EditorProps = {
	onClose: () => void;
	file: File | null;
};

const Editor: React.FC<EditorProps> = ({ onClose, file }) => {
	const [activeTab, setActiveTab] = useState("format");
	const [svgContent, setSvgContent] = useState<string | null>(null);
	const [color, setColor] = useState<string>("#fff");
	const [paddingX, setPaddingX] = useState<number>(0);
	const [paddingY, setPaddingY] = useState<number>(0);

	const spring = useSpring({
		from: { opacity: 0, transform: "scale(0.1)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: {
			duration: 300,
		},
	});

	useEffect(() => {
		if (file) {
			ReadFile(file)
				.then((data) => {
					setSvgContent(data);
				})
				.catch((error) => {
					console.error("Error Reading File:", error);
				});
		}
	}, [file]);

	useEffect(() => {
		if (svgContent) {
			const updatedSVGWithPadding = updateSVGPaddings(
				svgContent,
				paddingX,
				paddingY
			);
			setSvgContent(updatedSVGWithPadding);
		}
	}, [paddingX, paddingY]);

	useEffect(() => {
		if (svgContent) {
			const updatedSVG = updateSVGColor(svgContent, color);
			setSvgContent(updatedSVG);
		}
	}, [color]);

	return (
		<animated.div style={spring} className={styles.rootContainer}>
			<div className={styles.editorContainer}>
				<div className={styles.editorLeft}>
					<div className={styles.currentImageContainer}>
						<img
							src="/icons/icons8-edit-32.png"
							alt="Edit"
							className={styles.editIcon}
						/>
						{svgContent && (
							<div
								className={styles.svgContainer}
								dangerouslySetInnerHTML={{ __html: svgContent }}
							/>
						)}
					</div>
					<div className={styles.originalImageContainer}>
						<img src={"/icons/test-logo-icon.svg"} alt="Original Image" />
					</div>
				</div>
				<div className={styles.editorRight}>
					<div className={styles.editorControls}>
						{tabs.map((tab) => (
							<Tab
								key={tab}
								active={activeTab === tab}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</Tab>
						))}
					</div>
					{activeTab === "format" && <Format />}
					{activeTab === "padding and size" && (
						<PaddingAndSizes
							setPaddingX={setPaddingX}
							setPaddingY={setPaddingY}
						/>
					)}
					{activeTab === "color" && <Color setColor={setColor} />}
					<div className={styles.downloadContainer}>
						<button className={styles.cancelButton} onClick={onClose}>
							Cancel
						</button>
						<select>
							{downloadOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						<button className={styles.downloadButton}>Download</button>
					</div>
				</div>
			</div>
		</animated.div>
	);
};

export default Editor;
