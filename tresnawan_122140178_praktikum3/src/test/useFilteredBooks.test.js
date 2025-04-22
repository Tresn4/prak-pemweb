import { renderHook, act } from '@testing-library/react-hooks';
import useFilteredBooks from '../hooks/useFilteredBooks';

describe('useFilteredBooks Hook', () => {
  const mockBooks = [
    { id: '1', title: 'React Basics', author: 'John Doe', status: 'owned' },
    { id: '2', title: 'Advanced React', author: 'Jane Smith', status: 'reading' },
    { id: '3', title: 'JavaScript Deep Dive', author: 'John Doe', status: 'wishlist' }
  ];
  
  test('returns all books with initial state', () => {
    const { result } = renderHook(() => useFilteredBooks(mockBooks));
    
    expect(result.current.filteredBooks).toEqual(mockBooks);
    expect(result.current.filter).toBe('all');
    expect(result.current.searchTerm).toBe('');
  });
  
  test('filters books by status correctly', () => {
    const { result } = renderHook(() => useFilteredBooks(mockBooks));
    
    act(() => {
      result.current.setFilter('reading');
    });
    
    expect(result.current.filteredBooks).toEqual([mockBooks[1]]);
  });
  
  test('filters books by search term correctly', () => {
    const { result } = renderHook(() => useFilteredBooks(mockBooks));
    
    act(() => {
      result.current.setSearchTerm('John');
    });
    
    expect(result.current.filteredBooks).toEqual([mockBooks[0], mockBooks[2]]);
  });
  
  test('combines status and search filters correctly', () => {
    const { result } = renderHook(() => useFilteredBooks(mockBooks));
    
    act(() => {
      result.current.setFilter('wishlist');
      result.current.setSearchTerm('John');
    });
    
    expect(result.current.filteredBooks).toEqual([mockBooks[2]]);
  });
});