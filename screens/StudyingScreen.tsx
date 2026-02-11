import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, BookIcon } from '@/components/ui';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

interface StudyingScreenProps {
  subject: string;
  content: string;
  timeLeft: number;
  isGeneratingQuestions: boolean;
  onSkipTimer: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function StudyingScreen({
  subject,
  content,
  timeLeft,
  isGeneratingQuestions,
  onSkipTimer,
}: StudyingScreenProps) {
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
            Foque nos seus estudos. As questões aparecerão ao final do tempo.
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
            <Text style={styles.generatingText}>Gerando questões...</Text>
          ) : (
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          )}
          <Text style={styles.timerLabel}>
            {isGeneratingQuestions ? 'Aguarde um momento' : 'Tempo restante'}
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
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  card: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    padding: Spacing['3xl'],
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(233, 90, 12, 0.1)',
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
    marginBottom: Spacing.md,
  },
  tagContainer: {
    backgroundColor: 'rgba(233, 90, 12, 0.1)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  tagText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.orangePrimary,
  },
  timerBox: {
    backgroundColor: 'rgba(233, 90, 12, 0.05)',
    borderRadius: BorderRadius.lg,
    padding: Spacing['3xl'],
    borderWidth: 2,
    borderColor: 'rgba(233, 90, 12, 0.3)',
    alignItems: 'center',
  },
  timerText: {
    fontSize: FontSizes['7xl'],
    fontWeight: '700',
    color: Colors.orangePrimary,
    fontVariant: ['tabular-nums'],
  },
  generatingText: {
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: Colors.orangePrimary,
  },
  timerLabel: {
    fontSize: FontSizes.sm,
    color: Colors.mutedForeground,
    marginTop: Spacing.lg,
  },
  buttonContainer: {
    marginTop: Spacing['2xl'],
    alignItems: 'center',
  },
});
