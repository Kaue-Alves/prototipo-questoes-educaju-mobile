import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Button,
  CheckCircleIcon,
  InfoCircleIcon,
  CheckIcon,
  XIcon,
} from '@/components/ui';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';
import { Question, QuizResults } from '@/types';

interface ResultsScreenProps {
  results: QuizResults;
  questions: Question[];
  answers: Record<string, string>;
  onRestart: () => void;
}

export function ResultsScreen({
  results,
  questions,
  answers,
  onRestart,
}: ResultsScreenProps) {
  const percentage = questions.length > 0 ? (results.correct / questions.length) * 100 : 0;

  const getResultColor = () => {
    if (percentage >= 70) return Colors.greenSuccess;
    if (percentage >= 50) return Colors.orangePrimary;
    return Colors.redPrimary;
  };

  const getResultMessage = () => {
    if (percentage >= 70) return 'Parabéns! Você foi muito bem!';
    if (percentage >= 50) return 'Bom trabalho! Continue praticando!';
    return 'Continue estudando! Você vai melhorar!';
  };

  const getResultIcon = () => {
    if (percentage >= 70) {
      return <CheckCircleIcon size={40} color="#16a34a" />;
    }
    return <InfoCircleIcon size={40} color={getResultColor()} />;
  };

  const getIconBgColor = () => {
    if (percentage >= 70) return 'rgba(34, 197, 94, 0.1)';
    if (percentage >= 50) return 'rgba(233, 90, 12, 0.1)';
    return 'rgba(220, 40, 37, 0.1)';
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
            style={[styles.iconContainer, { backgroundColor: getIconBgColor() }]}
          >
            {getResultIcon()}
          </View>
          <Text style={styles.title}>Resultado Final</Text>
          <Text style={styles.subtitle}>{getResultMessage()}</Text>
        </View>

        {/* Score Grid */}
        <View style={styles.scoreGrid}>
          <View style={styles.scoreCardSuccess}>
            <Text style={styles.scoreNumber}>{results.correct}</Text>
            <Text style={styles.scoreLabel}>
              {results.correct === 1 ? 'Acerto' : 'Acertos'}
            </Text>
          </View>
          <View style={styles.scoreCardError}>
            <Text style={styles.scoreNumberError}>{results.incorrect}</Text>
            <Text style={styles.scoreLabel}>
              {results.incorrect === 1 ? 'Erro' : 'Erros'}
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
          (alt) => alt.id === userAnswerId
        );
        const correctAnswer = question.alternatives.find(
          (alt) => alt.isCorrect
        );
        const isCorrect = userAnswer?.isCorrect || false;

        return (
          <Card
            key={question.id}
            variant={isCorrect ? 'success' : 'error'}
            style={styles.reviewCard}
          >
            {/* Question Header */}
            <View style={styles.questionHeader}>
              <View
                style={[
                  styles.statusIcon,
                  {
                    backgroundColor: isCorrect
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(220, 40, 37, 0.2)',
                  },
                ]}
              >
                {isCorrect ? (
                  <CheckIcon size={24} color="#16a34a" />
                ) : (
                  <XIcon size={24} color={Colors.redPrimary} />
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
                      { color: isCorrect ? '#16a34a' : Colors.redPrimary },
                    ]}
                  >
                    {isCorrect ? 'CORRETA' : 'INCORRETA'}
                  </Text>
                </View>
                <Text style={styles.questionStatement}>
                  {question.statement}
                </Text>
              </View>
            </View>

            {/* User's Answer */}
            <View style={styles.answerBox}>
              <Text style={styles.answerLabel}>Sua resposta:</Text>
              <Text
                style={[
                  styles.answerText,
                  { color: isCorrect ? '#16a34a' : Colors.redPrimary },
                ]}
              >
                {userAnswer?.text}
              </Text>
            </View>

            {/* Correct Answer (if wrong) */}
            {!isCorrect && correctAnswer && (
              <View style={styles.correctAnswerBox}>
                <Text style={styles.answerLabel}>Resposta correta:</Text>
                <Text style={styles.correctAnswerText}>
                  {correctAnswer.text}
                </Text>
              </View>
            )}

            {/* Explanation */}
            <View style={styles.explanationBox}>
              <Text style={styles.explanationLabel}>Explicação:</Text>
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
    padding: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['4xl'],
  },
  mainCard: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
    marginBottom: Spacing['3xl'],
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.darkGray,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.lg,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  scoreGrid: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing['3xl'],
  },
  scoreCardSuccess: {
    flex: 1,
    padding: Spacing['2xl'],
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    alignItems: 'center',
  },
  scoreCardError: {
    flex: 1,
    padding: Spacing['2xl'],
    backgroundColor: 'rgba(220, 40, 37, 0.05)',
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: 'rgba(220, 40, 37, 0.3)',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: FontSizes['5xl'],
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: Spacing.sm,
  },
  scoreNumberError: {
    fontSize: FontSizes['5xl'],
    fontWeight: '700',
    color: Colors.redPrimary,
    marginBottom: Spacing.sm,
  },
  scoreLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.darkGray,
  },
  reviewTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
  },
  reviewCard: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
    marginBottom: Spacing.lg,
  },
  questionHeader: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionHeaderText: {
    flex: 1,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  questionNumber: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.mutedForeground,
  },
  questionStatus: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  questionStatement: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.darkGray,
    lineHeight: 26,
  },
  answerBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  answerLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.mutedForeground,
    marginBottom: Spacing.sm,
  },
  answerText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
  },
  correctAnswerBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  correctAnswerText: {
    fontSize: FontSizes.base,
    fontWeight: '500',
    color: '#16a34a',
  },
  explanationBox: {
    backgroundColor: 'rgba(233, 90, 12, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(233, 90, 12, 0.2)',
    padding: Spacing.lg,
  },
  explanationLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.orangePrimary,
    marginBottom: Spacing.sm,
  },
  explanationText: {
    fontSize: FontSizes.base,
    color: Colors.darkGray,
    lineHeight: 24,
  },
});
