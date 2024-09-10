import { useState, useEffect } from 'react';
import './ListItem.css';

export function ListItem({ name, id, dateLastPurchased, onCheck }) {
	// State to track whether the item is checked

	const [isChecked, setIsChecked] = useState(false);

	// Update `isChecked` based on the `dateLastPurchased` value

	useEffect(() => {
		const checkStatus = () => {
			if (dateLastPurchased) {
				// If dateLastPurchased is a Firestore _Timestamp, convert it to a JavaScript Date
				const purchaseDate = dateLastPurchased.toDate
					? dateLastPurchased.toDate()
					: new Date(dateLastPurchased);
				const timeSinceLastPurchase = new Date() - purchaseDate;
				const hasBeenPurchasedRecently =
					timeSinceLastPurchase < 24 * 60 * 60 * 1000; // 24 hours

				setIsChecked(hasBeenPurchasedRecently);
			} else {
				setIsChecked(false);
			}
		};

		// initial check
		checkStatus();
	}, [dateLastPurchased]);

	const handleChecked = () => {
		onCheck(id);
	};
	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={handleChecked}
					disabled={isChecked}
				/>
				{name}
			</label>
		</li>
	);
}
