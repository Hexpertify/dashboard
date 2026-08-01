import axiosInstance from '../services/axiosInstance';

export const getSeo = async (pageId) => {
    const response = await axiosInstance.get(`/seo/${pageId}`);
    return response.data;
};

export const createSeo = async (data) => {
    const response = await axiosInstance.post('/seo', data);
    return response.data;
};

export const updateSeoApi = async (id, data) => {
    const response = await axiosInstance.put(`/seo/${id}`, data);
    return response.data;
};

export const deleteSeoApi = async (id) => {
    const response = await axiosInstance.delete(`/seo/${id}`);
    return response.data;
};
