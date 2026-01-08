import axiosClient from "./axiosClient";

const albumApi = {
    getAll: () => {
        const url = '/albums';
        return axiosClient.get(url);
    },

    getById: (id) => {
        const url = `/albums/${id}`;
        return axiosClient.get(url);
    },

    create: (data) => {
        const url = '/albums';
        return axiosClient.post(url, data);
    },

    update: (id, data) => {
        const url = `/albums/${id}`;
        return axiosClient.put(url, data);
    },

    delete: (id) => {
        const url = `/albums/${id}`;
        return axiosClient.delete(url);
    }

}

export default albumApi;