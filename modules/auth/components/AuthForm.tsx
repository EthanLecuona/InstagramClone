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
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassowrd: enteredConfirmPassowrd,
    });
  }

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    buttons: {
      marginTop: 12,
    },
    container: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
            placeholder={"Enter your email"}
            icon={"mail-outline"}
          />
          <Input
            onUpdateValue={updateInputValueHandler.bind(null, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeholder={"Enter your password"}
            icon={"lock-closed-outline"}
          />
          {!isLogin && (
            <Input
              onUpdateValue={updateInputValueHandler.bind(
                null,
                "passwordConfirm"
              )}
              secure
              value={passwordsNoMatch}
              isInvalid={passwordIsInvalid}
              placeholder={"Enter your password"}
              icon={"lock-closed-outline"}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default AuthForm;
