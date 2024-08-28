import { ListItem } from '../components';
import { SearchForm } from '../components/SearchForm';

export function List({ data }) {
	const [filteredItems, setFilteredItems] = useState(data);

	const handleSearch = (searchItem) => {
		if (searchItem === '') {
			setFilteredItems(data);
		} else {
			const filtered = data.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
