import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function Timer({ formData }) {
	const [timeLeft, setTimeLeft] = useState();
	const timerRef = useRef(null);
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	useEffect(() => {
		setTimeLeft(formData?.totalTime * 60);
		const intervalId = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft <= 1) {
					clearInterval(intervalId);
					return 0; // Ensure it doesn't go negative
				} else {
					return prevTimeLeft - 1;
				}
			});
		}, 1000);

		// Clean up the interval to prevent memory leaks
		return () => clearInterval(intervalId);
	}, [formData]);

	return (
		<div className="flex items-center space-x-4 mt-4 md:mt-0">
			<div className="flex items-center">
				<span className="mr-1">Time Left:</span>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
				</svg>
				<span
					ref={timerRef}
					className="font-bold border size-14 flex items-center justify-center rounded-full"
					style={{
						backgroundImage: `linear-gradient(to bottom, green ${(timeLeft / (formData?.totalTime * 60)) * 100}%, red ${
							(timeLeft / (formData?.totalTime * 60)) * 100
						}%)`,
					}}
				>
					{minutes}:{seconds}
				</span>
			</div>
		</div>
	);
}

export default Timer;
