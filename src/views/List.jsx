import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../components';
import { AddItem } from '../components/AddItem';
import {
	comparePurchaseUrgency,
	updateItem,
	deleteItem,
} from '../api/firebase';

export function List({ data, listPath, lists }) {
	const [searchItem, setSearchItem] = useState('');
	const [items, setItems] = useState([]);

	const listTitle = listPath.split('/')[1];

	useEffect(() => {
		const fetchItems = async () => {
			const sortedItems = await comparePurchaseUrgency(data);
			setItems(sortedItems);
		};
		fetchItems();
	}, [data]);

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
		const newTotalPurchases = (item.totalPurchases || 0) + 1;
		await updateItem(listPath, itemId, {
			totalPurchases: newTotalPurchases,
		});
	};

	const groupedItems = data.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {});

	const handleDelete = async (itemId) => {
		try {
			await deleteItem(listPath, itemId);
		} catch (error) {
			console.error(error.message, error);
			alert('Failed to delete the item. Please try again!');
		}
	};

	return (
		<>
			<h2>{listTitle}</h2>
			{lists.length === 0 && (
				<p>
					It looks like you don&apos;t have any shopping lists yet. Head to the{' '}
					<Link to="/">home page</Link> to create your first list and start
					organizing your shopping!
				</p>
			)}
			{lists.length > 0 && data.length === 0 && (
				<>
					<AddItem data={data} listPath={listPath} />
					<p>Your list is currently empty.</p>
				</>
			)}
			{lists.length > 0 && data.length > 0 && (
				<>
					<AddItem data={data} listPath={listPath} />

					<form onSubmit={handleSearch}>
						<div>
							<label htmlFor="search-item-in-list"> Search items:</label>
							<input
								onChange={handleSearch}
								type="text"
								id="search-item-in-list"
								value={searchItem}
								placeholder="Search item..."
								aria-label="Search for items"
							/>
							{searchItem && (
								<button type="button" onClick={clearSearch}>
									x
								</button>
							)}
						</div>
					</form>

					{searchItem ? (
						<ul>
							{filterItems.map((item) => (
								<ListItem
									key={item.id}
									id={item.id}
									name={item.name}
									dateLastPurchased={item.dateLastPurchased}
									onCheck={() => handleCheck(item)}
									onDelete={() => handleDelete(item.id)}
								/>
							))}
						</ul>
					) : (
						<ul>
							{Object.keys(groupedItems).map((category) => (
								<li key={category}>
									<h3>{category}</h3>

									<ul>
										{groupedItems[category].map((item) => (
											<ListItem
												key={item.id}
												name={item.name}
												id={item.id}
												dateLastPurchased={item.dateLastPurchased}
												onCheck={() => handleCheck(item)}
												onDelete={() => handleDelete(item.id)}
											/>
										))}
									</ul>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</>
	);
}
