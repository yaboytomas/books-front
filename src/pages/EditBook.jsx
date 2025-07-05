import { useEffect, useState } from 'react';
import { getBook, updateBook } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', author: '', genre: '', publishedDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getBook(id).then(res => {
      const b = res.data.data.book;
      setForm({
        title: b.title,
        author: b.author,
        genre: b.genre,
        publishedDate: b.publishedDate.slice(0, 10), // YYYY-MM-DD
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(id, form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input name="title" value={form.title} onChange={handleChange} required />
      <input name="author" value={form.author} onChange={handleChange} required />
      <input name="genre" value={form.genre} onChange={handleChange} required />
      <input name="publishedDate" value={form.publishedDate} onChange={handleChange} required />
      <button type="submit">💾 Update</button>
    </form>
  );
};

export default EditBook;
