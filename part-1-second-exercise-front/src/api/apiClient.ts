import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

// Interceptor de solicitudes para agregar el token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas para manejar tokens vencidos
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403 && error.response.data.error === 'Invalid token') {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/refresh', { token: refreshToken });
          localStorage.setItem('accessToken', response.data.accessToken);
          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient.request(error.config); 
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
