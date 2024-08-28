import { useState } from 'react';

export default function searchForm({ onSearch }) {
	const [searchItem, setSearchItem] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setSearchItem(value);
		onSearch(value);
	};

	const clearSearch = () => {
		setSearchTerm('');
		onSearch('');
	};

	return;
	<form onSubmit={handleSearch}>
		<div className="search-input-container">
			<label htmlFor="search-input">Search items:</label>
			<input
				type="text"
				id="search-input"
				value={searchItem}
				placeholder="Item from list"
				required
			/>
			{searchItem && (
				<button type="button" onClick={clearSearch} className="clear-button">
					x
				</button>
			)}
		</div>
	</form>;
}
