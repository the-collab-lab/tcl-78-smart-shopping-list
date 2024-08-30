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
					type="search"
					id="search-input"
					placeholder="Search list..."
					onChange={handleSearch}
					required
					name="search-input"
				/>
				<button type="button" onClick={clearSearch} className="clear-button">
					x
				</button>
			</div>
		</form>
	);
}

export default SearchForm;
