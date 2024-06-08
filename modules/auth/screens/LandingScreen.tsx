import { Image } from "@rneui/base";
import { Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Background from "../components/ui/Background";
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

export default function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();
  const { setUser } = useUserStore();

  const refreshSession = async () => {
    const storedUserJSON = await AsyncStorage.getItem("user");
    if (storedUserJSON) {
      const storedUser: User = JSON.parse(storedUserJSON);
      if (storedUser.accessToken) {
        const { data: refreshData, error: refreshError } =
          await supabase.auth.refreshSession({
            refresh_token: storedUser.accessToken,
          });

        if (refreshError) {
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("username, fullname, avatarurl")
          .eq("userid", refreshData.user?.id);

        if (profileError) {
          return;
        }

        setUser({
          email: refreshData?.user?.email,
          accessToken: refreshData?.session?.access_token,
          mobileNumber: refreshData?.user?.phone,
          username: profileData[0].username,
          fullname: profileData[0].fullname,
          avatarUrl: profileData[0].avatarurl,
          isAuthenticated: true,
        });
      }
    } else {
      console.log("No user stored");
    }
  };
  refreshSession();
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
  function RemoveAccount() {
    navigation.navigate("RemoveAccount");
  }
  function Login() {
    navigation.navigate("Login");
  }
  function Register() {
    navigation.navigate("Register");
  }
  return (
    <View style={styles.container}>
      <View style={styles.settingsRow}>
        <Ionicons
          name="settings-outline"
          size={30}
          color={theme.colors.black}
          onPress={RemoveAccount}
        />
      </View>
      <Image
        source={require("../assets/InstagramOutline.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/ethan.jpg")}
        style={styles.profilePicture}
      />
      <Text style={styles.username}>ethanlecuona</Text>
      <View style={styles.buttonContainer}>
        <Button>Log In</Button>
        <Button onPress={Login} buttonStyle={styles.anotherAccount}>
          Log into another account
        </Button>

        <Button
          buttonStyle={styles.createAccount}
          textStyle={{ color: "#4398FF" }}
          onPress={Register}
        >
          Create new account
        </Button>
      </View>
      <AuthFooter />
    </View>
  );
}
