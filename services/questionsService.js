import httpClient from "./httpClient";

export const questionsService = {
    async generate({ subject, content, quantity }) {
        const { data } = await httpClient.post("/api/questions/generate", {
            subject,
            content,
            quantity,
        });
        return data;
    },
};
