import { useState } from 'react';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [form, setForm] = useState({ title: '', author: '', genre: '', publishedDate: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="author" placeholder="Author" onChange={handleChange} required />
      <input name="genre" placeholder="Genre" onChange={handleChange} required />
      <input name="publishedDate" placeholder="YYYY-MM-DD" onChange={handleChange} required />
      <button type="submit">💾 Save</button>
    </form>
  );
};

export default AddBook;
