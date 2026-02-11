import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '@/constants/theme';

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
      <Text style={styles.title}>Educaju</Text>
      <Text style={styles.subtitle}>Aprender junto é sempre aprender melhor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.darkGray,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.cream,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 251, 247, 0.8)',
    marginTop: Spacing.xs,
  },
});
