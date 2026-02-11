import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
    SetupScreen,
    StudyingScreen,
    QuizScreen,
    ResultsScreen,
} from "@/screens";
import { API_CONFIG } from "@/constants/api";
import { Colors } from "@/constants/theme";

export default function App() {
    const [stage, setStage] = useState("setup");
    const [studyTime, setStudyTime] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [questionCount, setQuestionCount] = useState("10");
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
    const [results, setResults] = useState(null);

    const generateQuestions = useCallback(async () => {
        setIsGeneratingQuestions(true);
        try {
            const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.generateQuestions}`;
            console.log("[Mobile] Calling API:", url);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject: subject,
                    content: content,
                    quantity: parseInt(questionCount),
                }),
            });

            console.log("[Mobile] Response status:", response.status);

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const textResponse = await response.text();
                console.error(
                    "[Mobile] Expected JSON but got:",
                    textResponse.substring(0, 200),
                );
                throw new Error(
                    "O servidor não retornou JSON. Verifique se a URL da API está correta.",
                );
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("[Mobile] Error response:", errorData);
                throw new Error(
                    errorData.message || `Erro HTTP: ${response.status}`,
                );
            }

            const data = await response.json();
            console.log("[Mobile] Questions received:", data.length);
            setQuestions(data);
            setStage("quiz");
        } catch (error) {
            console.error("[Mobile] Erro ao gerar questões:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            Alert.alert(
                "Erro ao gerar questões",
                `${errorMessage}\n\nVerifique:\n1. O backend está rodando?\n2. A URL da API está correta?\n3. A rota está acessível do dispositivo?`,
                [{ text: "OK" }],
            );
            setStage("setup");
        } finally {
            setIsGeneratingQuestions(false);
        }
    }, [subject, content, questionCount]);

    // Timer effect
    useEffect(() => {
        if (stage === "studying" && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        generateQuestions();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [stage, timeLeft, generateQuestions]);

    const handleStartStudy = () => {
        const minutes = parseInt(studyTime);
        const count = parseInt(questionCount);
        if (
            minutes > 0 &&
            minutes <= 120 &&
            subject.trim() &&
            content.trim() &&
            count > 0 &&
            count <= 50
        ) {
            setTimeLeft(minutes * 60);
            setStage("studying");
        }
    };

    const handleSkipTimer = () => {
        setTimeLeft(0);
        generateQuestions();
    };

    const handleAnswerChange = (questionId, alternativeId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
    };

    const handleSubmit = () => {
        let correct = 0;
        let incorrect = 0;

        questions.forEach((question) => {
            const selectedAlternativeId = answers[question.id];
            const selectedAlternative = question.alternatives.find(
                (alt) => alt.id === selectedAlternativeId,
            );

            if (selectedAlternative?.isCorrect) {
                correct++;
            } else {
                incorrect++;
            }
        });

        setResults({ correct, incorrect });
        setStage("results");
    };

    const handleRestart = () => {
        setStage("setup");
        setStudyTime("");
        setSubject("");
        setContent("");
        setQuestionCount("10");
        setTimeLeft(0);
        setAnswers({});
        setQuestions([]);
        setResults(null);
    };

    const renderStage = () => {
        switch (stage) {
            case "setup":
                return (
                    <SetupScreen
                        subject={subject}
                        setSubject={setSubject}
                        content={content}
                        setContent={setContent}
                        questionCount={questionCount}
                        setQuestionCount={setQuestionCount}
                        studyTime={studyTime}
                        setStudyTime={setStudyTime}
                        onStartStudy={handleStartStudy}
                    />
                );
            case "studying":
                return (
                    <StudyingScreen
                        subject={subject}
                        content={content}
                        timeLeft={timeLeft}
                        isGeneratingQuestions={isGeneratingQuestions}
                        onSkipTimer={handleSkipTimer}
                    />
                );
            case "quiz":
                return (
                    <QuizScreen
                        subject={subject}
                        questions={questions}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                        onSubmit={handleSubmit}
                    />
                );
            case "results":
                return results ? (
                    <ResultsScreen
                        results={results}
                        questions={questions}
                        answers={answers}
                        onRestart={handleRestart}
                    />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.darkGray}
            />
            <View style={styles.container}>
                <Header />
                <View style={styles.main}>{renderStage()}</View>
                <Footer />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    main: {
        flex: 1,
    },
});
