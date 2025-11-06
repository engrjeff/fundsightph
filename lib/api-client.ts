import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
});

export const API_ENDPOINTS = {};
