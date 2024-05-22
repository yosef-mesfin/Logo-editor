import React, { useState, useEffect, useRef } from "react";
import styles from "./RangeSlider.module.css";

type RangeSliderProps = {
	min: number;
	max: number;
	value: number;
	step: number;
};

function RangeSlider({ min, max, value, step }: RangeSliderProps) {
	const [SliderRange, setSliderRange] = useState<number>(value);
	const [inputValue, setInputValue] = useState<number>(value);
	const sliderRef = useRef<HTMLInputElement>(null);

	const handleSliderInput = () => {
		const range = max - min;
		const distance = sliderRef.current.value - min;
		const percentage = (distance / range) * 100;

		setSliderRange(percentage);
		setInputValue(sliderRef.current.value);
	};

	const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (value < min) {
			setInputValue(min);
			setSliderRange(0);
		} else {
			setInputValue(value > max ? max : value);
			setSliderRange(((value - min) / (max - min)) * 100);
		}
		setInputValue(value);
		setSliderRange(((value - min) / (max - min)) * 100);
	};

	useEffect(() => {
		handleSliderInput();
	}, [sliderRef]);

	return (
		<div className={styles.rangeSlider}>
			<div className={styles.sliderValues}>
				<small>{min}</small>
				<input
					type="number"
					className={styles.numberInput}
					value={inputValue}
					min={min}
					max={max}
					step={step}
					onChange={handleNumberInput}
				/>
				<small>{max}</small>
			</div>
			<div className={styles.sliderContainer}>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={inputValue}
					ref={sliderRef}
					className={styles.slider}
					onChange={handleSliderInput}
				/>
				<div
					className={styles.sliderThumb}
					style={{ left: `calc(${SliderRange}% - 0.5em)` }}
				></div>
				<div
					className={styles.sliderTrack}
					style={{ width: `${SliderRange}%` }}
				></div>
			</div>
		</div>
	);
}

export default RangeSlider;
