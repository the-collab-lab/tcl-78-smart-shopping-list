import { useState, useEffect } from 'react';
import './ListItem.css';
import { FaTrashCan } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';

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

	const categoryColor = {
		soon: 'bg-purple-100 text-purple-600 border-purple-300',
		'kind of soon': 'bg-orange-100 text-orange-600 border-orange-300',
		'not soon': 'bg-green-100 text-green-600 border-green-300',
		overdue: 'bg-red-100 text-red-600 border-red-300',
		inactive: 'bg-gray-100 text-gray-600 border-gray-300',
	};

	return (
		<div className="list-item flex items-center justify-between p-3">
			<div className="flex items-center justify-between space-x-2">
				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={onCheck}
						disabled={isChecked}
						className="form-checkbox h-5 w-5 hover:text-red-700"
					/>
					<div className="flex items-center space-x-2">
						<FaCartShopping />
						<span className="item-name">{name}</span>
					</div>
				</label>
				<div className="flex items-center space-x-2">
					<span
						className={`px-2 py-1 border text-sm font-medium ${categoryColor[category]}`}
						style={{ color: categoryColor[category] }}
					>
						{category}
					</span>
					<button
						onClick={handleDeleteButton}
						className="text-light-500 hover:text-red-700"
					>
						<FaTrashCan />
					</button>
				</div>
			</div>
		</div>
	);
}
