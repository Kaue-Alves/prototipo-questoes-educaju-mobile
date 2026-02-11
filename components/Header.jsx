import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
            <Text style={styles.title}>Educaju</Text>
            <Text style={styles.subtitle}>
                Aprender junto é sempre aprender melhor
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#111827",
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fffbf7",
    },
    subtitle: {
        fontSize: 14,
        color: "rgba(255, 251, 247, 0.8)",
        marginTop: 4,
    },
});
