function SearchForm({ onSearch }) {
	const handleSearch = (e) => {
		e.preventDefault();
		const value = e.target.value;

		onSearch(value);
	};

	const clearSearch = () => {
		onSearch('');
	};

	return (
		<form onSubmit={handleSearch}>
			<div className="search-input-container">
				<label htmlFor="search-input">Search items:</label>
				<input
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
