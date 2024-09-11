import { ListItem } from '../components';
import { useState } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';
import { Link } from 'react-router-dom';

export function List({ data, listPath, lists }) {
	const [searchItem, setSearchItem] = useState('');
	// Log filtered data

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

	const handleCheck = async (itemData) => {
		let itemId = itemData.id;
		const item = data.find((item) => item.id === itemId);
		const currentTime = new Date();

		const newTotalPurchases = (item.totalPurchases || 0) + 1;

		await updateItem(listPath, itemId, {
			dateLastPurchased: itemData.dateLastPurchased,
			totalPurchases: newTotalPurchases,
		});

		setTimeout(async () => {
			await updateItem(listPath, itemId, {
				dateLastPurchased: null,
				totalPurchases: newTotalPurchases,
			});
			// Up for review - does it need to be here?
		}, getFutureDate);
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{lists.length === 0 && (
				<p>
					It looks like you don&apos;t have any shopping lists yet. Head to the{' '}
					<Link to="/">home page</Link> to create your first list and start
					organizing your shopping!
				</p>
			)}

			{lists.length > 0 && data.length === 0 && (
				<p>
					Your list is currently empty. To add items, visit{' '}
					<Link to="/manage-list">manage list</Link> and start building your
					shopping list!
				</p>
			)}
			{lists.length > 0 && data.length > 0 && (
				<>
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
									onCheck={() => handleCheck(item)}
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
								onCheck={() => handleCheck(item)}
							/>
						))}
					</ul>
				</>
			)}
		</>
	);
}
