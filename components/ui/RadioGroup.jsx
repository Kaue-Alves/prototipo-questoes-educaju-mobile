import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function RadioGroup({ options, selectedValue, onValueChange }) {
    return (
        <View style={styles.container}>
            {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.option}
                        onPress={() => onValueChange(option.value)}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.radio,
                                isSelected && styles.radioSelected,
                            ]}
                        >
                            {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <Text
                            style={[
                                styles.label,
                                isSelected && styles.labelSelected,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        gap: 12,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#e5e7eb",
        alignItems: "center",
        justifyContent: "center",
    },
    radioSelected: {
        borderColor: "#e95a0c",
    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#e95a0c",
    },
    label: {
        fontSize: 16,
        color: "#111827",
        flex: 1,
    },
    labelSelected: {
        fontWeight: "500",
    },
});
