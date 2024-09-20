/**
 * Converts a string to lowercase with just the first letter capitalized.
 * @param {string} text - The input text to be converted.
 * @returns {string} - The converted text with the first letter capitalized.
 */
export function capitalizeFirstLetter(text) {
	// Convert the entire string to lowercase
	const lowercaseText = text.toLowerCase();
	// Capitalize the first letter and concatenate with the rest of the string
	return lowercaseText.charAt(0).toUpperCase() + lowercaseText.slice(1);
}
