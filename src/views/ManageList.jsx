import { useState } from 'react';
import { addItem } from '../api';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId, data }) {
	const [formNewItem, setFormNewItem] = useState({
		name: '',
		nextPurchase: 0,
	});
	const [messageItem, setMessageItem] = useState('');

	const [formAddUser, setFormAddUser] = useState('');
	const [messageUser, setMessageUser] = useState('');

	const handleNewItemChange = (e) => {
		const { name, value } = e.target;
		setFormNewItem((prevForm) => {
			return {
				...prevForm,
				[name]: value,
			};
		});
	};

	const handleNewItemSubmit = async (e) => {
		e.preventDefault();
		const { name, nextPurchase } = formNewItem;

		if (!name || !nextPurchase) {
			setMessageItem('Please fill out all fields');
			return;
		}
		try {
			// check if the item already exists
			const itemExists = data.some(
				(item) => item.name.toLowerCase() === formNewItem.name.toLowerCase(),
			);

			// if the item already exists, show an error message
			if (itemExists) {
				setMessageItem(`${formNewItem.name} is already in the list`);
				console.log(formNewItem.name, 'is already in the list');
				return;
			}
			// if the item does not exist, add it to the list
			await addItem(listPath, {
				itemName: name,
				daysUntilNextPurchase: nextPurchase,
			});
			setMessageItem(`${name} has been successfully added to the list`);
			setFormNewItem({
				name: '',
				nextPurchase: 0,
			});
		} catch (error) {
			console.log('Failed to add the item: ', error);
			setMessageItem('Failed to add the item to the list.');
		}
	};

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
			<h2>Add new item to your list</h2>
			<form onSubmit={handleNewItemSubmit}>
				<label htmlFor="name">Item name</label>
				<input
					id="name"
					type="text"
					placeholder="Item"
					value={formNewItem.name}
					onChange={handleNewItemChange}
					name="name"
					required
				/>
				<br />

				<label htmlFor="nextPurchase">When is your next purchase</label>
				<select
					name="nextPurchase"
					id="nextPurchase"
					onChange={handleNewItemChange}
					value={formNewItem.nextPurchase}
					required
				>
					<option value="">---</option>
					<option value={7}>Soon</option>
					<option value={14}>Kind of soon</option>
					<option value={30}>Not soon</option>
				</select>

				<p>{messageItem}</p>

				<button>Add Item</button>
			</form>

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
