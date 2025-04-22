import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  status: 'owned'
};

const mockDeleteBook = jest.fn();

const renderWithContext = (book) => {
  return render(
    <BookContext.Provider value={{ deleteBook: mockDeleteBook }}>
      <BrowserRouter>
        <BookCard book={book} />
      </BrowserRouter>
    </BookContext.Provider>
  );
};

describe('BookCard Component', () => {
  test('renders book information correctly', () => {
    renderWithContext(mockBook);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Owned')).toBeInTheDocument();
  });
  
  test('calls deleteBook when delete button is clicked', () => {
    renderWithContext(mockBook);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteBook).toHaveBeenCalledWith('1');
  });
  
  test('has an edit link with correct URL', () => {
    renderWithContext(mockBook);
    
    const editLink = screen.getByText('Edit');
    expect(editLink).toHaveAttribute('href', '/edit/1');
  });
});