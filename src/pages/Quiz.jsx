import React, { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import { Data, DataProvider, useDataProvider } from '../context/DataContext';
import { useState } from 'react';
import { useRef } from 'react';

function QuizApp() {
	const navigate = useNavigate();
	const { formData, questions } = useDataProvider();
	const [currentQUestion, setCurrentQUestion] = useState();
	const [questionNumber, setQuestionNumber] = useState(1);
	const [options, setOptions] = useState([]);
	const quizProgressRef = useRef(null);
	const timerRef = useRef(null);
	const multipleQuestionRefs = useRef([]);

	const progressWidth = quizProgressRef?.current?.clientWidth / formData.totalQuestion;
	const [timeLeft, setTimeLeft] = useState();
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	useEffect(() => {
		if (Object.keys(formData).length === 0) {
			navigate('/form', { state: { message: 'Fill the form' } });
		}

		if (questions && questions.length > 0) {
			setCurrentQUestion(questions[questionNumber]);
		}
	}, [formData, questions]);

	useEffect(() => {
		setTimeLeft(formData?.totalTime * 60);
		const intervalId = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft <= 1) {
					clearInterval(intervalId);
					console.log('k');
					return 0; // Ensure it doesn't go negative
				} else {
					return prevTimeLeft - 1;
				}
			});
		}, 1000);

		// Clean up the interval to prevent memory leaks
		return () => clearInterval(intervalId);
	}, [formData]);

	const handelNextQuestion = () => {
		if (formData.totalQuestion > questionNumber) {
			setQuestionNumber((prev) => prev + 1);
		}
	};

	useEffect(() => {
		setCurrentQUestion(questions[questionNumber - 1]);
		console.log(questionNumber);
		// setOptions(currentQUestion?.incorrectAnswers.map((item) => item));
	}, [questionNumber]);

	const multipleQuestion = document.querySelectorAll('.multipleQuestion');
	// multipleQuestion.map((item) => {
	// 	item.onClick = () => {
	// 		alert()
	// 	}
	// })
	useEffect(() => {
		// Attach click event handlers to each multipleQuestion element
		multipleQuestionRefs.current.forEach((ref, index) => {
			ref.addEventListener('click', () => handleAnswerClick(ref));
		});

		// Clean up the event listeners when the component unmounts
		return () => {
			multipleQuestionRefs.current.forEach((ref, index) => {
				ref.removeEventListener('click', () => handleAnswerClick(ref));
			});
		};
	}, []);

	const handleAnswerClick = (ref) => {
		multipleQuestionRefs.current.forEach((ref, index) => {
			ref.style.backgroundColor = ' #FFF';
		});
		ref.style.backgroundColor = 'green';
	};
	return (
		<div className="min-h-screen  bg-gradient-to-r from-rose-200 via-white to-rose-200 flex flex-col ">
			<section className=" w-full mx-auto bg-white shadow-md  overflow-hidden">
				<header className="flex flex-col sm:flex-row justify-between items-center bg-[#cb8e89] text-white px-6 py-3">
					<div className="flex flex-col items-center space-y-2 sm:items-start">
						<strong>
							Question {questionNumber}/{formData && formData.totalQuestion && formData.totalQuestion}
						</strong>
						<div ref={quizProgressRef} className="w-64 h-2 bg-white rounded-full relative overflow-hidden">
							<div className="h-full bg-[#e4c9cc] absolute top-0 left-0" style={{ width: `${progressWidth * questionNumber}px` }}></div>
						</div>
					</div>

					<div className="flex items-center space-x-4 mt-4 md:mt-0">
						<div className="flex items-center">
							<span className="mr-1">Time Left:</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 mr-1 text-yellow-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
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
				</header>

				<div className="px-6 py-8">
					<div className="mb-8">
						<div className="questionText montserrat text-3xl mb-4">{currentQUestion?.question}?</div>
						<div className="categorySectionTag">
							<div className="flex flex-wrap gap-2">
								<span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg">Category: {formData?.category}</span>
								<span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg">Difficulty: {formData?.difficulty}</span>
								<span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg">Type: Multiple Choice</span>
								<span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg">Total Questions: {formData?.totalQuestion}</span>
							</div>
						</div>
					</div>
					<div className="multipleQuestionSection capitalize cursor-pointer flex flex-col gap-4">
						<div
							ref={(ref) => (multipleQuestionRefs.current[0] = ref)}
							className="multipleQuestion flex items-center h-16 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200"
						>
							<div className="bg-[#cb8e89] h-full flex items-center justify-center w-14 text-white font-bold">A</div>
							<p className="flex items-center px-4 w-full">{currentQUestion?.correctAnswer}</p>
						</div>
						{currentQUestion?.incorrectAnswers.map((item, index) => (
							<div
								ref={(ref) => (multipleQuestionRefs.current[index + 1] = ref)}
								key={index}
								className="multipleQuestion flex items-center h-16 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200"
							>
								<div className="bg-[#cb8e89] h-full flex items-center justify-center w-14 text-white font-bold">
									{String.fromCharCode(65 + index + 1)}
								</div>
								<p className="flex items-center px-4 w-full">{item}</p>
							</div>
						))}
					</div>
				</div>
				<footer className="flex justify-between px-6 py-4 bg-gray-100">
					<button className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring">
						Previous
					</button>
					{formData.totalQuestion === questionNumber ? (
						<button
							// onClick={handelNextQuestion}
							className="px-4 py-2 bg-[#cb8e89] text-white font-bold rounded-lg hover:bg-[#a35f59] focus:outline-none focus:ring"
						>
							Submit
						</button>
					) : (
						<button
							onClick={handelNextQuestion}
							className="px-4 py-2 bg-[#cb8e89] text-white font-bold rounded-lg hover:bg-[#a35f59] focus:outline-none focus:ring"
						>
							Next
						</button>
					)}
				</footer>
			</section>
		</div>
	);
}

export default QuizApp;
