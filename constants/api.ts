// Base URL for the API - now loaded from environment variables
// Configure these in .env file
// For Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, localhost works fine
// For physical devices, use your machine's IP address

const BASE_URL = __DEV__
    ? process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3001"
    : process.env.EXPO_PUBLIC_API_BASE_URL_PROD ||
      "https://your-production-api.com";

export const API_CONFIG = {
    baseUrl: BASE_URL,
    endpoints: {
        generateQuestions:
            process.env.EXPO_PUBLIC_API_ENDPOINT_QUESTIONS ||
            "/api/questions/generate",
    },
};
