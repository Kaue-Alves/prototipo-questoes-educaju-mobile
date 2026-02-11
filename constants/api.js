// Base URL for the API - now loaded from environment variables
// Configure these in .env file
// For Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, localhost works fine
// For physical devices, use your machine's IP address



export const API_CONFIG = {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3001",
    endpoints: {
        generateQuestions:
            process.env.EXPO_PUBLIC_API_ENDPOINT_QUESTIONS ||
            "/api/questions/generate",
    },
};
