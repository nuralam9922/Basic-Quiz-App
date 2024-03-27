import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
import HeroImage from '../assets/hero.png';
import QuizImage from '../assets/quiz.png';
import FormImage from '../assets/form.png';
import ResultImage from '../assets/result.png';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Footer from '../components/Footer';

function Home() {
	// const [isMenuOppen, SetIsMenuOppen] = useState();
	const featureSectionRef = useRef(null);
	const howTOPlaySectionRef = useRef(null);
	return (
		<div className="min-h-screen bg-gray-50 overflow-hidden">
			<Navbar featureSectionRef={featureSectionRef} howTOPlaySectionRef={howTOPlaySectionRef} />

			<main className="flex-1">
				<section className="w-full bg-gray-100 px-4 py-16 lg:py-0">
					<div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						<div className="flex flex-col justify-center lg:justify-start gap-5">
							<div className="text-center md:text-left mt-20">
								<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-gray-900">Ready to take the Quiz?</h1>
								<p className="max-w-lg mt-5 text-lg text-gray-700">
									Test your knowledge with our fun and interactive quizzes. Create your own quizzes and challenge your friends.
								</p>
							</div>
							<div className="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-start">
								<Link
									to="/form"
									className="w-full flex items-center justify-center h-12 px-6 text-lg font-medium text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
								>
									Get Started
								</Link>
								<Link
									to="https://github.com/nuralam9922/Basic-Quiz-App"
									className="w-full flex items-center justify-center h-12 px-6 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
								>
									view source code
								</Link>
							</div>
						</div>
						<div className="flex justify-center lg:justify-end w-full min-h-60">
							<img src={HeroImage} alt="Hero" className="w-full max-w-lg rounded-xl object-cover object-center" />
						</div>
					</div>
				</section>

				<section ref={featureSectionRef} className="py-12 bg-gray-100 px-4">
					<div className="container mx-auto">
						<h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-14">Quiz Features</h2>
						<div className="flex gap-8">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="bg-white rounded-lg overflow-hidden shadow-md col-span-full">
									<div className="w-full min-h-[10rem] lg:min-h-[700px]">
										<img src={FormImage} alt="Quiz Form" className="w-full h-full  object-fill" />
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold mb-2">Quiz Form</h3>
										<p className="text-gray-700">
											Allow users to customize their quiz experience by selecting their desired question types and difficulty levels.
										</p>
									</div>
								</div>
								<div className="bg-white rounded-lg overflow-hidden shadow-md col-span-full">
									<div className="w-full min-h-[10rem] lg:min-h-[500px]">
										<img src={QuizImage} alt="Quiz Form" className="w-full h-full  object-cover" />
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold mb-2">Quiz Page</h3>
										<p className="text-gray-700">
											Provide a visually appealing and user-friendly quiz page layout to enhance the quiz-taking experience.
										</p>
									</div>
								</div>
								<div className="bg-white rounded-lg overflow-hidden shadow-md col-span-full">
									<div className="w-full min-h-[10rem] lg:min-h-[700px]">
										<img src={ResultImage} alt="Quiz Form" className="w-full h-full  object-fill" />
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold mb-2">Dashboard</h3>
										<p className="text-gray-700">
											Offer a comprehensive dashboard for users to track their progress, view stats, and manage their quiz settings.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section ref={howTOPlaySectionRef} className="py-12 md:py-24 lg:py-32 bg-white px-5 flex items-center justify-center">
					<div className="container mx-auto">
						<h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-14">How to Play Quiz</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="flex items-start mb-8">
								<div className="flex-shrink-0 bg-gray-300 h-12 w-12 flex items-center justify-center mr-4 rounded-full ">
									<span className="text-gray-600 font-bold text-lg">1</span>
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Select Quiz</h3>
									<p className="text-gray-700">Choose your desired quiz category or topic from a wide range of options available.</p>
								</div>
							</div>
							<div className="flex items-start mb-8">
								<div className="flex-shrink-0 bg-gray-300 h-12 w-12 flex items-center justify-center mr-4 rounded-full">
									<span className="text-gray-600 font-bold text-lg">2</span>
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Answer Questions</h3>
									<p className="text-gray-700">Read each question carefully and select the correct answer from the provided options.</p>
								</div>
							</div>
							<div className="flex items-start mb-8">
								<div className="flex-shrink-0 bg-gray-300 h-12 w-12 flex items-center justify-center mr-4 rounded-full">
									<span className="text-gray-600 font-bold text-lg">3</span>
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Check Score</h3>
									<p className="text-gray-700">
										After completing the quiz, review your answers and see your score along with detailed feedback.
									</p>
								</div>
							</div>
							<div className="flex items-start mb-8">
								<div className="flex-shrink-0 bg-gray-300 h-12 w-12 flex items-center justify-center mr-4 rounded-full">
									<span className="text-gray-600 font-bold text-lg">4</span>
								</div>
								<div>
									<h3 className="text-xl font-bold mb-2">Share Results</h3>
									<p className="text-gray-700">Share your quiz results with friends and challenge them to beat your score.</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="  min-h-[30rem] px-4 flex items-center justify-center ">
					<div className="container mx-auto ">
						<h2 className="text-4xl font-bold text-gray-800 mb-14 ">Experience Free & Seamless Quizzing</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
							<div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 mx-auto mb-4 text-blue-500"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M9.957 17.657c-.39.39-1.024.39-1.414 0l-5.657-5.657c-.39-.39-.39-1.024 0-1.414l2.829-2.829-2.829-2.829c-.39-.39-.39-1.024 0-1.414l5.657-5.657c.39-.39 1.024-.39 1.414 0l7 7c.39.39.39 1.024 0 1.414l-7 7z"
										clipRule="evenodd"
									/>
								</svg>
								<h3 className="text-xl font-bold mb-2 text-gray-800">Extensive Quiz Library</h3>
								<p className="text-gray-700">
									Dive into our vast collection of quizzes spanning various subjects, interests, and difficulty levels.
								</p>
							</div>
							<div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 mx-auto mb-4 text-green-500"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1-5a1 1 0 100 2 1 1 0 000-2z"
										clipRule="evenodd"
									/>
								</svg>
								<h3 className="text-xl font-bold mb-2 text-gray-800">No Sign-up Required</h3>
								<p className="text-gray-700">Start quizzing instantly without any cumbersome registration process. No accounts, no hassle.</p>
							</div>
							<div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 mx-auto mb-4 text-purple-500"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1-5a1 1 0 100 2 1 1 0 000-2z"
										clipRule="evenodd"
									/>
								</svg>
								<h3 className="text-xl font-bold mb-2 text-gray-800">Seamless Experience</h3>
								<p className="text-gray-700">
									Enjoy a smooth and intuitive quiz-taking experience with our user-friendly interface and responsive design.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

export default Home;
