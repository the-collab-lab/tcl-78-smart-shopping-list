import { ListItem } from '../components';
import SearchForm from '../components/SearchForm';
import { useState } from 'react';

export function List({ data }) {
	const [filteredItems, setFilteredItems] = useState(data);

	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<SearchForm onClick={handleSearch} />
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
