
import React from 'react';
import { Search } from 'lucide-react';

interface HeaderWithTitleAndSearchProps {
  title: string;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const HeaderWithTitleAndSearch: React.FC<HeaderWithTitleAndSearchProps> = ({
  title,
  searchTerm,
  handleSearch,
  placeholder = "Search..."
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      
      <div className="relative max-w-md w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
        />
      </div>
    </div>
  );
};

export default HeaderWithTitleAndSearch;
