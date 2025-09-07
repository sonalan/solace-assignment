import React from 'react'

interface SearchFormProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

function SearchForm({ searchTerm, onSearchChange, onReset }: SearchFormProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <h2 className="text-xl font-semibold mb-4">Search</h2>
        <input 
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search advocates..."
          onChange={onSearchChange} 
          value={searchTerm} 
        />
        <button 
          className="search-button"
          onClick={onReset}
        >
          Reset Search
        </button>
      </div>
      {searchTerm&&(
        <p className="m-3 text-gray-600">
          Searching for: <span className="font-medium text-gray-800">{searchTerm}</span>
        </p>
      )}
      
    </div>
  );
}

export default SearchForm;