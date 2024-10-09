import { useState } from 'react';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId }) {
	const [formAddUser, setFormAddUser] = useState('');

	const listTitle = listPath ? listPath.split('/')[1] : null;
	const fixedListTitle = listTitle
		? listTitle[listTitle.length - 1] === '}'
			? listTitle.slice(0, -1)
			: listTitle
		: null;

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
			<h2 className="subheading">{fixedListTitle}</h2>
			<p className="text-center text-xl mb-3">
				Share your list with another user
			</p>
			<div className="form-container">
				<form onSubmit={handleAddUserSubmit}>
					<div className="form-group">
						<label className="w-[87px]" htmlFor="email">
							User Email:
						</label>
						<input
							className="form-input"
							id="email"
							type="email"
							placeholder="Email"
							value={formAddUser}
							onChange={(e) => setFormAddUser(e.target.value)}
							name="email"
							required
						/>
					</div>

					<button className="btn-form w-40">Share</button>
				</form>
			</div>
		</>
	);
}
