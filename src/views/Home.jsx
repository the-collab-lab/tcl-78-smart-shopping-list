import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase';

export function Home({ data, setListPath, userId, userEmail }) {
	const [listName, setListName] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate(); //to call redirected to the List view

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
			navigate('/list'); //redirect to the list view
		} catch (error) {
			//Logging and error messages if list is not created
			console.error('error creating a list', error);
			setMessage('Failed to create list. Please try again!');
		}
	};
	console.log(data.length);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{data.length == 0 ? (
				<p> Please create a list using the form below</p>
			) : (
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
