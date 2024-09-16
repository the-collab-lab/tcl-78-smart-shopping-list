import { useState, useEffect } from 'react';
import './ListItem.css';

export function ListItem({ name, dateLastPurchased, onCheck, onDelete }) {
	const [isChecked, setIsChecked] = useState(false);

	// Update `isChecked` based on the `dateLastPurchased` value
	useEffect(() => {
		const checkStatus = () => {
			if (dateLastPurchased) {
				const purchaseDate = dateLastPurchased.toDate();
				const timeSinceLastPurchase = new Date() - purchaseDate;
				const hasBeenPurchasedRecently =
					timeSinceLastPurchase < 24 * 60 * 60 * 1000; // 24 hours
				setIsChecked(hasBeenPurchasedRecently);
			} else {
				setIsChecked(false);
			}
		};

		checkStatus();
	}, [dateLastPurchased]);

	const handleDelete = () => {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			onDelete(name);
		}
	};

	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={onCheck}
					disabled={isChecked}
				/>
				{name}
			</label>
			<button onClick={handleDelete}>delete</button>
		</li>
	);
}
