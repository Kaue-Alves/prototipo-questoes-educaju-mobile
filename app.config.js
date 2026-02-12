import "dotenv/config";

export default {
    expo: {
        name: "Educaju",
        slug: "educaju-questoes",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/logo-educaju.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        scheme: "educaju",
        splash: {
            image: "./assets/logo-educaju.png",
            resizeMode: "contain",
            backgroundColor: "#e95a0c",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.educaju.app",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/logo-educaju.png",
                backgroundColor: "#e95a0c",
            },
            package: "com.educaju.app",
        },
        web: {
            favicon: "./assets/logo-educaju.png",
        },
        extra: {
            apiBaseUrl:
                process.env.API_BASE_URL ||
                "https://educaju-backend.onrender.com",
            eas: {
                projectId: "9ad4228d-d74a-46fe-9d69-c0dcd1be9cd8",
            },
        },
    },
};
