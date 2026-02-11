import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'orange';
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', style, ...props }: CardProps) {
  return (
    <View style={[styles.card, styles[`variant_${variant}`], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing['2xl'],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  variant_default: {
    borderWidth: 1,
    borderColor: 'rgba(233, 90, 12, 0.2)',
  },
  variant_success: {
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  variant_error: {
    borderWidth: 2,
    borderColor: 'rgba(220, 40, 37, 0.3)',
    backgroundColor: 'rgba(220, 40, 37, 0.05)',
  },
  variant_orange: {
    borderWidth: 2,
    borderColor: 'rgba(233, 90, 12, 0.3)',
    backgroundColor: 'rgba(233, 90, 12, 0.05)',
  },
});
