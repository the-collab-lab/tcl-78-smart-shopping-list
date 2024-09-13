import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase';

export function Home({ data, setListPath, userId, userEmail }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleCreateListButton = async (e) => {
		e.preventDefault();
		if (!listName) {
			setMessage('Enter a list name');
			return;
		}

		try {
			await createList(userId, userEmail, listName);
			setMessage('New list successfully created');

			const createListPath = `${userId}/${listName}}`;
			setListPath(createListPath);
			navigate('/list');
		} catch (error) {
			console.error('error creating a list', error);
			setMessage('Failed to create list. Please try again!');
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{data.length === 0 && (
				<p>
					{' '}
					It seems you don&apos;t have any lists yet, Please create a list using
					the form below
				</p>
			)}
			{data.length > 0 && (
				<ul>
					{data.map((list, id) => (
						<SingleList
							key={id}
							name={list.name}
							path={list.path}
							setListPath={setListPath}
						/>
					))}
				</ul>
			)}

			<form onSubmit={handleCreateListButton}>
				<label htmlFor="listName">List Name:</label>
				<input
					type="text"
					id="listName"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					placeholder="Enter the name of your new list"
				/>
				<button type="submit" className="button">
					Create list
				</button>
				{message}
			</form>
		</div>
	);
}
