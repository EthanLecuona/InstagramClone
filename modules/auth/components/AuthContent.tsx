import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
// import AuthFooter from "./AuthFooter";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@rneui/themed";
import { RootStackParamListAuth } from "../../navigation/Routes";
import AuthProviders from "./AuthProviders";
import AuthFooter from "./AuthFooter";
import Button from "./ui/Button";
import ButtonOutline from "./ui/ButtonOutline";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: { email: string; password: string }) => void;
}

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamListAuth>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Signin");
    }
  }

  function submitHandler(credentials: any) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: "7.5%",
    },
    logo: {
      height: 75,
      width: 75,
      overflow: "hidden",
      marginTop: "5%",
    },
    profilePicture: {
      marginTop: "15%",
      borderRadius: 100,
      borderColor: theme.colors.grey5,
      borderWidth: 5,
      width: 200,
      height: 200,
    },
    username: {
      marginTop: 20,
      fontSize: 25,
      marginBottom: 20,
    },
    settingsRow: {
      flexDirection: "row",
      marginTop: "5%",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    buttonContainer: {
      paddingHorizontal: "5%",
      paddingTop: "5%",
      flexDirection: "column",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    createAccount: {
      marginTop: "10%",
    },
    anotherAccount: {
      borderColor: "#475A69",
    },
  });

  function RemoveAccount() {
    navigation.navigate("RemoveAccount");
  }

  return (
    <>
      <View style={styles.container}>
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
          <ButtonOutline buttonStyle={styles.anotherAccount}>
            Log into another account
          </ButtonOutline>

          <ButtonOutline
            buttonStyle={{ borderColor: "#4398FF", marginTop: 30 }}
            textStyle={{ color: "#4398FF" }}
          >
            Create new account
          </ButtonOutline>
        </View>
        <AuthFooter />
      </View>
    </>
  );
}

export default AuthContent;
