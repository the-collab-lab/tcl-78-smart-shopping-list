import { ListItem } from '../components';
import { useState } from 'react';
import { updateItem, deleteItem } from '../api/firebase';
import { Link } from 'react-router-dom';

export function List({ data, listPath, lists }) {
	const [searchItem, setSearchItem] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

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

	const handleDelete = async (itemId) => {
		try {
			await deleteItem(listPath, itemId);
			setErrorMsg('');
		} catch (error) {
			console.error(error.message, error);
			setErrorMsg('Failed to delete the item. Please try again!');
		}
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
									onDelete={() => handleDelete(item.id)}
								/>
							))}
						</ul>
					)}

					{errorMsg && <p>{errorMsg}</p>}

					<ul>
						{data.map((item) => (
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
				</>
			)}
		</>
	);
}
