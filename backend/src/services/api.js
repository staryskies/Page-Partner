import axios from 'axios';

const BASE_URL = 'https://your-render-url.onrender.com'; // Replace with your Render URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = (email, password) => api.post('/login', { email, password }).then(res => res.data);
export const getBooks = () => api.get('/books').then(res => res.data);
export const getBook = (id) => api.get(`/books/${id}`).then(res => res.data);
export const addComment = (bookId, text, userId) => api.post(`/books/${bookId}/comments`, { bookId, text }, { params: { userId } }).then(res => res.data);
export const getRecommendations = () => api.get('/recommendations').then(res => res.data);
export const getFriends = () => api.get('/friends').then(res => res.data);
export const getUserProfile = (userId) => api.get('/profile', { params: { userId } }).then(res => res.data);

export default api;