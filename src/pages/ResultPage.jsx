import React from 'react';
import { useDataProvider } from '../context/DataContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import gif from '../assets/congratulation-gif.webm';

function ResultPage() {
	const navigate = useNavigate();
	const { formData, questions, userAnswer } = useDataProvider();

	useEffect(() => {
		if (Object.keys(formData).length === 0) {
			navigate('/form', { state: { message: 'Fill the form' } });
		}
	}, []);

	// Calculate the score
	const calculateScore = () => {
		// Your logic to calculate the score based on user answers and correct answers
		// const score = formData?.totalQuestion / userAnswer
		let score = 0;
		questions.forEach((question, index) => {
			if (userAnswer[index]?.userQuestionAnswer === question.correctAnswer) {
				score = score + 1;
			}
		});
		return (score / questions?.length) * 100;
		console.log(score);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-screen-lg ">
				<div className="bg-white shadow-md rounded-md p-8">
					<h2 className="text-5xl font-semibold mb-6 text-center text-gray-800">Quiz Result</h2>

					<div className="w-full py-5 flex items-center justify-center">
						<video autoPlay loop muted className="w-52 h-52">
							<source src={gif} type="video/webm" />
							Your browser does not support the video tag.
						</video>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div className="bg-gray-200 rounded-md p-4">
							<p className="text-lg font-semibold mb-2">Category</p>
							<p className="text-gray-800">{formData?.category}</p>
						</div>
						<div className="bg-gray-200 rounded-md p-4">
							<p className="text-lg font-semibold mb-2">Difficulty</p>
							<p className="text-gray-800">{formData?.difficulty}</p>
						</div>
						<div className="bg-gray-200 rounded-md p-4">
							<p className="text-lg font-semibold mb-2">Total Questions</p>
							<p className="text-gray-800">{formData?.totalQuestion}</p>
						</div>
						<div className="bg-gray-200 rounded-md p-4">
							<p className="text-lg font-semibold mb-2">Your Score</p>
							<p className="text-gray-800">{calculateScore()}%</p>
						</div>
					</div>

					<h3 className="text-2xl font-semibold mt-8 mb-4 text-center text-gray-800">Detailed Results</h3>

					{/* Display each question with user's answer and correct answer */}
					{questions.map((question, index) => (
						<div
							key={index}
							className={`bg-gray-200 ${
								userAnswer[index]?.userQuestionAnswer === question.correctAnswer && 'bg-green-300'
							} rounded-md p-4 mb-4`}
						>
							<p className="text-lg font-semibold mb-2">Question {index + 1}:</p>
							<p className="mb-2">
								<span className="font-semibold">Question:</span> {question.question}
							</p>
							<p className="mb-2">
								<span className="font-semibold">Your Answer:</span> {userAnswer[index]?.userQuestionAnswer}
							</p>
							<p className="mb-2">
								<span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
							</p>
						</div>
					))}

					<div className="w-full flex justify-center items-center">
						<button
							onClick={() => navigate('/form')}
							className="px-4 py-2 bg-[#cb8e89] text-white font-bold rounded-lg hover:bg-[#a35f59] focus:outline-none focus:ring"
							type="button"
						>
							Play again
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResultPage;
