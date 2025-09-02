import axios from "axios";

const BASE_URL ="https://memoir-notes.onrender.com/api";


const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
