import React, { useState, useContext } from 'react';

export const Data = React.createContext(null);

export const DataProvider = ({ children }) => {
	const [formData, setFormData] = useState({});
	const [questions, setQuestions] = useState([]);
	const [userAnswer ,setUserAnswer] = useState([])
	return <Data.Provider value={{ formData, setFormData, questions, setQuestions,userAnswer,setUserAnswer }}>{children}</Data.Provider>;
};

export const useDataProvider = () => {
	return useContext(Data);
};
