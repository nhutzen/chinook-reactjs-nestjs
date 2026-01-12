import axiosClient from './axiosClient';

const artistApi = {
    // Lấy tất cả nghệ sĩ
    getAll: () => {
        const url = '/artists';
        return axiosClient.get(url);
    },

    search: (name) => {
        const url = `/artists/search?name=${name}`;
        return axiosClient.get(url);
    },

    // Lấy chi tiết 1 nghệ sĩ theo ID
    getById: (id) => {
        const url = `/artists/${id}`;
        return axiosClient.get(url);
    },

    // Thêm nghệ sĩ mới
    create: (data) => {
        const url = '/artists';
        return axiosClient.post(url, data);
    },

    // Cập nhật thông tin nghệ sĩ
    update: (id, data) => {
        const url = `/artists/${id}`;
        return axiosClient.put(url, data);
    },

    // Xóa nghệ sĩ
    delete: (id) => {
        const url = `/artists/${id}`;
        return axiosClient.delete(url);
    }
};

export default artistApi;