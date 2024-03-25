import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDataProvider } from '../context/DataContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FormPage() {
	const [totalQuestion, setTotalQuestion] = useState(5);
	const [totalTime, setTotalTime] = useState(5);
	const [type, setType] = useState('multiple');
	const [category, setCategory] = useState('film_and_tv');
	const [difficulty, setDifficulty] = useState('easy');

	const { formData, setFormData, setQuestions } = useDataProvider();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [isApiCalling, setIsApiCalling] = useState(false);

	useEffect(() => {
		toast.error(state?.message);
	}, [state]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormData({
			totalQuestion,
			category,
			totalTime,
			type,
			difficulty,
		});
		handelApi();
	};

	// api calling
	const handelApi = async () => {
		setIsApiCalling(true);
		fetch(`https://the-trivia-api.com/api/questions?limit=${totalQuestion}&categories=${category}&difficulty=${difficulty}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the response body as JSON
			})
			.then((data) => {
				setQuestions(data);
				navigate('/quiz'); // Now you should see the questions in the data object
				// Do something with the data
			})
			.catch((error) => {
				console.error('There was a problem with the fetch operation:', error);
			});

		};

	return (
		<div className="min-h-screen relative overflow-hidden font-sans bg-gradient-to-r from-rose-200 via-white to-rose-200 flex flex-col ">
			<ToastContainer />
			<section className="min-h-screen w-full  mx-auto bg-white shadow-md overflow-hidden">
				<div className="px-6 py-8 capitalize">
					<h1 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Configuration</h1>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col gap-5">
							<label htmlFor="numQuestions" className="text-gray-700 font-semibold">
								Number of Questions [1-30]:
							</label>
							<input
								required
								onChange={(e) => setTotalQuestion(e.target.value)}
								value={totalQuestion}
								min="1"
								max="20"
								type="number"
								id="numQuestions"
								name="numQuestions"
								className="border border-gray-300 rounded-md px-3 py-2"
							/>
						</div>
						<div className="flex flex-col gap-5">
							<label htmlFor="time" className="text-gray-700 font-semibold">
								Time [in minutes]:
							</label>
							<input
								required
								onChange={(e) => setTotalTime(e.target.value)}
								value={totalTime}
								type="number"
								id="time"
								name="time"
								className="border border-gray-300 rounded-md px-3 py-2"
							/>
						</div>
						{/* <div className="flex flex-col gap-5">
							<label htmlFor="category" className="text-gray-700 font-semibold">
								Select type:
							</label>
							<select
								required
								onChange={(e) => setType(e.target.value)}
								value={type} // Use value instead of defaultValue
								id="category"
								name="category"
								className="border border-gray-300 rounded-md px-3 py-2"
							>
								<option value="easy">easy</option>
								<option value="true/false">true/false</option>
								<option value="multiple">multiple</option>
							</select>
						</div> */}
						<div className="flex flex-col gap-5">
							<label htmlFor="type" className="text-gray-700 font-semibold">
								Select category:
							</label>
							<select
								onChange={(e) => setCategory(e.target.value)}
								value={category}
								id="type"
								name="type"
								className="border border-gray-300 rounded-md px-3 py-2"
							>
								<option value="film_and_tv">film_and_tv</option>
								<option value="general_knowledge">general_knowledge</option>
								<option value="geography">geography</option>
								<option value="food_and_drink">food_and_drink</option>
								<option value="music">music</option>
								<option value="society_and_culture">society_and_culture</option>
								<option value="sport_and_leisure">sport_and_leisure</option>
								<option value="arts_and_literature">arts_and_literature</option>
								<option value="history">History</option>
								<option value="science">Science</option>
							</select>
						</div>
						<div className="flex flex-col gap-5">
							<label htmlFor="difficulty" className="text-gray-700 font-semibold">
								Select Difficulty:
							</label>
							<select
								onChange={(e) => setDifficulty(e.target.value)}
								value={difficulty}
								id="difficulty"
								name="difficulty"
								className="border border-gray-300 rounded-md px-3 py-2"
							>
								<option value="easy">easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</select>
						</div>
						<div className="flex justify-between w-full">
							<Link to={'/'}>
								<button
									type="button"
									className="bg-blue-500 mt-10 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
								>
									Back
								</button>
							</Link>
							<button
								type="submit"
								className="bg-blue-500 mt-10 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
							>
								Start Quiz
							</button>
						</div>
					</form>
				</div>
			</section>
			{isApiCalling && (
				<div className="h-full absolute top-0 w-full bg-[#ffffff75]">
					<div className="min-h-screen w-full flex flex-col items-center justify-center">
						<div role="status">
							<svg
								aria-hidden="true"
								class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						</div>
						<h1 className="font-bold text-zinc-500 animate-pulse mt-2">Redirecting to Quiz page...</h1>
					</div>
				</div>
			)}
		</div>
	);
}

export default FormPage;
