import axios from 'axios';
import { BASE_URL } from '../constants/URL';

export const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

httpService.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;

  return config;
});
