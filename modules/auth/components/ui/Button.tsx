import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@rneui/themed";

function Button({ children, onPress }: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderRadius: 40,
      paddingVertical: 15,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.primary,
      minWidth: "100%",
      alignSelf: "center",
    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.black,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;
