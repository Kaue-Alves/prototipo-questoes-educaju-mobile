import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/theme';

export function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Educaju - Estudo guiado com avaliação</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: 'rgba(17, 24, 39, 0.05)',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.sm,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
});
