import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import BookFilter from '../components/BookFilter';
import SearchBar from '../components/SearchBar';
import useFilteredBooks from '../hooks/useFilteredBooks';

const Home = () => {
  const { books, loading, error } = useContext(BookContext);
  const { 
    filteredBooks, 
    filter, 
    setFilter,
    searchTerm,
    setSearchTerm
  } = useFilteredBooks(books);

  if (loading) {
    return <div className="text-center py-10">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">My Book Collection</h1>
      <Link 
        to="/add" 
        className="inline-block mb-6 font-medium text-gray-800 hover:text-gray-600"
      >
        Add New Book
      </Link>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <BookFilter filter={filter} onFilterChange={setFilter} />

      {filteredBooks.length === 0 ? (
        <div className="py-8 text-gray-600">
          {books.length === 0 
            ? "You haven't added any books yet. Add your first book!"
            : "No books match your search criteria."
          }
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;