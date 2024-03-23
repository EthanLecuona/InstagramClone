import { Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function RemoveAccountScreen() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: "5%",
      paddingBottom: "5%",
      width: "100%",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      marginLeft: 5,
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container}>
      <Text>RemoveAccountScreen</Text>
    </View>
  );
}
