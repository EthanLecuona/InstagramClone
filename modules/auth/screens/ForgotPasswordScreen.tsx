import { Text } from "@rneui/themed";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { supabase } from "../../../lib/SupaBase";
import { useUserStore } from "../../../store/UserStore";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();
  const { setUser } = useUserStore();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
  });

  function updateInputValueHandler(inputType: any, enteredValue: any) {
    setInputs((previousInputs) => {
      return {
        ...previousInputs,
        [inputType]: { value: enteredValue, isValid: true },
      };
    });
  }

  function handleSubmit() {
    const validate = (data: any) => {
      const emailIsValid = (email: string) => {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

      if (emailIsValid(data.email.value)) {
        return true;
      } else {
        return false;
      }
    };

    if (validate(inputs)) {
      const sendOTP = async (email: string | null) => {
        if (email != null || email != "") {
          setIsAuthenticating(true);
          const { error } = await supabase.auth.resetPasswordForEmail(
            inputs.email.value
          );
          if (error != null) {
            setIsAuthenticating(false);
            return false;
          }

          setUser({ email: inputs.email.value });
          setIsAuthenticating(false);
          return true;
        }
      };
      sendOTP(inputs.email.value)
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
      setInputs({
        email: { value: "", isValid: false },
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
        <Text style={styles.title}>Forgot Password</Text>
        <Text>
          Enter your email address we will send you an OTP pin to reset your
          password.
        </Text>
        <View style={styles.input}>
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "email")}
            secure={false}
            value={inputs.email.value}
            keyboardType="email-address"
            isInvalid={inputs.email.isValid}
            placeholder={"example@gmail.com"}
            label={"Email:"}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button onPress={handleSubmit}>
            {!isAuthenticating ? (
              "Send OTP"
            ) : (
              <ActivityIndicator size="small" />
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
