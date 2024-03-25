function shuffleArray(array) {
	// Check if the input is an array and has elements
	if (!Array.isArray(array) || array.length === 0) {
		return array; // Return the input as is
	}

	// Create a copy of the original array to avoid modifying the original
	const newArray = array.slice();

	// Iterate over the array from the end to the beginning
	for (let i = newArray.length - 1; i > 0; i--) {
		// Generate a random index between 0 and i (inclusive)
		const j = Math.floor(Math.random() * (i + 1));

		// Swap elements at i and j indices
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}

	return newArray;
}
