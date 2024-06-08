import { useState } from "react";
import { Text } from "@rneui/themed";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useUserStore } from "../../../store/UserStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { supabase } from "../../../lib/SupaBase";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

export default function OTPScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setUser, user } = useUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();
  const [inputs, setInputs] = useState({
    otp: {
      value: "",
      isValid: true,
    },
  });

  const updateInputValueHandler = (inputType: any, enteredValue: any) => {
    setInputs((previousInputs) => {
      return {
        ...previousInputs,
        [inputType]: { value: enteredValue, isValid: true },
      };
    });
  };

  function handleSubmit() {
    const validate = (data: any) => {
      const isSixDigitNumeric = (input: string) => {
        const re = /^\d{6}$/;
        return re.test(input);
      };

      if (isSixDigitNumeric(data.otp.value)) {
        return true;
      } else {
        return false;
      }
    };

    if (validate(inputs)) {
      const verifyOTP = async (otp: string | null) => {
        if (otp != null && user?.email) {
          const { data: verifyOTPData, error: verifyOTPError } =
            await supabase.auth.verifyOtp({
              email: user?.email,
              token: otp,
              type: "signup",
            });
          if (verifyOTPError) {
            return false;
          }
          setUser({ mobileNumber: inputs.otp.value });
          return true;
        } else if (otp != null && user?.mobileNumber) {
          setIsAuthenticating(true);
          const { data: verifyOTPData, error: verifyOTPError } =
            await supabase.auth.verifyOtp({
              phone: user?.mobileNumber,
              token: otp,
              type: "sms",
            });
          setIsAuthenticating(false);
          if (verifyOTPError) {
            return false;
          }
          setUser({ accessToken: verifyOTPData.session?.access_token });
          return true;
        }
      };

      verifyOTP(inputs.otp.value)
        .then((response) => {
          if (response) {
            navigation.navigate("Password");
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
        otp: { value: "", isValid: false },
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
        <Text style={styles.title}>OTP Pin</Text>
        <Text>
          Enter the OTP pin you should have received either through SMS or Email
        </Text>
        <View style={styles.input}>
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "otp")}
            secure={false}
            value={inputs.otp.value}
            keyboardType="number-pad"
            isInvalid={inputs.otp.isValid}
            placeholder={"123456"}
            label={"OTP Pin:"}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button onPress={handleSubmit}>
            {!isAuthenticating ? (
              "Confirm OTP"
            ) : (
              <ActivityIndicator size="small" />
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
