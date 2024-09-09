import { ListItem } from '../components';
import { useState } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';

export function List({ data, listPath }) {
	const [searchItem, setSearchItem] = useState('');
	// Log filtered data
	console.log('Rendering List with data:', data);

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

	const handleCheck = async (itemId) => {
		const item = data.find((item) => item.id === itemId);
		const currentTime = new Date();

		const newTotalPurchases = (item.totalPurchases || 0) + 1;

		await updateItem(listPath, itemId, {
			dateLastPurchased: currentTime,
			totalPurchases: newTotalPurchases,
		});

		setTimeout(async () => {
			await updateItem(listPath, itemId, {
				dateLastPurchased: null,
				totalPurchases: newTotalPurchases,
			});
		}, getFutureDate);
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
						type="text"
						id="search-item-in-list"
						value={searchItem}
						placeholder="Search item..."
					/>
					{searchItem && (
						<button type="button" onClick={clearSearch}>
							x
						</button>
					)}
				</div>
			</form>
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
