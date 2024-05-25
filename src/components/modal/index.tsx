import React, {
	SyntheticEvent,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react";
import styles from "./index.module.css";

interface ModalProps {
	children: React.ReactElement;
}
const Modal = forwardRef(({ children }: ModalProps, ref: any) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleClick = (event: SyntheticEvent<HTMLDialogElement>) => {
		if (event.currentTarget === event.target) {
			dialogRef.current?.close();
		}
	};

	useImperativeHandle(ref, () => ({
		open: () => dialogRef.current?.showModal(),
		close: () => dialogRef.current?.close(),
	}));

	return (
		<dialog
			className={styles.modalOverlay}
			ref={dialogRef}
			open={false}
			onClick={handleClick}
		>
			{children}
		</dialog>
	);
});

export default Modal;
