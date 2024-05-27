export const ReadFile = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				resolve(e.target.result as string);
			} else {
				reject("Failed to read file");
			}
		};
		reader.onerror = (e) => {
			reject(e);
		};
		reader.readAsText(file);
	});
};
