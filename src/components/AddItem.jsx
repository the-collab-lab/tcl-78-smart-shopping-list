import { useState } from 'react';
import { addItem } from '../api';

export function AddItem({ data, listPath }) {
	const [formNewItem, setFormNewItem] = useState({
		name: '',
		nextPurchase: 0,
	});
	const [messageItem, setMessageItem] = useState('');

	const normalizeItemName = (name) => {
		const lowercaseName = name.toLowerCase();
		const normalizedName =
			lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);
		return normalizedName;
	};

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
				itemName: normalizeItemName(name),
				daysUntilNextPurchase: nextPurchase,
			});
			alert(
				`${normalizeItemName(name)} has been successfully added to the list`,
			);
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
		<div className="flex flex-col items-center justify-center mx-auto">
			<form onSubmit={handleNewItemSubmit} className="m-2 p-2 items-center">
				{/* Item Name Section */}
				<div className="flex items-center mb-4">
					<span className="text-center">
						<label htmlFor="name" className="mr-2">
							Item name:{' '}
						</label>
						<input
							id="name"
							type="text"
							placeholder="Enter new item name"
							value={formNewItem.name}
							onChange={handleNewItemChange}
							name="name"
							required
							className="border p-2"
						/>
					</span>
				</div>

				{/* Urgency Section */}
				<div className="flex items-center mb-4">
					<span className="text-center m-4">
						<label
							htmlFor="nextPurchase"
							className="justify-items-start m-2 p-2 mb-2"
						>
							Urgency:{' '}
						</label>
						<select
							name="nextPurchase"
							id="nextPurchase"
							onChange={handleNewItemChange}
							value={formNewItem.nextPurchase}
							required
							className="border p-2 rounded mb-4"
						>
							<option value="">Select Urgency</option>
							<option value={7}>Soon</option>
							<option value={14}>Kind of soon</option>
							<option value={30}>Not soon</option>
						</select>
					</span>
				</div>

				<button
					type="submit"
					className="p-2 border-2 rounded-full border-yellow-300 hover:shadow-lg"
				>
					Add Item
				</button>

				<p>{messageItem}</p>
			</form>
		</div>
	);
}
