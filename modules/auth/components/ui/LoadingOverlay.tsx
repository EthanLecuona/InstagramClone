import { useTheme } from "@rneui/themed";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ message }: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
    },
    message: {
      fontSize: 16,
      marginBottom: 12,
      color: theme.colors.black,
    },
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;
