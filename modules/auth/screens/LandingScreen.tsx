import { Image } from "@rneui/base";
import { Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Background from "../components/ui/Background";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamListAuth } from "../../navigation/Routes";
import { Ionicons } from "@expo/vector-icons";

export default function LandingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamListAuth>>();

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    logo: {
      height: 75,
      width: 75,
      overflow: "hidden",
      marginTop: 10,
    },
    profilePicture: {
      marginTop: 50,
      borderRadius: 100,
      borderColor: "#1C2A33",
      borderWidth: 5,
      width: 200,
      height: 200,
    },
    username: {
      marginTop: 20,
      fontSize: 25,
      marginBottom: 20,
      fontWeight: "bold",
    },
    settingsRow: {
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    anotherAccount: {
      borderColor: "#475A69",
      borderWidth: 1,
      backgroundColor: "transparent",
    },
    createAccount: {
      borderColor: "#4398FF",
      marginTop: 35,
      borderWidth: 1,
      backgroundColor: "transparent",
    },
  });
  function RemoveAccount() {
    navigation.navigate("RemoveAccount");
  }
  function Login() {
    navigation.navigate("Login");
  }
  function Register() {
    navigation.navigate("Register");
  }
  return (
    <Background>
      <View style={styles.settingsRow}>
        <Ionicons
          name="settings-outline"
          size={30}
          color={theme.colors.black}
          onPress={RemoveAccount}
        />
      </View>
      <Image
        source={require("../assets/InstagramOutline.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/ethan.jpg")}
        style={styles.profilePicture}
      />
      <Text style={styles.username}>ethanlecuona</Text>
      <View style={styles.buttonContainer}>
        <Button>Log In</Button>
        <Button onPress={Login} buttonStyle={styles.anotherAccount}>
          Log into another account
        </Button>

        <Button
          buttonStyle={styles.createAccount}
          textStyle={{ color: "#4398FF" }}
          onPress={Register}
        >
          Create new account
        </Button>
      </View>
      <AuthFooter />
    </Background>
  );
}
