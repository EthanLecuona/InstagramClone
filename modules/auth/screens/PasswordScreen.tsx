import { Text } from "@rneui/themed";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { supabase } from "../../../lib/SupaBase";
import { useUserStore } from "../../../store/UserStore";
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const aspectRation = 1080 / 2400;
const { width } = Dimensions.get("window");
const height = width * aspectRation;

export default function PasswordScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setUser, user } = useUserStore();
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();

  const [inputs, setInputs] = useState({
    password: {
      value: "",
      isValid: true,
    },
    confirmPassword: {
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
      const passwordIsValid = (password: string) => {
        const re =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/;
        return re.test(password);
      };

      if (
        passwordIsValid(data.password.value) &&
        data.password.value === data.confirmPassword.value
      ) {
        return true;
      } else {
        return false;
      }
    };

    if (validate(inputs)) {
      const setPassword = async (password: string) => {
        if (user?.email != null) {
          setIsAuthenticating(true);
          const { data: setPasswordData, error: setPasswordError } =
            await supabase.auth.updateUser({
              email: user.email,
              password: password,
            });
          setIsAuthenticating(false);
          if (setPasswordError) {
            Alert.alert("Error", setPasswordError.message, [
              {
                text: "Okay",
                style: "default",
              },
            ]);
            return false;
          }
        }
        setUser({ isAuthenticated: true });
        return true;
      };

      setPassword(inputs.password.value)
        .then((response) => {
          if (response) {
            navigation.navigate("Login");
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
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
      });
      Alert.alert(
        "Invalid input",
        "Please check your entered credentials. Password do not match.",
        [
          {
            text: "Okay",
            style: "default",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
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
        <Text style={styles.title}>Password</Text>
        <Text>Enter the password you would like to use</Text>
        <View style={styles.input}>
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "password")}
            secure={true}
            value={inputs.password.value}
            keyboardType="default"
            isInvalid={inputs.password.isValid}
            placeholder={"Password"}
            label={"Password"}
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(
              null,
              "confirmPassword"
            )}
            secure={true}
            value={inputs.confirmPassword.value}
            keyboardType="default"
            isInvalid={inputs.confirmPassword.isValid}
            placeholder={"Confirm Password"}
            label={"Confirm Password"}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button onPress={handleSubmit}>
            {!isAuthenticating ? (
              "Confirm Password"
            ) : (
              <ActivityIndicator size="small" />
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
