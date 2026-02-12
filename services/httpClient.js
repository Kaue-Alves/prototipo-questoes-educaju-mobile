import axios from "axios";
import Constants from "expo-constants";

const BASE_URL =
    Constants.expoConfig?.extra?.apiBaseUrl ||
    "https://educaju-backend.onrender.com";

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
