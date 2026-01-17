// Axios là một thư viện cho phép bạn gửi các yêu cầu (requests) từ trình duyệt hoặc Node.js 
// để lấy dữ liệu từ server hoặc gửi dữ liệu lên server.
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json', 
    // dữ liệu gừi đi có dạng json
  }
});

// Đính token vào header
axiosClient.interceptors.request.use (
  (config) => {
    const token = localStorage.getItem('access_token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lí dl trả về và bắt lỗi
axiosClient.interceptors.response.use(
  (response) => { return response.data;},
  (error) => {
    if(error.response?.status === 401) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
)

export default axiosClient; 