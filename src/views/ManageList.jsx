import { useState } from 'react';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId }) {
	const [formAddUser, setFormAddUser] = useState('');

	const handleAddUserSubmit = async (e) => {
		e.preventDefault();

		try {
			const successMessage = await shareList(listPath, userId, formAddUser);
			alert(successMessage);
		} catch (error) {
			console.error('Error sharing a list', error);
			if (
				error.message === 'You do not have permission to share this list' ||
				error.message === 'The user with the provided email does not exist'
			) {
				alert(error.message);
			} else {
				alert('Failed to share the list. Please try again!');
			}
		}
	};

	return (
		<>
			<h2>Invite a user to share your list with you</h2>
			<form
				onSubmit={handleAddUserSubmit}
				className="flex p-1 items-center rounded mb-2"
			>
				<label htmlFor="email">User email</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					value={formAddUser}
					onChange={(e) => setFormAddUser(e.target.value)}
					name="email"
					required
					className="w-auto p-2 border border-blue-200 rounded focus:outline-none focus:ring-opacity-50"
				/>

				<button>Invite</button>
			</form>
		</>
	);
}
