import { useState, useEffect } from 'react';
import './ListItem.css';
import { getFutureDate } from '../utils';

export function ListItem({ name, id, dateLastPurchased, onCheck }) {
	// State to track whether the item is checked

	const [isChecked, setIsChecked] = useState(false);

	// Update `isChecked` based on the `dateLastPurchased` value

	useEffect(() => {
		const checkStatus = () => {
			if (dateLastPurchased) {
				const timeSinceLastPurchase = new Date() - new Date(dateLastPurchased);
				const hasBeenPurchasedRecently = timeSinceLastPurchase < getFutureDate;
				setIsChecked(hasBeenPurchasedRecently);
			} else {
				setIsChecked(false);
			}
		};
		// initial check
		checkStatus();
	}, [dateLastPurchased]);

	// old code from here
	const handleChecked = () => {
		// Handle checkbox change
		const newCheckedStatus = !isChecked;
		setIsChecked(newCheckedStatus);
		onCheck(id, newCheckedStatus);
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
