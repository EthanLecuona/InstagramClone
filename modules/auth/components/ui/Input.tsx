import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

function Input({
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  icon,
}: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    inputContainer: {
      marginVertical: 12,
      paddingVertical: 12,
      paddingHorizontal: 4,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 5,
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "90%",
    },
    labelInvalid: {
      color: theme.colors.error,
    },
    input: {
      paddingVertical: 8,
      paddingHorizontal: 6,
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      fontSize: 16,
      color: !isInvalid ? theme.colors.black : theme.colors.primary,
      flex: 1,
    },
    icon: {
      paddingHorizontal: 12,
      color: !isInvalid ? theme.colors.black : theme.colors.primary,
    },
  });
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={24}
        // color={theme.colors.black}
      />
      <TextInput
        style={[styles.input]}
        placeholderTextColor={theme.colors.black}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
      {/* {isInvalid && (
        <Ionicons
          name="checkmark-circle-outline"
          size={24}
          color="green"
          style={{ paddingRight: 8 }}
        />
      )} */}
    </View>
  );
}

export default Input;
