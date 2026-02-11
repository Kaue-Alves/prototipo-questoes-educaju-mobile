import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from "react-native";

export function Button({
    title,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    style,
    ...props
}) {
    const buttonStyles = [
        styles.base,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
    ].filter(Boolean);

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`textSize_${size}`],
        disabled && styles.textDisabled,
    ].filter(Boolean);

    return (
        <TouchableOpacity
            style={[...buttonStyles, style]}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={
                        variant === "outline" || variant === "ghost"
                            ? "#e95a0c"
                            : "#fffbf7"
                    }
                    size="small"
                />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        flexDirection: "row",
    },
    fullWidth: {
        width: "100%",
    },
    disabled: {
        opacity: 0.5,
    },
    // Variants
    variant_primary: {
        backgroundColor: "#e95a0c",
    },
    variant_secondary: {
        backgroundColor: "#111827",
    },
    variant_outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: "#e95a0c",
    },
    variant_destructive: {
        backgroundColor: "#dc2825",
    },
    variant_ghost: {
        backgroundColor: "transparent",
    },
    // Sizes
    size_sm: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    size_md: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    size_lg: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 56,
    },
    // Text
    text: {
        fontWeight: "600",
        textAlign: "center",
    },
    text_primary: {
        color: "#fffbf7",
    },
    text_secondary: {
        color: "#fffbf7",
    },
    text_outline: {
        color: "#e95a0c",
    },
    text_destructive: {
        color: "#fffbf7",
    },
    text_ghost: {
        color: "#e95a0c",
    },
    textSize_sm: {
        fontSize: 14,
    },
    textSize_md: {
        fontSize: 16,
    },
    textSize_lg: {
        fontSize: 18,
    },
    textDisabled: {
        opacity: 0.7,
    },
});
