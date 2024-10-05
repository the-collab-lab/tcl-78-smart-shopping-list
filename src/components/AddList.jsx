import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase';

export function AddList({ setListPath, userId, userEmail }) {
	const [listName, setListName] = useState('');

	const navigate = useNavigate();

	const handleCreateListButton = async (e) => {
		e.preventDefault();

		try {
			await createList(userId, userEmail, listName);
			alert(`${listName} list was successfully created.`);

			const createListPath = `${userId}/${listName}}`;
			setListPath(createListPath);
			navigate('/list');
		} catch (error) {
			console.error('error creating a list', error);
			alert('Failed to create the list. Please try again!');
		}
	};

	return (
		<>
			<form
				onSubmit={handleCreateListButton}
				className="flex p-1 items-center rounded mb-2"
			>
				<label htmlFor="listName">List Name:</label>
				<input
					type="text"
					id="listName"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					placeholder="Enter the name of your new list"
					required
					className="w-64 p-1 border border-blue-200 focus:outline-none focus:ring-opacity-50"
				/>
				<button type="submit" className="button">
					Create list
				</button>
			</form>
		</>
	);
}
