import React, { useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import { Data, DataProvider, useDataProvider } from '../context/DataContext';
import { useState } from 'react';
import { useRef } from 'react';
import Timer from '../components/Timer';
import arrayShuffle from 'array-shuffle';

function QuizApp() {
	const navigate = useNavigate();
	// importing the global states form context api
	const { formData, questions, userAnswer, setUserAnswer } = useDataProvider();

	const [currentQUestion, setCurrentQUestion] = useState();
	const [questionNumber, setQuestionNumber] = useState(1);
	const [optionArr, SetOptionArr] = useState([]);
	const quizProgressRef = useRef(null);

	const progressWidth = quizProgressRef?.current?.clientWidth / formData.totalQuestion;

	const [select, setSelect] = useState(true);

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

		// setOptions(currentQUestion?.incorrectAnswers.map((item) => item));
	}, [questionNumber]);

	const handelNextQuestion = () => {
		// reset previous selected box
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			item.classList.remove('bg-gray-300');
		});

		setSelect(true);
		if (formData.totalQuestion > questionNumber) {
			setQuestionNumber((prev) => prev + 1);
		}
	};

	const handelPrevQuestion = (e) => {
		// reset previous selected box
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			item.classList.remove('bg-gray-300');
		});

		if (1 < questionNumber) {
			setQuestionNumber((prev) => prev - 1);
		}
	};

	// console.log(select);
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
		setSelect(false);

		// Update the style of the clicked answer box to indicate selection
		document.querySelectorAll('.multipleQuestion').forEach((item, i) => {
			// reset previous selected box
			item.classList.remove('bg-gray-300');
			if (i === index) {
				item.classList.add('bg-gray-300');
			}
		});
	};

	useEffect(() => {
		if (questions && questions.length > 0) {
			setCurrentQUestion(questions[questionNumber - 1]);

			// Shuffle the options array for the current question
			const shuffledOptions = arrayShuffle([...questions[questionNumber - 1].incorrectAnswers, questions[questionNumber - 1].correctAnswer]);
			SetOptionArr(shuffledOptions);
		}
	}, [questionNumber, questions]);

	return (
		<div className="min-h-screen  bg-gradient-to-r from-rose-200 via-white to-rose-200 flex flex-col ">
			<section className=" w-full mx-auto bg-white shadow-md  overflow-hidden">
				{/* header section */}
				<header className="flex  items-center justify-center gap-5 md:justify-between  bg-[#cb8e89] text-white px-6 py-3">
					<div className="flex flex-col space-y-2 sm:items-start">
						<strong>
							Question {questionNumber}/{formData && formData.totalQuestion && formData.totalQuestion}
						</strong>
						<div ref={quizProgressRef} className="w-32 md:w-64 h-2  bg-white rounded-full relative overflow-hidden">
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
						{optionArr.map((option, index) => (
							<div
								onClick={(e) => handleAnswerClick(e.currentTarget.dataset.value, index)}
								data-value={option}
								key={index}
								className={`multipleQuestion relative flex items-center min-h-20 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200`}
							>
								<div className="bg-[#cb8e89] h-full flex items-center justify-center w-14 min-h-20 text-white font-bold">
									{String.fromCharCode(65 + index)}
								</div>
								<p className="flex items-center px-4 w-full">{option}</p>
							</div>
						))}
					</div>
				</div>

				{/* footer section */}
				<footer className="flex justify-between px-6 py-4 mt-10 bg-gray-100">
					<button
						onClick={handelPrevQuestion}
						className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring"
					>
						Previous
					</button>
					{formData.totalQuestion === questionNumber ? (
						<button
							disabled={select}
							onClick={() => navigate('/result')}
							className={`px-4  text-white font-bold rounded-lg focus:outline-none focus:ring ${
								select ? 'bg-[#dba6a0] cursor-not-allowed' : 'bg-[#cb8e89] hover:bg-[#a35f59]'
							}`}
						>
							Submit
						</button>
					) : (
						<button
							onClick={handelNextQuestion}
							disabled={select}
							className={`px-4  text-white font-bold rounded-lg focus:outline-none focus:ring ${
								select ? 'bg-[#dba6a0] cursor-not-allowed' : 'bg-[#cb8e89] hover:bg-[#a35f59]'
							}`}
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
