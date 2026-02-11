import axios from "axios";

const BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3001";

const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(
                "[httpClient] Erro na resposta:",
                error.response.status,
                error.response.data,
            );
        } else if (error.request) {
            console.error(
                "[httpClient] Sem resposta do servidor:",
                error.message,
            );
        } else {
            console.error("[httpClient] Erro na requisição:", error.message);
        }
        return Promise.reject(error);
    },
);

export default httpClient;
