import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Button from "./ui/Button";
import Input from "./ui/Input";
import { useTheme } from "@rneui/themed";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: any) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassowrd, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassowrd: passwordsNoMatch,
  } = credentialsInvalid;

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

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    buttons: {
      marginTop: 12,
    },
  });

  return (
    <>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View>
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            secure={false}
            placeholder={"Username, email or mobile number"}
            icon={"mail-outline"}
            label={"Username, email or mobile number"}
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeholder={"Password"}
            icon={"lock-closed-outline"}
            label={"Password"}
          />
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? "Log In" : "Create an account"}
            </Button>
            <Button onPress={submitHandler}>
              {isLogin ? "Log In" : "Create an account"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default AuthForm;
