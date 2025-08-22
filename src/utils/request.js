import axios from 'axios';
import { YnaG3RequestInterceptor } from 'viy-menu';

export const baseURL = import.meta.env.VITE_REQUEST_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

YnaG3RequestInterceptor.setupRequest(axiosInstance);

/**
 * Common send request util
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} options
 * @returns {Promise<import('axios').AxiosResponse>} response
 */
const request = (url, options) => axiosInstance({ url, ...options });

export { axiosInstance, request };
