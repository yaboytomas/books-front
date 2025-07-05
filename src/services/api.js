import axios from 'axios';

const API_BASE = 'https://books-api-jbci.onrender.com/api/books';

export const getBooks = () => axios.get(API_BASE);
export const getBook = (id) => axios.get(`${API_BASE}/${id}`);
export const createBook = (data) => axios.post(API_BASE, data);
export const updateBook = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API_BASE}/${id}`);
