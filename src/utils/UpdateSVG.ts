export const updateSVGColor = (svgContent: string, color: string): string => {
	const parser = new DOMParser();
	const svg = parser.parseFromString(svgContent, "image/svg+xml");

	const paths = svg.querySelectorAll("path");
	paths.forEach((path) => {
		path.setAttribute("fill", color);
	});

	const serializer = new XMLSerializer();
	return serializer.serializeToString(svg);
};

export const updateSVGPaddings = (
	svgContent: string,
	paddingX: number,
	paddingY: number
): string => {
	const parser = new DOMParser();
	const svg = parser.parseFromString(svgContent, "image/svg+xml");

	const svgElement = svg.querySelector("svg");
	if (!svgElement) return svgContent;
	const viewBox = svgElement?.getAttribute("viewBox") || "0 0 0 0";

	const [x, y, width, height] = viewBox.split(" ").map(Number);
	console.log("original: ", x, y, width, height);

	if (isNaN(width) || isNaN(height)) {
		console.error("Invalid width or height in viewBox:", width, height);
		return svgContent;
	}

	const newWidth = width + paddingX * 2;
	const newHeight = height + paddingY * 2;
	const newX = x - paddingX;
	const newY = y - paddingY;

	console.log("new :", newX, newY, newWidth, newHeight);

	if (svgElement) {
		svgElement.setAttribute(
			"viewBox",
			`${newX} ${newY} ${newWidth} ${newHeight}`
		);
	}

	const serializer = new XMLSerializer();
	return serializer.serializeToString(svg);
};
