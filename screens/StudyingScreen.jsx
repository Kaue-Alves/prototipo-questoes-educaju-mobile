import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, BookIcon } from "@/components/ui";

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function StudyingScreen({
    subject,
    content,
    timeLeft,
    isGeneratingQuestions,
    onSkipTimer,
}) {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                {/* Header */}
                <View style={styles.headerSection}>
                    <View style={styles.iconContainer}>
                        <BookIcon size={40} />
                    </View>
                    <Text style={styles.title}>Hora de estudar!</Text>
                    <Text style={styles.subtitle}>
                        Foque nos seus estudos. As questões aparecerão ao final
                        do tempo.
                    </Text>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tagText}>
                            {subject} - {content}
                        </Text>
                    </View>
                </View>

                {/* Timer */}
                <View style={styles.timerBox}>
                    {isGeneratingQuestions ? (
                        <Text style={styles.generatingText}>
                            Gerando questões...
                        </Text>
                    ) : (
                        <Text style={styles.timerText}>
                            {formatTime(timeLeft)}
                        </Text>
                    )}
                    <Text style={styles.timerLabel}>
                        {isGeneratingQuestions
                            ? "Aguarde um momento"
                            : "Tempo restante"}
                    </Text>
                </View>

                {/* Skip Button */}
                {!isGeneratingQuestions && (
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Pular cronômetro e ir para as questões"
                            variant="outline"
                            onPress={onSkipTimer}
                        />
                    </View>
                )}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    card: {
        maxWidth: 600,
        alignSelf: "center",
        width: "100%",
        padding: 32,
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(233, 90, 12, 0.1)",
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
        marginBottom: 12,
    },
    tagContainer: {
        backgroundColor: "rgba(233, 90, 12, 0.1)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    tagText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#e95a0c",
    },
    timerBox: {
        backgroundColor: "rgba(233, 90, 12, 0.05)",
        borderRadius: 10,
        padding: 32,
        borderWidth: 2,
        borderColor: "rgba(233, 90, 12, 0.3)",
        alignItems: "center",
    },
    timerText: {
        fontSize: 64,
        fontWeight: "700",
        color: "#e95a0c",
        fontVariant: ["tabular-nums"],
    },
    generatingText: {
        fontSize: 24,
        fontWeight: "600",
        color: "#e95a0c",
    },
    timerLabel: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 16,
    },
    buttonContainer: {
        marginTop: 24,
        alignItems: "center",
    },
});
