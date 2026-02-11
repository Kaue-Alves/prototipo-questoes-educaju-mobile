import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, RadioGroup, DocumentIcon } from '@/components/ui';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';
import { Question } from '@/types';

interface QuizScreenProps {
  subject: string;
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, alternativeId: string) => void;
  onSubmit: () => void;
}

export function QuizScreen({
  subject,
  questions,
  answers,
  onAnswerChange,
  onSubmit,
}: QuizScreenProps) {
  const allAnswered =
    questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);

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
            Responda as {questions.length}{' '}
            {questions.length === 1 ? 'questão' : 'questões'} abaixo
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
                onValueChange={(value) => onAnswerChange(question.id, value)}
              />
            </View>
          ))}
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <Button
            title={
              allAnswered
                ? 'Enviar Respostas'
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
    padding: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['4xl'],
  },
  card: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(220, 40, 37, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  questionsList: {
    gap: Spacing['2xl'],
  },
  questionCard: {
    backgroundColor: 'rgba(255, 251, 247, 0.5)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
  },
  questionText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  submitContainer: {
    marginTop: Spacing['3xl'],
  },
});
