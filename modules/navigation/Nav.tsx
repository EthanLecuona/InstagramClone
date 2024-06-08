import { Image, useTheme } from "@rneui/themed";
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
import { MainRoutes } from "./Routes";

import LoginScreen from "../auth/screens/LoginScreen";
import RegisterScreen from "../auth/screens/RegisterScreen";
import {
  Feather,
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
import PostScreen from "../post/screens/PostScreen";
import ReelScreen from "../reels/screens/ReelScreen";
import ProfileScreen from "../profile/screens/ProfileScreen";
import MessageScreen from "../messages/screens/MessageScreen";
import NotificationScreen from "../notifications/screens/NotificationScreen";

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function TopTabsStack() {
  // return (
  //   // <TopTabs.Navigator>
  //   //   <TopTabs.Screen name=""/>
  //   // </TopTabs.Navigator>
  // )
}

function DrawerNavigation() {}

function BottomTabNavigator() {
  const { user } = useUserStore();
  const { theme } = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: { backgroundColor: theme.colors.secondary },
        tabBarInactiveTintColor: "#8C8C8C",
        tabBarLabelPosition: "below-icon",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="diff-added" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Reels"
        component={ReelScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="video" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
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

function MainNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<MainRoutes>>();
  function handleMessages() {
    navigation.navigate("Messages");
  }

  function handleNotifications() {
    navigation.navigate("Notifications");
  }

  const styles = StyleSheet.create({
    row: {
      alignItems: "center",
      flexDirection: "row",
    },
    icon: {
      marginHorizontal: 15,
    },
  });
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
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
              background: "transparent",
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
