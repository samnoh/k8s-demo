import axios from 'axios';

export const getValues = () => axios.get('/api/values/current').then(res => res.data);

export const getIndexes = () => axios.get('/api/values/all').then(res => res.data);

export const postIndex = index => axios.post('/api/values', { index });
