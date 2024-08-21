import { useState } from 'react';

export function ManageList() {
	const [formData, setFormData] = useState({
		name: '',
		nextPurchase: '',
	});

	const handleChange = (e) => {
		const { name } = e.target;
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	// const handleChange = (e) => {
	//   const { name, value, type, checked } = e.target;
	//   setFormData((prevFormData) => {
	//     return {
	//       ...prevFormData,
	//       [name]: type === "checkbox" ? checked : value,
	//     };
	//   });
	// };

	return (
		<>
			<form>
				<label htmlFor="name">Item name</label>
				<input
					type="text"
					id="name"
					placeholder="Item"
					// value={formData.name}
					onChange={handleChange}
					name="name"
					required
				/>
				<button type="submit">Add Item</button>
			</form>
		</>
	);
}
