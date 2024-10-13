import { useState, useEffect } from 'react';
import { FaTrashCan, FaCartShopping } from 'react-icons/fa6';

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
		soon: 'bg-[#fdba74]',
		'kind of soon': 'bg-[#d8b4fe]',
		'not soon': 'bg-[#84cc16]',
		overdue: 'bg-[#fca5a5]',
		inactive: 'bg-[#a3a3a3]',
	};

	return (
		<div
			className="bg-primary text-secondary hover:bg-accent hover:text-primary
			hover:shadow-lg my-2 px-3 py-2 rounded-lg item-transition"
		>
			<div className="flex items-center justify-between space-x-2">
				<label className="flex items-center cursor-pointer">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={onCheck}
						disabled={isChecked}
						className="form-checkbox h-4 w-4 lg:h-5 lg:w-5 cursor-pointer"
					/>
					<div className="flex items-center space-x-1">
						<FaCartShopping className="hidden md:block md:ml-2" />
						<span className="lg:text-lg">{name}</span>
					</div>
				</label>
				<div className="flex items-center space-x-2">
					<span
						className={`px-1.5 py-[3px] text-xs font-light rounded-md uppercase ${categoryColor[category]}`}
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
