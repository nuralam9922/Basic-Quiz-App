import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Timer({ formData }) {
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(formData?.totalTime * 60 || 0);
	const timerRef = useRef(null);

	useEffect(() => {
		if (timeLeft <= 0) {
			clearInterval(timerRef.current);
			navigate('/result');
		}
	}, [timeLeft, navigate]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft <= 1) {
					return 0; // Ensure it doesn't go negative
				} else {
					return prevTimeLeft - 1;
				}
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [formData]);

	const percentageLeft = (timeLeft / (formData?.totalTime * 60)) * 100;

	return (
		<div className="flex flex-col  space-y-2 sm:items-start">
			<div>
				<strong>Time Left: </strong>
				{'    '}
				<span className="font-bold">
					{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
				</span>
			</div>
			<div className="w-32 md:w-64 h-2 bg-red-500 rounded-full relative overflow-hidden">
				<div className="h-full bg-[#e4c9cc] absolute top-0 left-0" style={{ width: `${percentageLeft}%`, transition: 'width 1s' }}></div>
			</div>
		</div>
	);
}

export default Timer;
