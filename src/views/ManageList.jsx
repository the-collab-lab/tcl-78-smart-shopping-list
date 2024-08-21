import { useState } from 'react';

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
		console.log(formData);
		// submit to DB?? (call addItem from firebase.js and pass in the pathList and formData)
	};

	// template react form function for reference
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
