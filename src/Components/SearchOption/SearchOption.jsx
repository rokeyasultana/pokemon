import React, { useState } from 'react';
import './SearchOption.css';
const SearchOption = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-option">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchOption;
