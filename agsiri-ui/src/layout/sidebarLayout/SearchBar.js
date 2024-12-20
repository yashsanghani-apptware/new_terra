import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger the search callback
  };

  return (
    <div className="search-bar my-3">
      <input
        type="text"
        placeholder="Search here.."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <i className="fas fa-search"></i>
    </div>
  );
};

export default SearchBar;
