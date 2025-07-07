import { useState } from 'react';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createBook(formData);
      navigate('/', { 
        state: { message: 'Book added successfully! 🎉' } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
        <p className="text-gray-600">Add a new book to your collection</p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookForm
        title="📖 Book Details"
        submitText="💾 Add Book"
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddBook;
