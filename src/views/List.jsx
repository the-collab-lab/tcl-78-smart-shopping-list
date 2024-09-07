import { ListItem } from '../components';
import { useState } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';

export function List({ data, listPath }) {
	const [searchItem, setSearchItem] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchItem(e.target.value);
	};

	const clearSearch = () => {
		setSearchItem('');
	};

	const filterItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchItem.toLocaleLowerCase()),
	);

	const handleCheck = async (itemId, isChecked) => {
		console.log(`Item ID: ${itemId}, Checked: ${isChecked}`);
		const item = data.find((item) => item.id === itemId);
		const currentTime = new Date(); //the current date and time when the item is checked.

		if (isChecked) {
			// The item is being checked, so we increment totalPurchases and update Firestore

			const newTotalPurchases = (item.totalPurchases || 0) + 1;

			console.log(`Updating item with ID ${itemId} at ${currentTime}`);

			await updateItem(listPath, itemId, {
				dateLastPurchased: currentTime,
				totalPurchases: newTotalPurchases,
			});

			// Automatically uncheck the item after 24 hours
			setTimeout(async () => {
				await updateItem(listPath, itemId, {
					dateLastPurchased: null,
					totalPurchases: newTotalPurchases,
				});
			}, getFutureDate);
		} else {
			// If the item is being unchecked, update Firestore accordingly (optional behavior)
			await updateItem(listPath, itemId, {
				dateLastPurchased: null,
				totalPurchases: item.totalPurchases,
			});
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form onSubmit={handleSearch}>
				<div>
					<label htmlFor="search-item-in-list"> Search items:</label>
					<input
						onChange={handleSearch}
						type="search"
						id="search-item-in-list"
						value={searchItem}
						placeholder="Search item..."
					/>
					{searchItem && (
						<button type="button" onClick={clearSearch}>
							x
						</button>
					)}
					{searchItem && (
						<ul>
							{filterItems.map((item) => (
								<ListItem
									key={item.id}
									id={item.id}
									name={item.name}
									isChecked={
										item.dateLastPurchased &&
										new Date() - new Date(item.dateLastPurchased) <
											getFutureDate
									}
									onCheck={handleCheck}
								/>
							))}
						</ul>
					)}
				</div>
			</form>

			<ul>
				{data.map((item) => (
					<ListItem
						key={item.id}
						name={item.name}
						id={item.id}
						isChecked={
							item.dateLastPurchased &&
							new Date() - new Date(item.dateLastPurchased) <
								24 * 60 * 60 * 1000
						}
						onCheck={handleCheck}
					/>
				))}
			</ul>
		</>
	);
}
