import './Home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleList } from '../components';
import { createList } from '../api/firebase';
import { auth } from '../api/config.js';
import { SignInButton, useAuth } from '../api/useAuth';

export function Home({ data, setListPath, userId, userEmail }) {
	const [listName, setListName] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();

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
		<div className="Home">
			{!!user ? (
				<>
					<p>Welcome back {auth.currentUser.displayName}!</p>
					{data.length === 0 && (
						<p>
							{' '}
							It seems you don&apos;t have any lists yet, Please create a list
							using the form below
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
							required
						/>
						<button type="submit" className="button">
							Create list
						</button>
					</form>
				</>
			) : (
				<>
					<p>
						Welcome to the Shopping List app. Some catchy phrase / intro
						message. Picture below?
					</p>
					<SignInButton></SignInButton>
				</>
			)}
		</div>
	);
}
