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

function Color() {
	return (
		<div className={styles.rootContainer}>
			<div className={styles.formatContainer}>
				{Formats.map((format) => (
					<label key={format.id} className={styles.formatItem}>
						<div>
							<input type="checkbox" name={format.name} />
							<span className={styles.checkmark}></span>
						</div>
						<div className={styles.formatIcon}>
							<img
								style={{ height: "32px", width: "32px", marginRight: ".3rem" }}
								src={format.icon}
								alt={format.name}
							/>
							{format.name}
						</div>
					</label>
				))}
			</div>
		</div>
	);
}

export default Color;
