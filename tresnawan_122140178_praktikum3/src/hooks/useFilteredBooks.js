import { useState, useMemo } from 'react';

const useFilteredBooks = (books) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Filter by status
      const statusMatch = filter === 'all' || book.status === filter;
      
      // Filter by search term (case insensitive)
      const searchMatch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      return statusMatch && searchMatch;
    });
  }, [books, filter, searchTerm]);
  
  return { 
    filteredBooks, 
    filter, 
    setFilter, 
    searchTerm, 
    setSearchTerm 
  };
};

export default useFilteredBooks;