import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function NavSearchInput({ textStyle }: any) {
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: "row",
      width: "95%",
      alignItems: "center",
      borderRadius: 20,
      padding: 3,
      backgroundColor: "#25282D",
    },
    input: {
      width: "75%",
      height: 40,
      color: "white",
      backgroundColor: "#25282D",
    },
    icon: {
      marginHorizontal: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name="search-outline"
        size={24}
        color="white"
      />
      <TextInput
        placeholderTextColor="white"
        style={[styles.input, textStyle]}
        placeholder="Search..."
      />
    </View>
  );
}
