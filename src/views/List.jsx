import { ListItem } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function List({ data, lists }) {
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

			{data.length === 0 && (
				<p>
					Your list is currently empty. To add items, visit{' '}
					<Link to="/manage-list">manage list</Link> and start building your
					shopping list!
				</p>
			)}

			{data.length > 0 && (
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
									<ListItem key={item.id} name={item.name} />
								))}
							</ul>
						)}
					</div>
				</form>
			)}

			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
