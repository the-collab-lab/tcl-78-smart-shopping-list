import { useState } from 'react';

function SearchForm() {
	const [searchItem, setSearchItem] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchItem(e.target.value);
	};

	const clearSearch = () => {
		setSearchItem('');
	};

	return (
		<form onSubmit={handleSearch}>
			<div className="search-input-container">
				<label htmlFor="search-input">Search items:</label>
				<input
					value={searchItem}
					type="search"
					id="search-input"
					placeholder="Item from list"
					onChange={handleSearch}
					required
				/>
				<button type="button" onClick={clearSearch} className="clear-button">
					x
				</button>
			</div>
		</form>
	);
}

export default SearchForm;
