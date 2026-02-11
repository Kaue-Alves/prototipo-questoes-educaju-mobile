import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Card, Input, Button, ClockIcon } from "@/components/ui";

export function SetupScreen({
    subject,
    setSubject,
    content,
    setContent,
    questionCount,
    setQuestionCount,
    studyTime,
    setStudyTime,
    onStartStudy,
}) {
    const isValid =
        studyTime &&
        parseInt(studyTime) > 0 &&
        parseInt(studyTime) <= 120 &&
        subject.trim() &&
        content.trim() &&
        questionCount &&
        parseInt(questionCount) > 0 &&
        parseInt(questionCount) <= 50;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Card style={styles.card}>
                    {/* Header Icon & Title */}
                    <View style={styles.headerSection}>
                        <View style={styles.iconContainer}>
                            <ClockIcon size={32} />
                        </View>
                        <Text style={styles.title}>Vamos começar!</Text>
                        <Text style={styles.subtitle}>
                            Configure seu estudo e as questões que deseja
                            responder
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Matéria/Disciplina"
                            value={subject}
                            onChangeText={setSubject}
                            placeholder="Ex: História, Matemática, Geografia"
                        />

                        <Input
                            label="Conteúdo"
                            value={content}
                            onChangeText={setContent}
                            placeholder="Ex: Guerra Fria, Equações do 2º grau"
                            hint="Tema específico que você vai estudar"
                        />

                        <Input
                            label="Quantidade de questões"
                            value={questionCount}
                            onChangeText={setQuestionCount}
                            placeholder="Ex: 10"
                            keyboardType="numeric"
                            hint="Entre 1 e 50 questões"
                        />

                        <Input
                            label="Tempo de estudo (minutos)"
                            value={studyTime}
                            onChangeText={setStudyTime}
                            placeholder="Ex: 30"
                            keyboardType="numeric"
                            hint="Entre 1 e 120 minutos"
                        />

                        <Button
                            title="Iniciar Estudo"
                            onPress={onStartStudy}
                            disabled={!isValid}
                            size="lg"
                            fullWidth
                        />
                    </View>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
        paddingTop: 32,
        paddingBottom: 48,
    },
    card: {
        maxWidth: 500,
        alignSelf: "center",
        width: "100%",
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 24,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(233, 90, 12, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
    },
    form: {
        gap: 4,
    },
});
