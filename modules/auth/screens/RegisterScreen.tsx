import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../../store/UserStore";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useState } from "react";
import Background from "../components/ui/Background";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamListAuth } from "../../navigation/Routes";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

function SignupScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamListAuth>>();

  const [isScreen, setIsScreen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    phoneNumber: false,
  });

  /* 
  ---------------------------------------------------------------
  ------------------- Register User -------------------
  ---------------------------------------------------------------
  */
  const userStore = useUserStore();
  async function signupHandler({ email, password }: any) {
    setIsAuthenticating(true);
    await userStore.signUp(email, password);
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
  function updateInputValueHandler(inputType: any, enteredValue: any) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "phoneNumber":
        setEnteredPhoneNumber(enteredValue);
        break;
    }
  }
  /* 
  ---------------------------------------------------------------
  ------------------- Validates inputs and submits -------------------
  ---------------------------------------------------------------
  */
  const { email: emailIsInvalid, phoneNumber: phoneNumberIsValid } =
    credentialsInvalid;

  function submitHandler(credentials: any) {
    let { email, phoneNumber } = credentials;

    email = email.trim();
    phoneNumber = phoneNumber.trim();

    const emailIsValid = email.includes("@");
    const phoneNumberIsValid =
      phoneNumber.length > 11 || phoneNumber.length < 12;

    if (!emailIsValid || !phoneNumberIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        phoneNumber: !phoneNumberIsValid,
      });
      return;
    }
    signupHandler({ email, phoneNumber });
  }

  function handleScreenChange() {
    setIsScreen(!isScreen);
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: height * 0.3,
      paddingHorizontal: 16,
    },
    title: {
      fontWeight: "bold",
      fontSize: 26,
      marginVertical: 12,
    },
    signupButton: {
      backgroundColor: "transparent",
      borderColor: "#475A6A",
      borderWidth: 1.2,
    },
    nextButtonContainer: {
      marginTop: 8,
    },
    alreadyAccount: {
      marginBottom: 14,
    },
    alreadyAccountText: {
      color: "#44A6FD",
    },
    input: {
      marginVertical: 12,
    },
    nextButton: {},
  });

  function handleAlreadyAccount() {
    navigation.navigate("Login");
  }

  return (
    <Background>
      <View style={styles.container}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <Text style={styles.title}>
            {isScreen ? "What's your mobile number?" : "What's your email?"}
          </Text>
          <Text>
            {isScreen
              ? "Enter the mobile number where you can be contacted. No one will see this on your profile."
              : "Enter the email where you can be contacted. No one will see this on your profile."}
          </Text>
          <View style={styles.input}>
            {isScreen ? (
              <Input
                onUpdateValue={updateInputValueHandler.bind(
                  null,
                  "phoneNumber"
                )}
                secure={false}
                value={enteredPhoneNumber}
                keyboardType="email-address"
                isInvalid={phoneNumberIsValid}
                placeholder={"Mobile number"}
                label={"Mobile number"}
              />
            ) : (
              <Input
                onUpdateValue={updateInputValueHandler.bind(null, "email")}
                secure={false}
                value={enteredEmail}
                keyboardType="email-address"
                isInvalid={enteredEmail}
                placeholder={"Email address"}
                label={"Email address"}
              />
            )}
          </View>
          {isScreen && (
            <Text>
              You may receive SMS notification from us for security and login
              purposes.
            </Text>
          )}
          <View style={styles.nextButtonContainer}>
            <Button buttonStyle={styles.nextButton} onPress={submitHandler}>
              Next
            </Button>
          </View>
          <View>
            <Button
              buttonStyle={styles.signupButton}
              onPress={handleScreenChange}
            >
              {isScreen ? "Sign up with email" : "Sign up with mobile number"}
            </Button>
          </View>
        </ScrollView>
      </View>
      <View style={styles.alreadyAccount}>
        <FlatButton
          onPress={handleAlreadyAccount}
          textStyle={styles.alreadyAccountText}
        >
          Already have an account?
        </FlatButton>
      </View>
    </Background>
  );
}

export default SignupScreen;
