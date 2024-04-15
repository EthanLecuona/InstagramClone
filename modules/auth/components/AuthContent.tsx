import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
// import AuthFooter from "./AuthFooter";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@rneui/themed";
import { RootStackParamListAuth } from "../../navigation/Routes";
import AuthFooter from "./AuthFooter";
import Button from "./ui/Button";
import Background from "./ui/Background";
import FlatButton from "./ui/FlatButton";
import AuthForm from "./AuthForm";

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
        confirmPassword: !passwordIsValid,
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
      paddingTop: height * 0.5,
    },
    authContent: {
      padding: 16,
      paddingTop: "7.5%",
    },
    image: {
      top: 0,
      height: 200,
      width: 200,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
          <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
          {isLogin && (
            <View style={styles.row}>
              <View>
                <FlatButton>Forgot Password?</FlatButton>
              </View>
            </View>
          )}
        </View>
      </View>
    </Background>
  );
}

export default AuthContent;
