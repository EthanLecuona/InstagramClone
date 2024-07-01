import { Text, useTheme } from "@rneui/themed";
import { Alert, StyleSheet, View, Image } from "react-native";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "../../navigation/Routes";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../../lib/SupaBase";
import { User } from "../../../utils/types";
import { useUserStore } from "../../../store/UserStore";
import { useEffect, useState } from "react";
import { links } from "../../../utils/links";

export default function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();
  const { setUser } = useUserStore();

  const [storedUser, setStoredUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchStoredUser = async () => {
      const storedUserJSON = await AsyncStorage.getItem("user");
      if (storedUserJSON) {
        const storedUser: User = JSON.parse(storedUserJSON);
        setStoredUser(() => {
          return {
            ...storedUser,
            isAuthenticated: false,
          };
        });
      }
    };
    fetchStoredUser();
  }, []);

  async function login() {
    if (storedUser?.accessToken) {
      const { data: loginData, error: loginError } =
        await supabase.auth.refreshSession({
          refresh_token: storedUser.accessToken,
        });
      if (loginError || loginData.session == null) {
        Alert.alert("Error", "An error occurred while logging in", [
          {
            text: "OK",
            style: "default",
          },
        ]);
        return;
      }
      if (loginData.session != null && loginData.user != null) {
        setUser({
          email: loginData.user.email,
          accessToken: loginData.session.access_token,
          mobileNumber: loginData.user.phone,
          username: storedUser.username,
          fullname: storedUser.fullname,
          avatarUrl: storedUser.avatarUrl,
          isAuthenticated: true,
        });
      }
    } else {
      Alert.alert("Error", "No user stored", [
        {
          text: "OK",
          style: "default",
        },
      ]);
    }
  }

  // const refreshSession = async () => {
  //   const storedUserJSON = await AsyncStorage.getItem("user");
  //   if (storedUserJSON) {
  //     const storedUser: User = JSON.parse(storedUserJSON);
  //     if (storedUser.accessToken) {
  //       const { data: refreshData, error: refreshError } =
  //         await supabase.auth.refreshSession({
  //           refresh_token: storedUser.accessToken,
  //         });

  //       if (refreshError) {
  //         return;
  //       }
  //       if (refreshData.session != null && refreshData.user != null) {
  //         setUser({
  //           email: refreshData.user.email,
  //           accessToken: refreshData.session.access_token,
  //           mobileNumber: refreshData.user.phone,
  //           username: storedUser.username,
  //           fullname: storedUser.fullname,
  //           avatarUrl: storedUser.avatarUrl,
  //           isAuthenticated: true,
  //         });
  //       }
  //       return;
  //     }
  //   } else {
  //     console.log("No user stored");
  //   }
  // };

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      flex: 1,
    },
    logo: {
      height: 75,
      width: 75,
      overflow: "hidden",
      marginTop: 10,
    },
    profilePicture: {
      marginTop: 50,
      borderRadius: 100,
      borderColor: "#1C2A33",
      borderWidth: 5,
      width: 200,
      height: 200,
    },
    username: {
      marginTop: 20,
      fontSize: 25,
      marginBottom: 20,
      fontWeight: "bold",
    },
    settingsRow: {
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    anotherAccount: {
      borderColor: "#475A69",
      borderWidth: 1,
      backgroundColor: "transparent",
    },
    createAccount: {
      borderColor: "#4398FF",
      marginTop: 35,
      borderWidth: 1,
      backgroundColor: "transparent",
    },
  });
  function handleRemoveAccountScreen() {
    navigation.navigate("RemoveAccount");
  }
  function handleLoginScreen() {
    navigation.navigate("Login");
  }
  function handleRegisterScreen() {
    navigation.navigate("Register");
  }
  return (
    <View style={styles.container}>
      <View style={styles.settingsRow}>
        <Ionicons
          name="settings-outline"
          size={30}
          color={theme.colors.black}
          onPress={handleRemoveAccountScreen}
        />
      </View>
      <Image
        source={{
          uri: links.logo,
        }}
        style={styles.logo}
      />
      {/* <Image
        source={require("../../../assets/logos/Instagram.png")}
        style={styles.logo}
      /> */}
      <Image
        source={
          storedUser?.avatarUrl
            ? { uri: storedUser?.avatarUrl }
            : {
                uri: links.profile,
              }
        }
        style={styles.profilePicture}
      />
      <Text style={styles.username}>
        {storedUser ? storedUser.username : "Please Login"}
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={login}>Log In</Button>
        <Button onPress={handleLoginScreen} buttonStyle={styles.anotherAccount}>
          Log into another account
        </Button>

        <Button
          buttonStyle={styles.createAccount}
          textStyle={{ color: "#4398FF" }}
          onPress={handleRegisterScreen}
        >
          Create new account
        </Button>
      </View>
      <AuthFooter />
    </View>
  );
}
