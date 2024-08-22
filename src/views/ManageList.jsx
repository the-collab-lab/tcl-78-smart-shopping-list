import { useState } from 'react';
import { addItem } from '../api';

export function ManageList() {
	const [formData, setFormData] = useState({
		name: '',
		nextPurchase: 0,
	});
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, nextPurchase } = formData;

		if (!name || !nextPurchase) {
			setMessage('Please fill out all fields');
			return;
		}
		try {
			// we need to pass the List Path in here, the hard coded value is a placeholder
			await addItem('A45I0SLfsWeHLDg47ETZM5vP8fG2/test-list', {
				itemName: name,
				daysUntilNextPurchase: nextPurchase,
			});
			setMessage(`${name} has been successfully added to the list`);
			// After submitting the form we should clear it out so it's empty again (or redirect to List)
			// Nice to have: redirect to the updated list
		} catch (error) {
			setMessage('Failed to add the item to the list.');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Item name</label>
				<input
					id="name"
					type="text"
					placeholder="Item"
					value={formData.name}
					onChange={handleChange}
					name="name"
					required
				/>
				<br />

				<label htmlFor="nextPurchase">When is your next purchase</label>
				<select
					name="nextPurchase"
					id="nextPurchase"
					onChange={handleChange}
					value={formData.nextPurchase}
				>
					<option value="">---</option>
					<option value={7}>Soon</option>
					<option value={14}>Kind of soon</option>
					<option value={30}>Not soon</option>
				</select>

				<p>{message}</p>

				<button>Add Item</button>
			</form>
		</>
	);
}
