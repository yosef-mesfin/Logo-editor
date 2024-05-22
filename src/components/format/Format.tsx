import styles from "./Format.module.css";
const Formats = [
	{
		name: "PNG",
		extension: "png",
		checked: false,
		icon: "/icons/icons8-jpg-32.png",
		id: 1,
	},
	{
		name: "JPEG",
		extension: "jpeg",
		checked: false,
		icon: "/icons/icons8-jpeg-32.png",
		id: 2,
	},
	{
		name: "SVG",
		extension: "svg",
		checked: false,
		icon: "/icons/icons8-svg-32.png",
		id: 3,
	},
	{
		name: "PDF",
		extension: "pdf",
		checked: false,
		icon: "/icons/icons8-pdf-32.png",
		id: 4,
	},
	{
		name: "EPS",
		extension: "eps",
		checked: false,
		icon: "/icons/icons8-eps-32.png",
		id: 5,
	},
	{
		name: "ICO",
		extension: "ico",
		checked: false,
		icon: "/icons/icons8-ico-32.png",
		id: 6,
	},
];

function Format() {
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
							<img src={format.icon} alt={format.name} />
							{format.name}
						</div>
					</label>
				))}
			</div>
		</div>
	);
}

export default Format;
