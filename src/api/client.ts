import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3001", // JSON Server default port
    headers: {
        "Content-Type": "application/json",
    },
});
