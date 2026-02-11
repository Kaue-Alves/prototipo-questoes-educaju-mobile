import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
    Card,
    Button,
    CheckCircleIcon,
    InfoCircleIcon,
    CheckIcon,
    XIcon,
} from "@/components/ui";

export function ResultsScreen({ results, questions, answers, onRestart }) {
    const percentage =
        questions.length > 0 ? (results.correct / questions.length) * 100 : 0;

    const getResultColor = () => {
        if (percentage >= 70) return "#22c55e";
        if (percentage >= 50) return "#e95a0c";
        return "#dc2825";
    };

    const getResultMessage = () => {
        if (percentage >= 70) return "Parabéns! Você foi muito bem!";
        if (percentage >= 50) return "Bom trabalho! Continue praticando!";
        return "Continue estudando! Você vai melhorar!";
    };

    const getResultIcon = () => {
        if (percentage >= 70) {
            return <CheckCircleIcon size={40} color="#16a34a" />;
        }
        return <InfoCircleIcon size={40} color={getResultColor()} />;
    };

    const getIconBgColor = () => {
        if (percentage >= 70) return "rgba(34, 197, 94, 0.1)";
        if (percentage >= 50) return "rgba(233, 90, 12, 0.1)";
        return "rgba(220, 40, 37, 0.1)";
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Main Results Card */}
            <Card style={styles.mainCard}>
                {/* Header */}
                <View style={styles.headerSection}>
                    <View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: getIconBgColor() },
                        ]}
                    >
                        {getResultIcon()}
                    </View>
                    <Text style={styles.title}>Resultado Final</Text>
                    <Text style={styles.subtitle}>{getResultMessage()}</Text>
                </View>

                {/* Score Grid */}
                <View style={styles.scoreGrid}>
                    <View style={styles.scoreCardSuccess}>
                        <Text style={styles.scoreNumber}>
                            {results.correct}
                        </Text>
                        <Text style={styles.scoreLabel}>
                            {results.correct === 1 ? "Acerto" : "Acertos"}
                        </Text>
                    </View>
                    <View style={styles.scoreCardError}>
                        <Text style={styles.scoreNumberError}>
                            {results.incorrect}
                        </Text>
                        <Text style={styles.scoreLabel}>
                            {results.incorrect === 1 ? "Erro" : "Erros"}
                        </Text>
                    </View>
                </View>

                {/* Restart Button */}
                <Button
                    title="Fazer Novo Estudo"
                    size="lg"
                    fullWidth
                    onPress={onRestart}
                />
            </Card>

            {/* Detailed Review */}
            <Text style={styles.reviewTitle}>Revisão das Questões</Text>

            {questions.map((question, index) => {
                const userAnswerId = answers[question.id];
                const userAnswer = question.alternatives.find(
                    (alt) => alt.id === userAnswerId,
                );
                const correctAnswer = question.alternatives.find(
                    (alt) => alt.isCorrect,
                );
                const isCorrect = userAnswer?.isCorrect || false;

                return (
                    <Card
                        key={question.id}
                        variant={isCorrect ? "success" : "error"}
                        style={styles.reviewCard}
                    >
                        {/* Question Header */}
                        <View style={styles.questionHeader}>
                            <View
                                style={[
                                    styles.statusIcon,
                                    {
                                        backgroundColor: isCorrect
                                            ? "rgba(34, 197, 94, 0.2)"
                                            : "rgba(220, 40, 37, 0.2)",
                                    },
                                ]}
                            >
                                {isCorrect ? (
                                    <CheckIcon size={24} color="#16a34a" />
                                ) : (
                                    <XIcon size={24} color="#dc2825" />
                                )}
                            </View>
                            <View style={styles.questionHeaderText}>
                                <View style={styles.questionMeta}>
                                    <Text style={styles.questionNumber}>
                                        Questão {index + 1}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.questionStatus,
                                            {
                                                color: isCorrect
                                                    ? "#16a34a"
                                                    : "#dc2825",
                                            },
                                        ]}
                                    >
                                        {isCorrect ? "CORRETA" : "INCORRETA"}
                                    </Text>
                                </View>
                                <Text style={styles.questionStatement}>
                                    {question.statement}
                                </Text>
                            </View>
                        </View>

                        {/* User's Answer */}
                        <View style={styles.answerBox}>
                            <Text style={styles.answerLabel}>
                                Sua resposta:
                            </Text>
                            <Text
                                style={[
                                    styles.answerText,
                                    {
                                        color: isCorrect
                                            ? "#16a34a"
                                            : "#dc2825",
                                    },
                                ]}
                            >
                                {userAnswer?.text}
                            </Text>
                        </View>

                        {/* Correct Answer (if wrong) */}
                        {!isCorrect && correctAnswer && (
                            <View style={styles.correctAnswerBox}>
                                <Text style={styles.answerLabel}>
                                    Resposta correta:
                                </Text>
                                <Text style={styles.correctAnswerText}>
                                    {correctAnswer.text}
                                </Text>
                            </View>
                        )}

                        {/* Explanation */}
                        <View style={styles.explanationBox}>
                            <Text style={styles.explanationLabel}>
                                Explicação:
                            </Text>
                            <Text style={styles.explanationText}>
                                {isCorrect
                                    ? userAnswer?.explanation
                                    : correctAnswer?.explanation}
                            </Text>
                        </View>
                    </Card>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 24,
        paddingBottom: 48,
    },
    mainCard: {
        maxWidth: 700,
        alignSelf: "center",
        width: "100%",
        marginBottom: 32,
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#6b7280",
        textAlign: "center",
    },
    scoreGrid: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 32,
    },
    scoreCardSuccess: {
        flex: 1,
        padding: 24,
        backgroundColor: "rgba(34, 197, 94, 0.05)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(34, 197, 94, 0.3)",
        alignItems: "center",
    },
    scoreCardError: {
        flex: 1,
        padding: 24,
        backgroundColor: "rgba(220, 40, 37, 0.05)",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(220, 40, 37, 0.3)",
        alignItems: "center",
    },
    scoreNumber: {
        fontSize: 48,
        fontWeight: "700",
        color: "#16a34a",
        marginBottom: 8,
    },
    scoreNumberError: {
        fontSize: 48,
        fontWeight: "700",
        color: "#dc2825",
        marginBottom: 8,
    },
    scoreLabel: {
        fontSize: 18,
        fontWeight: "500",
        color: "#111827",
    },
    reviewTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        textAlign: "center",
        marginBottom: 24,
    },
    reviewCard: {
        maxWidth: 700,
        alignSelf: "center",
        width: "100%",
        marginBottom: 16,
    },
    questionHeader: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },
    statusIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    questionHeaderText: {
        flex: 1,
    },
    questionMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    questionNumber: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6b7280",
    },
    questionStatus: {
        fontSize: 14,
        fontWeight: "700",
    },
    questionStatement: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        lineHeight: 26,
    },
    answerBox: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        padding: 16,
        marginBottom: 16,
    },
    answerLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6b7280",
        marginBottom: 8,
    },
    answerText: {
        fontSize: 16,
        fontWeight: "500",
    },
    correctAnswerBox: {
        backgroundColor: "rgba(34, 197, 94, 0.05)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(34, 197, 94, 0.3)",
        padding: 16,
        marginBottom: 16,
    },
    correctAnswerText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#16a34a",
    },
    explanationBox: {
        backgroundColor: "rgba(233, 90, 12, 0.05)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(233, 90, 12, 0.2)",
        padding: 16,
    },
    explanationLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#e95a0c",
        marginBottom: 8,
    },
    explanationText: {
        fontSize: 16,
        color: "#111827",
        lineHeight: 24,
    },
});
