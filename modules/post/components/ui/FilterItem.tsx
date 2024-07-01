import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@rneui/themed";
import { Pressable, StyleSheet } from "react-native";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

export default function FilterItem({ name, icon, onPress }: any) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 50,
      height: 100,
      width: 100,
      marginHorizontal: 5,
    },
    text: {
      marginVertical: 5,
      fontSize: 16,
    },
    pressed: {
      opacity: 0.5,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{capitalizeFirstLetter(name)}</Text>
      <MaterialCommunityIcons name={icon} size={24} color="white" />
    </Pressable>
  );
}
