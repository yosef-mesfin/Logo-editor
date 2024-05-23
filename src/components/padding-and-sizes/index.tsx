import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

import styles from "./index.module.css";
import RangeSlider from "../RangeSlider";

function PaddingAndSizes() {
	const spring = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 800,
		},
	});

	const [selected, setSelected] = useState("Dimention");

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(e.target.value);
	};

	const renderInputs = () => {
		if (selected === "Dimention") {
			return (
				<div className={styles.dimentionWrapper}>
					<input
						className={styles.inputDimention}
						type="number"
						value="width"
						placeholder="Width (px)"
					/>
					<span>X</span>
					<input
						className={styles.inputDimention}
						type="number"
						value="height"
						placeholder="Height (px)"
					/>
				</div>
			);
		} else {
			return (
				<input
					className={styles.inputWidthOrHeight}
					type="number"
					value={selected === "Height" ? "height" : "width"}
					placeholder={selected === "Height" ? "Height (px)" : "Width (px)"}
				/>
			);
		}
	};

	return (
		<animated.div style={spring}>
			<div className={styles.rootContainer}>
				<div className={styles.paddingContainer}>
					<h3 className={styles.paddingHeader}>Padding</h3>
					<div className={styles.paddingX}>
						<h4 className={styles.paddingXTitle}>X Padding</h4>
						<RangeSlider min={0} max={100} value={0} step={1} />
					</div>
					<div className={styles.paddingY}>
						<h4 className={styles.paddingYTitle}>Y Padding</h4>
						<RangeSlider min={0} max={100} value={0} step={1} />
					</div>
				</div>
				<div className={styles.sizesContainer}>
					<h3 className={styles.sizesHeader}>Sizes</h3>
					<div className={styles.sizesHandler}>
						<select className={styles.select} onChange={handleSelectChange}>
							<option>Dimention</option>
							<option>Width</option>
							<option>Height</option>
						</select>
						{renderInputs()}
						<button className={styles.addButton}>add</button>
					</div>
				</div>
			</div>
		</animated.div>
	);
}
export default PaddingAndSizes;
