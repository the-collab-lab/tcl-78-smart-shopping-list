import { useState, useEffect } from 'react';
import './ListItem.css';

export function ListItem({ name, dateLastPurchased, onCheck }) {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		const checkStatus = () => {
			if (dateLastPurchased) {
				const purchaseDate = dateLastPurchased.toDate();
				const timeSinceLastPurchase = new Date() - purchaseDate;
				const hasBeenPurchasedRecently =
					timeSinceLastPurchase < 24 * 60 * 60 * 1000;

				setIsChecked(hasBeenPurchasedRecently);
			} else {
				setIsChecked(false);
			}
		};

		checkStatus();
	}, [dateLastPurchased]);

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
		</li>
	);
}
