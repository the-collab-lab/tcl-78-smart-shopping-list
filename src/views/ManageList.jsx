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
		<div className="container mx-auto px-4 flex flex-col items-center justify-center justify-items-center mb-40">
			<h2 className="text-xl text-center">
				Invite a user to share your list with you
			</h2>
			<form className="flex flex-col m-2 p-2" onSubmit={handleAddUserSubmit}>
				<label className="text-lg text-center" htmlFor="email">
					User email
				</label>
				<input
					className="border m-3 p-3"
					id="email"
					type="email"
					placeholder="Email"
					value={formAddUser}
					onChange={(e) => setFormAddUser(e.target.value)}
					name="email"
					required
				/>

				<button className="text-lg m-3 p-2 border-2 rounded-full border-yellow-300 hover:shadow-lg">
					Invite
				</button>
			</form>
		</div>
	);
}
