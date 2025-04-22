import React from 'react';
import PropTypes from 'prop-types';

const BookFilter = ({ filter, onFilterChange }) => {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Owned', value: 'owned' },
    { label: 'Reading', value: 'reading' },
    { label: 'Wishlist', value: 'wishlist' }
  ];

  return (
    <div className="mb-6">
      <div className="text-gray-700 mb-2 font-medium">Filter by:</div>
      <div className="flex flex-wrap gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition duration-200
              ${
                filter === value
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

BookFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default BookFilter;
