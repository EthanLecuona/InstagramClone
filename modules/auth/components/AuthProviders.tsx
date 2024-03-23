import { supabase } from "../../../lib/SupaBase";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { useEffect } from "react";
import { useUserStore } from "../../../store/UserStore";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri({
  preferLocalhost: true,
});

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;
  console.log(data.url);
  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

const sendMagicLink = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: "example@email.com",
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;
  // Email sent.
};

export default function AuthProviders() {
  const userStore = useUserStore();
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    providers: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: 14,
      paddingVertical: 14,
      borderRadius: 20,
      marginTop: 20,
    },
  });

  useEffect(() => {
    async function handleSession(url = "") {
      let session;
      if (url) {
        // If a deep link URL is provided, extract the session from it
        session = await createSessionFromUrl(url);
      } else {
        // Otherwise, get the session directly from Supabase
        const { data } = await supabase.auth.getSession();
        session = data.session;
      }
      if (session) {
        userStore.providerSignIn(session);
      }
    }

    // Setup deep link listener
    const deepLinkSub = Linking.addEventListener("url", (event: any) =>
      handleSession(event.url)
    );

    // Check initial session
    handleSession();

    // Cleanup function to remove the event listener
    return () => {
      deepLinkSub.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.providers}>
        <Ionicons
          onPress={performOAuth}
          name="logo-github"
          size={24}
          color={theme.colors.black}
        />
        <Ionicons name="logo-google" size={24} color={theme.colors.black} />
        <Ionicons name="logo-facebook" size={24} color={theme.colors.black} />
      </View>
      {/* <Button onPress={performOAuth} title="Sign in with Github" />
      <Button onPress={sendMagicLink} title="Send Magic Link" /> */}
    </>
  );
}
