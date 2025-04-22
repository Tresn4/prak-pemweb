import { render, screen } from '@testing-library/react';
import App from './App';
import { BookProvider } from './context/BookContext';

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>
}));

// Mock the HomePage component
jest.mock('./pages/Home', () => () => <div data-testid="home-page">Home Page</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('wraps content in BookProvider', () => {
    // Check that App uses BookProvider
    const originalBookProvider = BookProvider;
    let providerUsed = false;
    
    // Override BookProvider temporarily for this test
    jest.spyOn(require('./context/BookContext'), 'BookProvider').mockImplementation(({ children }) => {
      providerUsed = true;
      return originalBookProvider({ children });
    });
    
    render(<App />);
    expect(providerUsed).toBe(true);
  });
});