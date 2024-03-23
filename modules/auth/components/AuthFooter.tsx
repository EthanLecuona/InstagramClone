import { FontAwesome6 } from "@expo/vector-icons";
import { Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function AuthFooter() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    rootContainer: {
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
    <View style={styles.rootContainer}>
      <View style={styles.row}>
        <FontAwesome6 name="meta" size={17.5} color={theme.colors.black} />
        <Text style={styles.text}>MetaCloning</Text>
      </View>
    </View>
  );
}
