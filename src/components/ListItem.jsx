import { useState, useEffect } from 'react';
import './ListItem.css';

export function ListItem({ name, id, dateLastPurchased, onCheck }) {
	const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

	const [isChecked, setIsChecked] = useState(false); // State to track whether the item is checked

	// Update `isChecked` based on the `dateLastPurchased` value
	useEffect(() => {
		if (dateLastPurchased) {
			const hasBeenPurchasedRecently =
				new Date() - new Date(dateLastPurchased) < ONE_DAY_IN_MILLISECONDS;
			setIsChecked(hasBeenPurchasedRecently);
		}
	}, [dateLastPurchased]);

	const handleChecked = () => {
		// Handle checkbox change
		const newCheckedStatus = !isChecked;
		setIsChecked(newCheckedStatus);
		onCheck(id, newCheckedStatus); // Notify parent component about the change
	};
	return (
		<li className="ListItem">
			<label>
				<input type="checkbox" checked={isChecked} onChange={handleChecked} />
				{name}
			</label>
		</li>
	);
}
