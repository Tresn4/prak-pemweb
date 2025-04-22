import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import PropTypes from 'prop-types';

const BookForm = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addBook, updateBook } = useContext(BookContext);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned'
  });
  
  const [errors, setErrors] = useState({});
  
  // If in edit mode, load the book data
  useEffect(() => {
    if (mode === 'edit' && id) {
      const bookToEdit = books.find(book => book.id === id);
      if (bookToEdit) {
        setFormData(bookToEdit);
      } else {
        navigate('/not-found');
      }
    }
  }, [mode, id, books, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (mode === 'edit') {
        updateBook(id, formData);
      } else {
        addBook(formData);
      }
      navigate('/');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {mode === 'edit' ? 'Edit Book' : 'Add New Book'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.author ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="owned">Owned</option>
            <option value="reading">Currently Reading</option>
            <option value="wishlist">Want to Buy</option>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
          >
            {mode === 'edit' ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit'])
};

export default BookForm;