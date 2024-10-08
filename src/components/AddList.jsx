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
			<form className="m-2" onSubmit={handleCreateListButton}>
				<label htmlFor="listName" className="text-2xl text-center m-2">
					List Name:
				</label>
				<input
					className="m-4"
					type="text"
					id="listName"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					placeholder="Enter the name of your new list"
					required
				/>
				<button
					type="submit"
					className="m-4 p-2 border-2 rounded-full border-yellow-300 hover:shadow-lg"
				>
					Create list
				</button>
			</form>
		</>
	);
}
