import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import BookList from './pages/Booklist';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <span className="text-2xl">📚</span>
            <span className="hidden sm:block">My Book Collection</span>
            <span className="sm:hidden">Books</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className={`btn btn-sm ${isActive('/') ? 'btn-primary' : 'btn-secondary'}`}
            >
              <span className="hidden sm:inline">📋 All Books</span>
              <span className="sm:hidden">📋</span>
            </Link>
            <Link 
              to="/add" 
              className={`btn btn-sm ${isActive('/add') ? 'btn-primary' : 'btn-success'}`}
            >
              <span className="hidden sm:inline">➕ Add Book</span>
              <span className="sm:hidden">➕</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main layout component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 My Book Collection. Built with React & love 💙</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
