import React, { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import { Data, DataProvider, useDataProvider } from '../context/DataContext';
import { useState } from 'react';
import { useRef } from 'react';
import Timer from '../components/Timer';

function QuizApp() {
	const navigate = useNavigate();
	// importing the global states form context api
	const { formData, questions, userAnswer, setUserAnswer } = useDataProvider();

	const [currentQUestion, setCurrentQUestion] = useState();
	const [questionNumber, setQuestionNumber] = useState(1);
	const [options, setOptions] = useState([]);
	const quizProgressRef = useRef(null);

	const progressWidth = quizProgressRef?.current?.clientWidth / formData.totalQuestion;

	// / Check if the form data is not available and redirect to the form page
	useEffect(() => {
		if (Object.keys(formData).length === 0) {
			navigate('/form', { state: { message: 'Fill the form' } });
		}

		if (questions && questions.length > 0) {
			setCurrentQUestion(questions[questionNumber]);
		}
	}, [formData, questions]);

	useEffect(() => {
		setCurrentQUestion(questions[questionNumber - 1]);
		console.log(questionNumber);
		// setOptions(currentQUestion?.incorrectAnswers.map((item) => item));
	}, [questionNumber]);

	const handelNextQuestion = () => {
		// reset previous selected box
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			item.classList.remove('bg-gray-300');
		});

		if (formData.totalQuestion > questionNumber) {
			setQuestionNumber((prev) => prev + 1);
		}

	};

	const handelPrevQuestion = () => {
		// reset previous selected box
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			item.classList.remove('bg-gray-300');
		});

		if (1 < questionNumber) {
			setQuestionNumber((prev) => prev - 1);
		}
	};

	const handleAnswerClick = (answer, index) => {
		// This logic is created to assist me in interacting with ChatGPT.
		const existingQuestionIndex = userAnswer.findIndex((item) => item?.question === currentQUestion?.question);

		if (existingQuestionIndex !== -1) {
			setUserAnswer((prev) => {
				const updatedAnswer = [...prev];
				updatedAnswer[existingQuestionIndex].userQuestionAnswer = answer;
				return updatedAnswer;
			});
		} else {
			setUserAnswer((prev) => [
				...prev,
				{
					question: currentQUestion?.question,
					userQuestionAnswer: answer,
					correctAnswer: currentQUestion?.correctAnswer,
				},
			]);
		}

		// Update the style of the clicked answer box to indicate selection
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			// reset previous selected box
			item.classList.remove('bg-gray-300');
			if (i === index) {
				item.classList.add('bg-gray-300');
			}
		});
	};

	return (
		<div className="min-h-screen  bg-gradient-to-r from-rose-200 via-white to-rose-200 flex flex-col ">
			<section className=" w-full mx-auto bg-white shadow-md  overflow-hidden">
				{/* header section */}
				<header className="flex flex-col sm:flex-row justify-between items-center bg-[#cb8e89] text-white px-6 py-3">
					<div className="flex flex-col items-center space-y-2 sm:items-start">
						<strong>
							Question {questionNumber}/{formData && formData.totalQuestion && formData.totalQuestion}
						</strong>
						<div ref={quizProgressRef} className="w-64 h-2 bg-white rounded-full relative overflow-hidden">
							<div className="h-full bg-[#e4c9cc] absolute top-0 left-0" style={{ width: `${progressWidth * questionNumber}px` }}></div>
						</div>
					</div>

					{/* timer component */}

					<Timer formData={formData} />
				</header>

				<div className="px-6 py-8">
					<div className="mb-8">
						<div className="questionText montserrat text-3xl mb-4">{currentQUestion?.question}?</div>
						<div className="categorySectionTag">
							<div className="flex flex-wrap gap-2">
								<span className="px-2 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg">Category: {formData?.category}</span>
								<span className="px-2 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg">Difficulty: {formData?.difficulty}</span>
								<span className="px-2 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg">Type: Multiple Choice</span>
								<span className="px-2 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg">Total Questions: {formData?.totalQuestion}</span>
							</div>
						</div>
					</div>
					<div className="multipleQuestionSection capitalize cursor-pointer flex flex-col gap-4">
						<div
							onClick={(e) => handleAnswerClick(e.currentTarget.dataset.value)}
							data-value={currentQUestion?.correctAnswer}
							className={`multipleQuestion flex items-center min-h-20 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200`}
						>
							<div className="bg-[#cb8e89] h-full flex items-center justify-center w-14 min-h-20 text-white font-bold">A</div>
							<p className="flex items-center px-4 w-full">{currentQUestion?.correctAnswer}</p>
						</div>
						{currentQUestion?.incorrectAnswers.map((options, index) => (
							<div
								onClick={(e) => {
									handleAnswerClick(e.currentTarget.dataset.value, index + 1);
								}}
								data-value={options}
								key={index}
								className="multipleQuestion relative flex items-center min-h-20 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200"
							>
								<div className="bg-[#cb8e89] h-full flex items-center justify-center w-14 min-h-20 text-white font-bold">
									{String.fromCharCode(65 + index + 1)}
								</div>
								<p className="flex items-center px-4 w-full">{options}</p>
							</div>
						))}
					</div>
				</div>

				{/* footer section */}
				<footer className="flex justify-between px-6 py-4 bg-gray-100">
					<button
						onClick={handelPrevQuestion}
						className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring"
					>
						Previous
					</button>
					{formData.totalQuestion === questionNumber ? (
						<button
							onClick={() => navigate('/result')}
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
