import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function Background({ children }: any) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    topBar: {
      width: "100%",
      height: 35,
      backgroundColor: "black",
    },
  });
  return (
    <>
      <View style={styles.topBar} />
      <LinearGradient
        colors={["#1E1D2B", "#0E202E", "#0E202E", "#112724"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </>
  );
}
