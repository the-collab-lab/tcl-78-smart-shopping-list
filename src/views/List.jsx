import { ListItem } from '../components';
import SearchForm from '../components/SearchForm';
import { useState } from 'react';

export function List({ data }) {
	const [filteredItems, setFilteredItems] = useState(data);

	const [searchTerm, setSearchTerm] = useState('');

	console.log(data);

	const handleSearch = (searchItem) => {
		console.log(searchItem);
		setSearchTerm(searchItem);
		if (searchItem === '') {
			setFilteredItems(data);
		} else {
			const filtered = data.filter((item) =>
				item.name.toLowerCase().includes(searchItem.toLowerCase()),
			);
			setFilteredItems(filtered);
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<SearchForm onSearch={handleSearch} />
			<ul>
				{searchTerm
					? filteredItems.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))
					: data.map((item) => <ListItem key={item.id} name={item.name} />)}
			</ul>
		</>
	);
}
