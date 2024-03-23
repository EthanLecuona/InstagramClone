import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@rneui/themed";

function ButtonOutline({ children, onPress, buttonStyle, textStyle }: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderRadius: 40,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 12,
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
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        buttonStyle,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default ButtonOutline;
