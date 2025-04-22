import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home';
import BookForm from './pages/BookForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<BookForm mode="add" />} />
            <Route path="/edit/:id" element={<BookForm mode="edit" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </BookProvider>
  );
}

export default App;