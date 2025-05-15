import axios from 'axios';
axios.defaults.withCredentials = true;

export const register       = data => axios.post('/api/users/register', data);
export const login          = data => axios.post('/api/users/login', data);
export const logout         = ()   => axios.post('/api/users/logout');
export const fetchProfile   = ()   => axios.get('/api/users/profile');
export const fetchConcerts  = params => axios.get('/api/concerts', { params });
export const listItineraries= ()   => axios.get('/api/itineraries');
export const saveItinerary  = (id, items) =>
  axios.put(`/api/itineraries/${id}`, { items });
