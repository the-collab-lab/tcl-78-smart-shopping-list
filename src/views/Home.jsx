import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase';

export function Home({ data, setListPath, userId, userEmail }) {
	const [listName, setListName] = useState('');
	const navigate = useNavigate(); //to call redirected to the List view

	const handleCreateListButton = async (e) => {
		e.preventDefault();

		try {
			await createList(userId, userEmail, listName);

			const createListPath = `${userId}/${listName}}`;
			setListPath(createListPath);
			navigate('/list'); //redirect to the list view
		} catch (error) {
			console.error('error creating a list', error);
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
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
			<form onSubmit={handleCreateListButton}></form>
		</div>
	);
}
