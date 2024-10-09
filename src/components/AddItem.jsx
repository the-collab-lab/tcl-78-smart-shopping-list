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
		<div className="form-container mb-10">
			<form onSubmit={handleNewItemSubmit}>
				{/* Item Name Section */}
				<div className="form-group">
					<label htmlFor="name" className="w-[77px]">
						New Item:
					</label>
					<input
						id="name"
						type="text"
						placeholder="Enter Item Name"
						value={formNewItem.name}
						onChange={handleNewItemChange}
						name="name"
						required
						className="form-input"
					/>
				</div>

				{/* Urgency Section */}
				<div className="form-group">
					<label htmlFor="nextPurchase" className="w-[77px]">
						Urgency:{' '}
					</label>
					<select
						name="nextPurchase"
						id="nextPurchase"
						onChange={handleNewItemChange}
						value={formNewItem.nextPurchase}
						required
						className="form-input px-1"
					>
						<option value="">Select Urgency</option>
						<option value={7}>Soon</option>
						<option value={14}>Kind of soon</option>
						<option value={30}>Not soon</option>
					</select>
				</div>

				<button type="submit" className="btn-form w-40">
					Add Item
				</button>

				<p>{messageItem}</p>
			</form>
		</div>
	);
}
