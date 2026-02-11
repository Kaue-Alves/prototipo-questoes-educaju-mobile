import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button, RadioGroup, DocumentIcon } from "@/components/ui";

export function QuizScreen({
    subject,
    questions,
    answers,
    onAnswerChange,
    onSubmit,
}) {
    const allAnswered =
        questions.length > 0 &&
        questions.every((q) => answers[q.id] !== undefined);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Card style={styles.card}>
                {/* Header */}
                <View style={styles.headerSection}>
                    <View style={styles.iconContainer}>
                        <DocumentIcon size={32} />
                    </View>
                    <Text style={styles.title}>Questões de {subject}</Text>
                    <Text style={styles.subtitle}>
                        Responda as {questions.length}{" "}
                        {questions.length === 1 ? "questão" : "questões"} abaixo
                    </Text>
                </View>

                {/* Questions */}
                <View style={styles.questionsList}>
                    {questions.map((question, index) => (
                        <View key={question.id} style={styles.questionCard}>
                            <Text style={styles.questionText}>
                                {index + 1}. {question.statement}
                            </Text>
                            <RadioGroup
                                options={question.alternatives
                                    .sort((a, b) => a.order - b.order)
                                    .map((alt) => ({
                                        value: alt.id,
                                        label: alt.text,
                                    }))}
                                selectedValue={answers[question.id]}
                                onValueChange={(value) =>
                                    onAnswerChange(question.id, value)
                                }
                            />
                        </View>
                    ))}
                </View>

                {/* Submit Button */}
                <View style={styles.submitContainer}>
                    <Button
                        title={
                            allAnswered
                                ? "Enviar Respostas"
                                : `Responda todas as questões (${Object.keys(answers).length}/${questions.length})`
                        }
                        variant="destructive"
                        size="lg"
                        fullWidth
                        disabled={!allAnswered}
                        onPress={onSubmit}
                    />
                </View>
            </Card>
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
    card: {
        maxWidth: 700,
        alignSelf: "center",
        width: "100%",
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(220, 40, 37, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
    },
    questionsList: {
        gap: 24,
    },
    questionCard: {
        backgroundColor: "rgba(255, 251, 247, 0.5)",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        padding: 20,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 16,
        lineHeight: 24,
    },
    submitContainer: {
        marginTop: 32,
    },
});
