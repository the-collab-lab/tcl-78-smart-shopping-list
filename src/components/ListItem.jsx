import { useState, useEffect } from 'react';
import './ListItem.css';

export function ListItem({
	name,
	dateLastPurchased,
	onCheck,
	onDelete,
	category,
}) {
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

	const handleDeleteButton = () => {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			onDelete();
		}
	};

	const categoryColor = (category) => {
		switch (category) {
			case 'soon':
				return 'purple';
			case 'kind of soon':
				return 'orange';
			case 'not soon':
				return 'green';
			case 'overdue':
				return 'red';
			case 'inactive':
				return 'gray';
			default:
				return 'black';
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
				<span className="item-name">{name}</span>
			</label>
			<span
				className="item-category"
				style={{ color: categoryColor(category) }}
			>
				{category}
			</span>
			<button onClick={handleDeleteButton}>delete</button>
		</li>
	);
}
