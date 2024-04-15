import { Image, Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Background from "../components/ui/Background";
import FlatButton from "../components/ui/FlatButton";

export default function RemoveAccountScreen() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    col: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    username: {
      fontWeight: "bold",
      fontSize: 20,
      marginVertical: 15,
    },
    profilePicture: {
      marginTop: 70,
      borderRadius: 50,
      width: 100,
      height: 100,
    },
    removeAccountContainer: {
      backgroundColor: "#1C2A33",
      alignItems: "flex-start",
      minWidth: "90%",
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginTop: 30,
      // flex: 1,
    },
    removeAccountText: {
      color: "#F85B65",
      fontSize: 17,
    },
    flatButton: {
      color: "#4DA4F1",
    },
  });

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require("../assets/ethan.jpg")}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>ethanlecuona</Text>

        <View style={styles.removeAccountContainer}>
          <Text style={styles.removeAccountText}>Remove profile</Text>
        </View>
        <View style={styles.col}>
          <View style={styles.row}>
            <FlatButton textStyle={styles.flatButton}>Learn more</FlatButton>
            <Text>about why you see this profile and what it means to</Text>
          </View>
          <Text>remove it.</Text>
        </View>
      </View>
    </Background>
  );
}
