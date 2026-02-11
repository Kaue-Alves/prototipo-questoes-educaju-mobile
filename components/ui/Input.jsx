import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TextInputProps,
} from "react-native";

export function Input({ label, hint, error, style, ...props }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor="#6b7280"
                {...props}
            />
            {hint && !error && <Text style={styles.hint}>{hint}</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(233, 90, 12, 0.3)",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 18,
        color: "#111827",
        backgroundColor: "#ffffff",
    },
    inputError: {
        borderColor: "#dc2825",
    },
    hint: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 8,
    },
    error: {
        fontSize: 14,
        color: "#dc2825",
        marginTop: 8,
    },
});
