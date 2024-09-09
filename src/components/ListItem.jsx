import { useState, useEffect } from 'react';
import './ListItem.css';
import { getFutureDate } from '../utils';

export function ListItem({ name, id, dateLastPurchased, onCheck }) {
	// State to track whether the item is checked

	const [isChecked, setIsChecked] = useState(false);

	// to see if `dateLastPurchased` and `isChecked` are working
	console.log(`Rendering ListItem for ${name}:`, {
		dateLastPurchased,
		isChecked,
	});

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

				// Log check status
				console.log(
					`${name} was last purchased ${timeSinceLastPurchase} ms ago.`,
				);
				setIsChecked(hasBeenPurchasedRecently);
			} else {
				console.log(`${name} has never been purchased.`);
				setIsChecked(false);
			}
		};

		// initial check
		checkStatus();
	}, [dateLastPurchased]);

	// old code from here
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
