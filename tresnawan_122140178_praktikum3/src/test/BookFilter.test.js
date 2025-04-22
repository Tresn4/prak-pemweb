import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../components/BookFilter';

describe('BookFilter Component', () => {
  const mockOnFilterChange = jest.fn();
  
  test('renders all filter buttons', () => {
    render(<BookFilter filter="all" onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Owned')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
  });
  
  test('highlights the active filter button', () => {
    render(<BookFilter filter="reading" onFilterChange={mockOnFilterChange} />);
    
    const readingButton = screen.getByText('Reading');
    expect(readingButton).toHaveClass('font-medium');
    expect(readingButton).toHaveClass('text-blue-600');
    
    const ownedButton = screen.getByText('Owned');
    expect(ownedButton).not.toHaveClass('font-medium');
    expect(ownedButton).not.toHaveClass('text-blue-600');
  });
  
  test('calls onFilterChange with correct value when button is clicked', () => {
    render(<BookFilter filter="all" onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Wishlist'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('wishlist');
  });
});