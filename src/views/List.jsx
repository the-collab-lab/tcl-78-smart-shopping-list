import { ListItem } from '../components';
import { useState } from 'react';
import { updateItem } from '../api/firebase';

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
		//the item being checked or unchecked.
		console.log(`Item ID: ${itemId}, Checked: ${isChecked}`);
		if (isChecked) {
			const currentTime = new Date(); //the current date and time when the item is checked.
			console.log(`Updating item with ID ${itemId} at ${currentTime}`);
			// await updateItem(listPath, itemId, {
			// 	//to update the Firestore document
			// 	dateLastPurchased: currentTime,
			// 	totalPurchases: 1,
			// });

			await updateItem(listPath, itemId);
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
									dateLastPurchased={item.dateLastPurchased}
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
						dateLastPurchased={item.dateLastPurchased}
						onCheck={handleCheck}
					/>
				))}
			</ul>
		</>
	);
}
