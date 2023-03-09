import axios from "axios";

const url = "http://localhost:8080/api/v1/";

const api = axios.create({
  baseURL: url,
});

export default api;
