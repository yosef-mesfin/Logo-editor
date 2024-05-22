import {
	ReactNode,
	useEffect,
	createContext,
	useContext,
	useState,
} from "react";

interface FileContextType {
	file: File | null;
	fileDataUrl: string | null;
	setFile: (files: File) => void;
	setFileDataUrl: (dataUrl: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFile = () => {
	const context = useContext(FileContext);
	if (!context) {
		throw new Error("useFile must be used within a FileProvider");
	}
	return context;
};

export const FileProvider = ({ children }: { children: ReactNode }) => {
	const [file, setFile] = useState<File | null>(null);
	const [fileDataUrl, setFileDataUrl] = useState<string | null>(() =>
		localStorage.getItem("fileDataUrl")
	);

	useEffect(() => {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setFileDataUrl(e.target?.result as string);
				localStorage.setItem("fileDataUrl", e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	}, [file]);

	useEffect(() => {
		const savedFileDataUrl = localStorage.getItem("fileDataUrl");
		if (savedFileDataUrl) {
			setFileDataUrl(savedFileDataUrl);
		}
	}, []);

	return (
		<FileContext.Provider
			value={{ file, setFile, fileDataUrl, setFileDataUrl }}
		>
			{children}
		</FileContext.Provider>
	);
};
