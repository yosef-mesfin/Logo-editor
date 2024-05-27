export const updateSVG = (svgContent: string, color: string): string => {
	const parser = new DOMParser();
	const svg = parser.parseFromString(svgContent, "image/svg+xml");

	const paths = svg.querySelectorAll("path");
	paths.forEach((path) => {
		path.setAttribute("fill", color);
	});

	const serializer = new XMLSerializer();
	return serializer.serializeToString(svg);
};
