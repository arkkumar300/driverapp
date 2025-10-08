// src/services/ApiService.js

import axios from 'axios';

const ApiService = axios.create({
  // baseURL: 'http://192.168.0.9:3000/9023/api/', // Change for production/testing
  baseURL: 'http://13.200.182.108:3001', // Change for production/testing
  timeout: 10000,
});

// Automatically set the right Content-Type
ApiService.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default ApiService;
