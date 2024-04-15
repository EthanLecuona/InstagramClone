import AuthContent from "../components/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useUserStore } from "../../../store/UserStore";
import Background from "../components/ui/Background";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "@rneui/base";
import { Text } from "@rneui/themed";
import AuthForm from "../components/AuthForm";
import { useTheme } from "@rneui/themed";
import FlatButton from "../components/ui/FlatButton";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamListAuth } from "../../navigation/Routes";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamListAuth>>();

  /* 
  ---------------------------------------------------------------
  ------------------- Login User -------------------
  ---------------------------------------------------------------
  */
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const userStore = useUserStore();
  async function loginHandler({ email, password }: any) {
    setIsAuthenticating(true);
    await userStore.signIn(email, password);
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  /* 
  ---------------------------------------------------------------
  ------------------- Gets input values -------------------
  ---------------------------------------------------------------
  */
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function updateInputValueHandler(inputType: any, enteredValue: any) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }
  /* 
  ---------------------------------------------------------------
  ------------------- Validates inputs and submits -------------------
  ---------------------------------------------------------------
  */
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  function submitHandler(credentials: any) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    loginHandler({ email, password });
  }

  function createAccount() {
    navigation.navigate("Register");
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: height * 0.5,
    },
    language: {},
    authContent: {
      marginHorizontal: 16,
      paddingTop: "7.5%",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      height: 100,
      width: 100,
      marginVertical: 75,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    forgotPasswordContainer: {},
    forgotPasswordText: {
      fontWeight: "bold",
      fontSize: 15,
    },
    loginButton: {
      marginTop: 12,
      alignSelf: "center",
    },
    createAccount: {
      borderColor: "#4398FF",
      borderWidth: 1,
      backgroundColor: "transparent",
    },
    createAccountContainer: {
      alignItems: "center",
      alignSelf: "center",
      marginTop: 50,
    },
  });

  return (
    <Background>
      <View style={styles.container}>
        <Text>English (US)</Text>
        <Image
          source={require("../assets/InstagramOutline.png")}
          style={styles.image}
        />
        <View style={styles.authContent}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <Input
              onUpdateValue={updateInputValueHandler.bind(null, "email")}
              value={enteredEmail}
              keyboardType="email-address"
              isInvalid={credentialsInvalid.email}
              secure={false}
              placeholder={"Username, email or mobile number"}
              label={"Username, email or mobile number"}
            />
            <Input
              onUpdateValue={updateInputValueHandler.bind(null, "password")}
              secure
              value={enteredPassword}
              isInvalid={credentialsInvalid.password}
              placeholder={"Password"}
              label={"Password"}
            />
            <View style={styles.loginButton}>
              <Button onPress={submitHandler}>Log In</Button>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <FlatButton textStyle={styles.forgotPasswordText}>
                Forgot Password?
              </FlatButton>
            </View>
            <View style={styles.createAccountContainer}>
              <Button
                onPress={createAccount}
                buttonStyle={styles.createAccount}
              >
                Create new account
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>

      <AuthFooter />
    </Background>
  );
}

export default LoginScreen;
