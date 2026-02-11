import { View, Text, StyleSheet } from "react-native";

export function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>
                © 2025 Educaju - Estudo guiado com avaliação
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingTop: 24,
        paddingBottom: 54,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        backgroundColor: "rgba(17, 24, 39, 0.05)",
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
    },
});
