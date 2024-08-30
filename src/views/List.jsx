import { ListItem } from '../components';
import SearchForm from '../components/SearchForm';
import { useState } from 'react';

export function List({ data }) {
	// const [filteredItems, setFilteredItems] = useState(data);

	const [searchTerm, setSearchTerm] = useState('');

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<SearchForm value={searchTerm} />
			{/* <ul>
				<li> data.map((item) => <ListItem key={item.id} name={item.name} />)}
				</li>
			</ul> */}
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
