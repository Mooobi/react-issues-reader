import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const { VITE_GH_TOKEN } = import.meta.env;

export const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

httpService.interceptors.request.use((config) => {
  if (VITE_GH_TOKEN) {
    config.headers.Authorization = `Bearer ${VITE_GH_TOKEN}`;
  }

  return config;
});
