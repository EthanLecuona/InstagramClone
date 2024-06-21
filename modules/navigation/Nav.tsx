import { Image, Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "../../store/UserStore";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeRoutes, ProfileRoutes } from "./Routes";

import LoginScreen from "../auth/screens/LoginScreen";
import RegisterScreen from "../auth/screens/RegisterScreen";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import RemoveAccountScreen from "../auth/screens/RemoveAccountScreen";
import LandingScreen from "../auth/screens/LandingScreen";
import ForgotPasswordScreen from "../auth/screens/ForgotPasswordScreen";
import PasswordScreen from "../auth/screens/PasswordScreen";
import OTPScreen from "../auth/screens/OTPScreen";
import HomeScreen from "../home/screens/HomeScreen";
import SearchScreen from "../search/screens/SearchScreen";
import ReelScreen from "../reels/screens/ReelScreen";
import ProfileScreen from "../profile/screens/ProfileScreen";
import MessageScreen from "../messages/screens/MessageScreen";
import NotificationScreen from "../notifications/screens/NotificationScreen";
import SettingScreen from "../settings/screens/SettingScreen";
import NavFlatButton from "./components/NavFlatButton";
import NavSearchInput from "./components/NavSearchInput";
import SelectImageScreen from "../post/screens/SelectImageScreen";
import EditImageScreen from "../post/screens/EditImageScreen";

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MainNavigation() {
  const { user } = useUserStore();
  const { theme } = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: { backgroundColor: "black" },
        tabBarInactiveTintColor: "white",
        tabBarLabelPosition: "below-icon",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Post"
        component={PostNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="diff-added" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Reels"
        component={ReelNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="video" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: user?.avatarUrl ? user?.avatarUrl : "" }}
              containerStyle={{
                height: size,
                width: size,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 12,
  },
});

function ReelNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTitle: () => {
          return (
            <View style={styles.row}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  marginHorizontal: 4,
                }}
              >
                Reels
              </Text>
              <Entypo name="chevron-small-down" size={22} color="white" />
            </View>
          );
        },
        headerRight: () => {
          return (
            <View>
              <Ionicons
                style={styles.icon}
                name="logo-instagram"
                size={24}
                color="white"
              />
            </View>
          );
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="StackReel" component={ReelScreen} />
    </Stack.Navigator>
  );
}

function PostNavigation() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
        headerLeft: () => {
          return (
            <View>
              <Feather
                style={[styles.icon, { marginRight: 30 }]}
                name="x"
                size={26}
                color="white"
                onPress={() => navigation.goBack()}
              />
            </View>
          );
        },
      })}
      initialRouteName="SelectImage"
    >
      <Stack.Screen
        name="SelectImage"
        component={SelectImageScreen}
        options={{
          title: "New Post",
        }}
      />
      <Stack.Screen
        name="EditImage"
        component={EditImageScreen}
        options={{
          title: "",
          headerRight: () => {
            return (
              <View style={styles.row}>
                <FontAwesome
                  style={styles.icon}
                  name="magic"
                  size={24}
                  color="white"
                />
                <Ionicons
                  style={styles.icon}
                  name="musical-notes-outline"
                  size={24}
                  color="white"
                />
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

function SearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => {
          return <NavSearchInput />;
        },
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
        headerLeft: () => {
          return null;
        },
        headerRight: () => {
          return null;
        },
      }}
    >
      <Stack.Screen name="StackSearch" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function ProfileNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileRoutes>>();
  function handleSettings() {
    navigation.navigate("Settings");
  }
  const { user } = useUserStore();
  return (
    <Stack.Navigator initialRouteName="StackProfile" screenOptions={{}}>
      <Stack.Screen
        name="StackProfile"
        component={ProfileScreen}
        options={{
          headerTitle: () => {
            return (
              <View style={styles.row}>
                <Ionicons name="lock-closed-outline" size={16} color="white" />
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    marginHorizontal: 4,
                  }}
                >
                  {user?.username ? user.username.toLowerCase() : "Profile"}
                </Text>
                <Entypo name="chevron-small-down" size={22} color="white" />
              </View>
            );
          },
          headerRight: () => (
            <View style={styles.row}>
              <Feather
                style={styles.icon}
                name="at-sign"
                size={24}
                color="white"
              />
              <Octicons
                style={styles.icon}
                name="diff-added"
                size={24}
                color="white"
              />
              <SimpleLineIcons
                style={styles.icon}
                name="menu"
                size={24}
                color="white"
                onPress={handleSettings}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "Settings and activity",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeRoutes>>();
  function handleMessages() {
    navigation.navigate("Messages");
  }

  function handleNotifications() {
    navigation.navigate("Notifications");
  }

  return (
    <Stack.Navigator initialRouteName="StackHome">
      <Stack.Screen
        name="StackHome"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "Intagram",
          headerRight: () => (
            <View style={styles.row}>
              <Feather
                style={styles.icon}
                name="heart"
                size={24}
                color="white"
                onPress={handleNotifications}
              />
              <SimpleLineIcons
                style={styles.icon}
                name="paper-plane"
                size={24}
                color="white"
                onPress={handleMessages}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

function AuthNavigation() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: theme.colors.black,
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "transparent" },
        headerTransparent: true,
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          title: "Signin",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="RemoveAccount"
        component={RemoveAccountScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Nav() {
  const { user } = useUserStore();
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1 },
    // Other styles can be defined here
  });

  return (
    <>
      <StatusBar style={theme.mode === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <NavigationContainer
          theme={{
            colors: {
              primary: theme.colors.primary,
              background: "black",
              card: theme.colors.white,
              text: theme.colors.black,
              border: theme.colors.black,
              notification: theme.colors.black,
            },
            dark: theme.mode === "dark",
          }}
        >
          <LinearGradient
            style={styles.container}
            colors={["#1E1D2B", "#0E202E", "#0E202E", "#112724"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {!user?.accessToken && !user?.isAuthenticated ? (
              <AuthNavigation />
            ) : (
              <MainNavigation />
            )}
          </LinearGradient>
        </NavigationContainer>
      </View>
    </>
  );
}
