import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

function Input({
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  label,
}: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    inputContainer: {
      // flex: 1,
      marginVertical: 4,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: "#475A6A",
      backgroundColor: "#1C2A33",
      borderRadius: 15,
      flexDirection: "column",
      alignSelf: "center",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
    },
    labelInvalid: {
      color: theme.colors.error,
    },
    label: {
      color: "#CDD2D6",
      paddingHorizontal: 6,
      fontSize: 15,
    },
    input: {
      paddingHorizontal: 6,
      backgroundColor: "transparent",
      borderRadius: 4,
      fontSize: 17,
      fontWeight: "bold",
      color: !isInvalid ? theme.colors.black : theme.colors.primary,
      flex: 1,
      width: "100%",
    },
  });

  return (
    <View style={styles.inputContainer}>
      {label && value && (
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.input]}
        placeholderTextColor={"#727F85"}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;
