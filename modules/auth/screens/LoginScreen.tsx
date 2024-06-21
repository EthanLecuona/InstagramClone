import { useState } from "react";
import { useUserStore } from "../../../store/UserStore";
import Background from "../components/ui/Background";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import FlatButton from "../components/ui/FlatButton";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { supabase } from "../../../lib/SupaBase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();

  /* 
  ---------------------------------------------------------------
  ------------------- Login User -------------------
  ---------------------------------------------------------------
  */
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setUser, user } = useUserStore();
  /* 
  ---------------------------------------------------------------
  ------------------- Gets input values -------------------
  ---------------------------------------------------------------
  */
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  function handleValueChange(inputType: any, enteredValue: any) {
    setInputs((previousInputs) => {
      return {
        ...previousInputs,
        [inputType]: { value: enteredValue, isValid: true },
      };
    });
  }

  /* 
  ---------------------------------------------------------------
  ------------------- Validates inputs and submits -------------------
  ---------------------------------------------------------------
  */
  async function loginHandler(email: string, password: string) {
    setIsAuthenticating(true);

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (signInError) {
      console.log(signInError.message + signInError.name + signInError.status);
      Alert.alert("Error Authenticating", "SignIn " + signInError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      setIsAuthenticating(false);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .select("username, fullname, avatarurl")
      .eq("userid", signInData.user.id);

    if (profileError) {
      Alert.alert("Error Authenticating", "Profile " + profileError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      setIsAuthenticating(false);
      return;
    }

    setUser({
      email: signInData.user.email,
      accessToken: signInData.session.access_token,
      mobileNumber: signInData.user.phone,
      username: profileData[0].username ? profileData[0].username : null,
      fullname: profileData[0].fullname ? profileData[0].fullname : null,
      avatarUrl: profileData[0].avatarurl ? profileData[0].avatarurl : null,
      isAuthenticated: true,
    });
    if (user != null) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    setIsAuthenticating(false);
  }

  function handleSubmit() {
    const validate = (data: any) => {
      const emailIsValid = (email: string) => {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      const passwordIsValid = (password: string) => {
        const re =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return re.test(password);
      };

      if (
        emailIsValid(data.email.value) &&
        passwordIsValid(data.password.value)
      ) {
        return true;
      } else {
        setInputs((currentValues) => {
          return {
            ...currentValues,
            email: { value: data.email, isValid: false },
            password: { value: data.password, isValid: false },
          };
        });
        return false;
      }
    };

    if (validate(inputs)) {
      loginHandler(inputs.email.value, inputs.password.value);
    } else {
      Alert.alert("Invalid input", "Please check your entered credentials.", [
        {
          text: "Okay",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  }

  function createAccount() {
    navigation.navigate("Register");
  }

  function forgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      paddingTop: height * 0.5,
      justifyContent: "center",
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
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={styles.authContent}
        >
          <Text>English (US)</Text>
          <Image
            source={require("../assets/InstagramOutline.png")}
            style={styles.image}
          />
          <Input
            onUpdateValue={handleValueChange.bind(null, "email")}
            value={inputs.email.value}
            keyboardType="email-address"
            isInvalid={inputs.email.isValid}
            secure={false}
            placeholder={"Username, email or mobile number"}
            label={"Username, email or mobile number"}
          />
          <Input
            onUpdateValue={handleValueChange.bind(null, "password")}
            secure
            value={inputs.password.value}
            isInvalid={inputs.password.isValid}
            placeholder={"Password"}
            label={"Password"}
          />
          <View style={styles.loginButton}>
            <Button onPress={handleSubmit}>
              {!isAuthenticating ? (
                "Log In"
              ) : (
                <ActivityIndicator size="small" />
              )}
            </Button>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <FlatButton
              onPress={forgotPassword}
              textStyle={styles.forgotPasswordText}
            >
              Forgot Password?
            </FlatButton>
          </View>
          <View style={styles.createAccountContainer}>
            <Button onPress={createAccount} buttonStyle={styles.createAccount}>
              Create new account
            </Button>
          </View>
          <AuthFooter />
        </ScrollView>
      </View>
    </Background>
  );
}

export default LoginScreen;
