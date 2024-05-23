import { useState } from "react";
import styles from "./Editor.module.css";
import Format from "./components/format/Format";
import PaddingAndSizes from "./components/padding-and-sizes";
import styled from "styled-components";
import Color from "./components/color/Color";
import { useFile } from "./contexts/FileContext";
import { animated, useSpring } from "@react-spring/web";

type TabProps = {
	active: boolean;
};

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
`;

const tabs = ["format", "padding and size", "color"];
const downloadOptions = ["Default", "Digital", "Print", "Favicon"];

function Editor() {
	const [activeTab, setActiveTab] = useState("format");
	const { fileDataUrl } = useFile();

	const spring = useSpring({
		from: { opacity: 0, transform: "scale(0.1)" },
		to: { opacity: 1, transform: "scale(1)" },
		config: {
			duration: 300,
		},
	});

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
						<img
							src={fileDataUrl || "/icons/test-logo-icon.svg"}
							alt="Current Image"
						/>
					</div>
					<div className={styles.originalImageContainer}>
						<img
							src={fileDataUrl || "/icons/test-logo-icon.svg"}
							alt="Original Image"
						/>
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
					{activeTab === "padding and size" && <PaddingAndSizes />}
					{activeTab === "color" && <Color />}
					<div className={styles.downloadContainer}>
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
}

export default Editor;
