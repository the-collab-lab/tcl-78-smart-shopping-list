import { useState } from 'react';
import { addItem } from '../api';

export function ManageList() {
	const [formData, setFormData] = useState({
		name: '',
		nextPurchase: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, nextPurchase } = formData;
		console.log(name, nextPurchase);
		addItem('A45I0SLfsWeHLDg47ETZM5vP8fG2/test-list', { name, nextPurchase });
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

				<button>Add Item</button>
			</form>
		</>
	);
}
