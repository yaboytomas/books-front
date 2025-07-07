import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link, useLocation } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getBooks();
      setBooks(res.data.data.books);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
        setSuccessMessage(`"${title}" deleted successfully! 🗑️`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter and sort books
  const filteredAndSortedBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'publishedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const BookCard = ({ book }) => (
    <div className="card hover:shadow-lg transition-all hover:scale-105">
      <div className="card-body">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
          <div className="flex-1 mb-4 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Author:</span> {book.author}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Published:</span> {new Date(book.publishedDate).getFullYear()}
            </p>
          </div>
          <div className="flex lg:flex-col gap-2 w-full lg:w-auto lg:ml-4">
            <Link 
              to={`/edit/${book.id}`}
              className="btn btn-sm btn-secondary flex items-center justify-center gap-1 flex-1 lg:flex-none"
              title="Edit book"
            >
              <span>✏️</span>
              <span className="sm:inline">Edit</span>
            </Link>
            <button 
              onClick={() => handleDelete(book.id, book.title)}
              className="btn btn-sm btn-danger flex items-center justify-center gap-1 flex-1 lg:flex-none"
              title="Delete book"
            >
              <span>🗑️</span>
              <span className="sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">No books found</h3>
      <p className="text-gray-600 mb-6">
        {searchTerm ? `No books match "${searchTerm}"` : 'Start building your collection by adding your first book.'}
      </p>
      <Link to="/add" className="btn btn-primary">
        ➕ Add Your First Book
      </Link>
    </div>
  );

  const SuccessNotification = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center">
        <div className="text-green-600 mr-3">✅</div>
        <div className="flex-1">
          <p className="text-green-800 text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-green-600 hover:text-green-800 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3">
          <div className="spinner"></div>
          <span className="text-gray-600">Loading your books...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button 
          onClick={fetchBooks}
          className="btn btn-primary"
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {successMessage && (
        <SuccessNotification 
          message={successMessage} 
          onClose={() => setSuccessMessage('')} 
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Book Collection</h1>
          <p className="text-gray-600">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
          </p>
        </div>
        <Link to="/add" className="btn btn-primary w-full sm:w-auto">
          ➕ Add New Book
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="form-label">
              🔍 Search books
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <div className="flex-1 lg:w-40">
              <label htmlFor="sortBy" className="form-label">
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="publishedDate">Published Date</option>
              </select>
            </div>
            <div className="flex-1 lg:w-32">
              <label htmlFor="sortOrder" className="form-label">
                Order
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="form-input"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          {filteredAndSortedBooks.length} {filteredAndSortedBooks.length === 1 ? 'book' : 'books'} found for "{searchTerm}"
        </div>
      )}

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAndSortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
