import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { SketchPicker } from "react-color";

import styles from "./Color.module.css";

const Formats = [
	{
		name: "RGB (Digital)",
		extension: "png",
		checked: false,
		icon: "/icons/rgb.png",
		id: 1,
	},
	{
		name: "CMYK (Print)",
		extension: "jpeg",
		checked: false,
		icon: "/icons/cmyk.png",
		id: 2,
	},
];

type Color = {
	hex: string;
};

function Color() {
	const spring = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: {
			duration: 800,
		},
	});

	const [color, setColor] = useState("#fff");
	const handleColorChange = (color: Color) => {
		setColor(color.hex);
	};

	return (
		<animated.div style={spring} className={styles.rootContainer}>
			<div className={styles.colorContainer}>
				<div className={styles.formatContainer}>
					{Formats.map((format) => (
						<label key={format.id} className={styles.formatItem}>
							<div>
								<input type="checkbox" name={format.name} />
								<span className={styles.checkmark}></span>
							</div>
							<div className={styles.formatIcon}>
								<img
									style={{
										height: "32px",
										width: "32px",
										marginRight: ".3rem",
									}}
									src={format.icon}
									alt={format.name}
								/>
								{format.name}
							</div>
						</label>
					))}
				</div>
				<h3 className={styles.colorHeader}>Color</h3>
				<div className={styles.colorPicker}>
					<SketchPicker
						className={styles.sketchPicker}
						color={color}
						onChangeComplete={handleColorChange}
					/>
				</div>
			</div>
		</animated.div>
	);
}

export default Color;
