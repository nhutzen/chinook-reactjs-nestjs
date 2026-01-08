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

export default axiosClient; 