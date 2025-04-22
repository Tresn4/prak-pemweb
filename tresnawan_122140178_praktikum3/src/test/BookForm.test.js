import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import BookForm from '../pages/BookForm';

// Mock the react-router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn()
}));

const mockAddBook = jest.fn();
const mockUpdateBook = jest.fn();
const mockBooks = [
  { id: '1', title: 'Test Book', author: 'Test Author', status: 'owned' }
];

const renderWithContext = (mode) => {
  return render(
    <BookContext.Provider value={{ books: mockBooks, addBook: mockAddBook, updateBook: mockUpdateBook }}>
      <BrowserRouter>
        <BookForm mode={mode} />
      </BrowserRouter>
    </BookContext.Provider>
  );
};

describe('BookForm Component', () => {
  test('renders add form correctly', () => {
    renderWithContext('add');
    
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Author')).toHaveValue('');
  });
  
  test('shows validation errors when submitting empty form', async () => {
    renderWithContext('add');
    
    fireEvent.click(screen.getByText('Add Book'));
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
      expect(screen.getByText('Author is required')).toBeInTheDocument();
    });
    
    expect(mockAddBook).not.toHaveBeenCalled();
  });
  
  test('submits the form with valid data', async () => {
    renderWithContext('add');
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Book' }
    });
    
    fireEvent.change(screen.getByLabelText('Author'), {
      target: { value: 'New Author' }
    });
    
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'reading' }
    });
    
    fireEvent.click(screen.getByText('Add Book'));
    
    await waitFor(() => {
      expect(mockAddBook).toHaveBeenCalledWith({
        title: 'New Book',
        author: 'New Author',
        status: 'reading'
      });
    });
  });
});