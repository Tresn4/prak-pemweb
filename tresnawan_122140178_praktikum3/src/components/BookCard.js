import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { deleteBook } = useContext(BookContext);

  const statusBadge = {
    owned: 'bg-green-100 text-green-700',
    reading: 'bg-blue-100 text-blue-700',
    wishlist: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-200 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <span className={`text-xs px-3 py-1 rounded-full ${statusBadge[book.status]}`}>
          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </span>
      </div>

      <div className="flex justify-end mt-4 space-x-3">
        <Link
          to={`/edit/${book.id}`}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteBook(book.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired,
  }).isRequired,
};

export default BookCard;
