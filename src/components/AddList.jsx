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
		<div className="form-container mb-12">
			<form onSubmit={handleCreateListButton}>
				<div className="form-group">
					<label htmlFor="listName" className="w-[68px]">
						New List:
					</label>
					<input
						className="form-input"
						type="text"
						id="listName"
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						placeholder="Enter List Name"
						required
					/>
				</div>
				<button type="submit" className="btn-form w-48">
					Create List
				</button>
			</form>
		</div>
	);
}
