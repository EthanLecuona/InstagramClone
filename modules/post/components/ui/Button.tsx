import { Feather } from "@expo/vector-icons";
import { Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";

export default function Button({ children, onPress, style, icon }: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      width: 65,
      height: 40,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    pressed: {
      opacity: 0.5,
    },
    text: {
      padding: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.text}>
        <Text>{children}</Text>
        {icon ? <Feather name={icon} size={20} color="white" /> : null}
      </View>
    </Pressable>
  );
}
