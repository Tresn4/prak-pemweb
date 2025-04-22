import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage("books", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load books from localStorage on initialization
  useEffect(() => {
    const getBooks = () => {
      try {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
          setBooks(JSON.parse(storedBooks));
        }
      } catch (error) {
        setError('Failed to load books from storage');
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getBooks();
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books, loading]);

  // Add a new book
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString()
    };
    setBooks([...books, newBook]);
  };

  // Update an existing book
  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...updatedBook, id } : book));
  };

  // Delete a book
  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ 
      books, 
      loading, 
      error, 
      addBook, 
      updateBook, 
      deleteBook 
    }}>
      {children}
    </BookContext.Provider>
  );
};