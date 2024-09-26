import { useState } from 'react';
import { addItem } from '../api';

export function AddItem({ data, listPath }) {
	const [formNewItem, setFormNewItem] = useState({
		name: '',
		nextPurchase: 0,
	});
	const [messageItem, setMessageItem] = useState('');

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
			const normalizedName = (name) => {
				return name
					.toLowerCase()
					.replace(/[^\w\s]|_/g, '')
					.replace(/\s+/g, '');
			};

			const itemExists = data.some(
				(item) => normalizedName(item.name) === normalizedName(name),
			);

			if (itemExists) {
				alert(`${normalizedName(name)} is already in the list`);
				return;
			}

			await addItem(listPath, {
				itemName: name,
				daysUntilNextPurchase: nextPurchase,
			});
			alert(`${name} has been successfully added to the list`);
			setFormNewItem({
				name: '',
				nextPurchase: 0,
			});
		} catch (error) {
			console.log('Failed to add the item: ', error);
			alert(`Failed to add ${name} to the list. Please try again!`);
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

				<button>Add Item</button>

				<p>{messageItem}</p>
			</form>
		</>
	);
}
