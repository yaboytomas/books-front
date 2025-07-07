import { useEffect, useState } from 'react';
import { getBook, updateBook } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setFetchLoading(true);
        setError('');
        const res = await getBook(id);
        const bookData = res.data.data.book;
        setBook({
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          publishedDate: bookData.publishedDate.slice(0, 10), // YYYY-MM-DD format
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch book details.');
        console.error('Error fetching book:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await updateBook(id, formData);
      navigate('/', { 
        state: { message: 'Book updated successfully! 🎉' } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3">
          <div className="spinner"></div>
          <span className="text-gray-600">Loading book details...</span>
        </div>
      </div>
    );
  }

  if (error && !book) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Book</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              🔄 Try Again
            </button>
            <button 
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Book</h1>
        <p className="text-gray-600">Update your book information</p>
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

      {book && (
        <BookForm
          title="📖 Edit Book Details"
          initialData={book}
          submitText="💾 Update Book"
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditBook;
