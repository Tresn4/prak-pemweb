import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the context to prevent localStorage errors in tests
jest.mock('../context/BookContext', () => ({
  BookProvider: ({ children }) => <div>{children}</div>,
  BookContext: {
    Consumer: ({ children }) => children({
      books: [],
      loading: false,
      error: null,
      addBook: jest.fn(),
      updateBook: jest.fn(),
      deleteBook: jest.fn()
    })
  }
}));

// Mock React Router
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: null })
}));

// Mock the pages
jest.mock('../pages/Home', () => () => <div>Home Page</div>);
jest.mock('../pages/BookForm', () => () => <div>Book Form</div>);
jest.mock('../pages/NotFound', () => () => <div>Not Found</div>);

test('App renders without crashing', () => {
  render(<App />);
  // We're just checking that the app renders without throwing
  expect(document.body).toBeTruthy();
});