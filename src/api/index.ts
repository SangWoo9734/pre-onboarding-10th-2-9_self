import axios from 'axios';

export const BASE_URL = 'https://api.clinicaltrialskorea.com';

const apiClient = axios.create({
  baseURL: '/api/v1/search-conditions',
});

export default apiClient;
