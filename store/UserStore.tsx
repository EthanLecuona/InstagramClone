import { create } from "zustand";
import { supabase } from "../lib/SupaBase"; // Adjust the import path as necessary
import { Session, User } from "@supabase/supabase-js";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
  user:
    | {
        email: string | null | undefined;
        username: string | null;
        fullname: string | null;
        avatarUrl: string | undefined;
        accessToken: string | null | undefined;
      }
    | null
    | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  providerSignIn: (session: Session) => Promise<void>;
  updateUser: (data: any) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  signIn: async (email, password) => {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (signInError) {
      Alert.alert("Error Authenticating", signInError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("username, full_name, avatar_url")
      .eq("id", signInData.user.id);

    if (profileError) {
      Alert.alert("Error Authenticating", profileError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      return;
    }

    await AsyncStorage.setItem("accessToken", signInData.session.access_token);

    set({
      user: {
        email: signInData.user.email,
        username: profileData[0].username,
        avatarUrl: profileData[0].avatar_url,
        fullname: profileData[0].full_name,
        accessToken: signInData.session.access_token,
      },
    });
  },
  signUp: async (email, password) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password }
    );
    if (signUpError) {
      Alert.alert("Error Authenticating", signUpError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      return;
    }
    if (!signUpData.session)
      Alert.alert("Please check your inbox for email verification!");
    set({
      user: {
        email: signUpData.user?.email,
        accessToken: signUpData.session?.access_token,
        username: null,
        avatarUrl: undefined,
        fullname: null,
      },
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("accessToken");
    set({ user: null });
  },
  providerSignIn: async (session) => {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("username, full_name, avatar_url")
      .eq("id", session.user.id);

    if (profileError) {
      Alert.alert("Error Authenticating", profileError.message, [
        {
          text: "Ok",
          style: "default",
        },
      ]);
      return;
    }
    set({
      user: {
        email: session.user.email,
        accessToken: session.access_token,
        username: profileData[0].username,
        avatarUrl: profileData[0].avatar_url,
        fullname: profileData[0].full_name,
      },
    });
  },
  updateUser: async (userData) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: userData.username,
        full_name: userData.fullname,
        avatar_url: userData.avatarUrl,
      })
      .eq("id", userData.id);

    if (error) {
      Alert.alert("Error Updating", error.message, [
        { text: "Ok", style: "default" },
      ]);
      return;
    }

    const { data: updatedProfileData, error: fetchError } = await supabase
      .from("profiles")
      .select("username, full_name, avatar_url")
      .eq("id", userData.id)
      .single();

    if (fetchError) {
      Alert.alert("Error Fetching Updated Data", fetchError.message, [
        { text: "Ok", style: "default" },
      ]);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({
      user: {
        email: session?.user.email,
        username: updatedProfileData.username,
        fullname: updatedProfileData.full_name,
        avatarUrl: updatedProfileData.avatar_url,
        accessToken: session?.access_token,
      },
    });
  },
}));
