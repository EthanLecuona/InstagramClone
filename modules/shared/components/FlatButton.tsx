import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@rneui/themed";

function FlatButton({ children, onPress, textStyle }: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 6,
      paddingHorizontal: 4,
    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.black,
    },
  });
  
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;
