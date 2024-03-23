import { useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "../../store/UserStore";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../auth/screens/LoginScreen";
import RegisterScreen from "../auth/screens/RegisterScreen";
import PostScreen from "../posts/screens/PostScreen";
import { Ionicons } from "@expo/vector-icons";
import RemoveAccountScreen from "../auth/screens/RemoveAccountScreen";

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTabs = createMaterialTopTabNavigator();
const StackAuth = createNativeStackNavigator();

function TopTabsStack() {
  // return (
  //   // <TopTabs.Navigator>
  //   //   <TopTabs.Screen name=""/>
  //   // </TopTabs.Navigator>
  // )
}

function DrawerNavigation() {}

function MainNavigation() {
  const { theme } = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: { backgroundColor: theme.colors.secondary },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarInactiveTintColor: "#8C8C8C",
        tabBarLabelPosition: "below-icon",
        headerShown: false,
      })}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
          title: undefined,
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthNavigation() {
  const { theme } = useTheme();
  return (
    <StackAuth.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.black,
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: false,
      }}
    >
      <StackAuth.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Signin",
          headerShown: false,
        }}
      />
      <StackAuth.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Signup",
          headerShown: false,
        }}
      />
      <StackAuth.Screen
        name="RemoveAccount"
        component={RemoveAccountScreen}
        options={{
          title: "",
          // headerShown: false,
        }}
      />
    </StackAuth.Navigator>
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
        <LinearGradient
          style={styles.container}
          colors={[theme.colors.secondary, theme.colors.background]}
        >
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
            {!user ? <AuthNavigation /> : <MainNavigation />}
          </NavigationContainer>
        </LinearGradient>
      </View>
    </>
  );
}
