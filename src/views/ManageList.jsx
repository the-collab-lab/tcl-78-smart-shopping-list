import { useState } from 'react';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId }) {
	const [formAddUser, setFormAddUser] = useState('');
	const [messageUser, setMessageUser] = useState('');

	const handleAddUserSubmit = async (e) => {
		e.preventDefault();
		if (!formAddUser) {
			setMessageUser('Enter a recipient email');
			return;
		}
		try {
			const successMessage = await shareList(listPath, userId, formAddUser);
			setMessageUser(successMessage);
		} catch (error) {
			console.error('Error sharing a list', error);
			if (
				error.message === 'You do not have permission to share this list' ||
				error.message === 'The user with the provided email does not exist'
			) {
				setMessageUser(error.message);
			} else {
				setMessageUser('Failed to share the list. Please try again!');
			}
		} finally {
			setFormAddUser('');
		}
	};

	return (
		<>
			<h2>Invite a user to share your list with you</h2>
			<form onSubmit={handleAddUserSubmit}>
				<label htmlFor="email">User email</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					value={formAddUser}
					onChange={(e) => setFormAddUser(e.target.value)}
					name="email"
					required
				/>

				<p>{messageUser}</p>

				<button>Invite</button>
			</form>
		</>
	);
}
