import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './pages/Booklist';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>📚 My Book Collection</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
