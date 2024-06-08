import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../../store/UserStore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, useTheme } from "@rneui/themed";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { supabase } from "../../../lib/SupaBase";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

function SignupScreen() {
  const { setUser } = useUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();

  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
    mobileNumber: {
      value: "",
      isValid: true,
    },
  });

  /* 
  ---------------------------------------------------------------
  ------------------- Register User -------------------
  ---------------------------------------------------------------
  */

  /* 
  ---------------------------------------------------------------
  ------------------- Gets input values -------------------
  ---------------------------------------------------------------
  */
  function updateInputValueHandler(inputType: any, enteredValue: any) {
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

  function handleSubmit() {
    const validate = (data: any) => {
      const emailIsValid = (email: string) => {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      const phoneIsValid = (phone: string) => {
        const re = /^(?:\+27|27|0)(\d{9})$/;
        return re.test(String(phone).replace(/\s/g, "")); // Removes spaces for cleaner validation
      };

      if (
        emailIsValid(data.email.value) ||
        (isMobileScreen && phoneIsValid(data.mobileNumber.value))
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (validate(inputs)) {
      const sendOTP = async (email: string | null, mobile: string | null) => {
        if (email != null) {
          setIsAuthenticating(true);
          const { data, error } = await supabase.auth.signInWithOtp({
            email: inputs.email.value,
            options: {
              shouldCreateUser: true,
            },
          });
          setIsAuthenticating(false);
          if (data != null && error != null) {
            return false;
          }
          setUser({ email: inputs.email.value });
          return true;
        }
        if (mobile != null) {
          const { data, error } = await supabase.auth.signInWithOtp({
            phone: inputs.mobileNumber.value,
            options: {
              shouldCreateUser: true,
            },
          });
          if (data != null && error != null) {
            return false;
          }
          setUser({ mobileNumber: inputs.mobileNumber.value });
          return true;
        }
      };

      if (!isMobileScreen) {
        sendOTP(inputs.email.value, null)
          .then((response) => {
            if (response) {
              navigation.navigate("OTP");
            }
          })
          .catch((error) => {
            Alert.alert("Error", error.message, [
              {
                text: "Okay",
                style: "default",
              },
            ]);
          });
      } else {
        sendOTP(null, inputs.mobileNumber.value)
          .then((response) => {
            if (response) {
              navigation.navigate("OTP");
            }
          })
          .catch((error) => {
            Alert.alert("Error", error.message, [
              {
                text: "Okay",
                style: "default",
              },
            ]);
          });
      }
    } else {
      setInputs({
        email: { value: "", isValid: false },
        mobileNumber: {
          value: "",
          isValid: false,
        },
      });
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

  function handleScreenChange() {
    setInputs({
      email: { value: "", isValid: true },
      mobileNumber: {
        value: "",
        isValid: true,
      },
    });
    setIsMobileScreen(!isMobileScreen);
  }

  function handleAlreadyAccount() {
    navigation.navigate("Login");
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
    content: {
      marginTop: height * 0.3,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          {isMobileScreen ? "What's your mobile number?" : "What's your email?"}
        </Text>
        <Text>
          {isMobileScreen
            ? "Enter the mobile number where you can be contacted. No one will see this on your profile."
            : "Enter the email where you can be contacted. No one will see this on your profile."}
        </Text>
        <View style={styles.input}>
          {isMobileScreen ? (
            <Input
              onUpdateValue={updateInputValueHandler.bind(null, "mobileNumber")}
              secure={false}
              value={inputs.mobileNumber.value}
              keyboardType="phone-pad"
              isInvalid={inputs.mobileNumber.isValid}
              placeholder={"Mobile number"}
              label={"Mobile number"}
            />
          ) : (
            <Input
              onUpdateValue={updateInputValueHandler.bind(null, "email")}
              secure={false}
              value={inputs.email.value}
              keyboardType="email-address"
              isInvalid={inputs.email.isValid}
              placeholder={"Email address"}
              label={"Email address"}
            />
          )}
        </View>
        <Text>
          {isMobileScreen
            ? "You may receive a SMS notification from us for security and login purposes."
            : "You may receive an Email notification from us for security and login purposes."}
        </Text>
        <View style={styles.nextButtonContainer}>
          <Button onPress={handleSubmit}>
            {!isAuthenticating ? "Next" : <ActivityIndicator size="small" />}
          </Button>
        </View>
        <View>
          <Button
            buttonStyle={styles.signupButton}
            onPress={handleScreenChange}
          >
            {isMobileScreen
              ? "Sign up with email"
              : "Sign up with mobile number"}
          </Button>
        </View>
      </ScrollView>
      <View style={styles.alreadyAccount}>
        <FlatButton
          onPress={handleAlreadyAccount}
          textStyle={styles.alreadyAccountText}
        >
          Already have an account?
        </FlatButton>
      </View>
    </View>
  );
}

export default SignupScreen;
