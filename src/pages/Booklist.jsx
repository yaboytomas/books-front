import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data.data.books); // matches your controller structure
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book?')) {
      await deleteBook(id);
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Link to="/add">➕ Add Book</Link>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({new Date(book.publishedDate).getFullYear()}) - {book.genre}
            <Link to={`/edit/${book.id}`}>✏️</Link>
            <button onClick={() => handleDelete(book.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
