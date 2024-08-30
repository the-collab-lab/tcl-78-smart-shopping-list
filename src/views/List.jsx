import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
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
			<form onSubmit={handleSearch}>
				<div>
					<label htmlFor="search-input"> Search items:</label>
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

			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}

// {filteredData.map((item)=>(
// 	<li key={item.id}>{item.name}</li>
// ))}
// </ul>}

{
	/* {searchTerm
					? filteredData.map((item) => (
							<ListItem key={item.id} name={item.name} />
						)) */
}
