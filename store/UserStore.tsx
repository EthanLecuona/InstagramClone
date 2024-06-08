import { create } from "zustand";
//SupaBase Client
import { supabase } from "../lib/SupaBase";

import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../utils/types";

interface UserStore {
  user: User | null;
  setUser: (newUserDetails: Partial<User> | null) => void;
  signOut: () => Promise<void>;
  providerSignIn: (session: Session) => Promise<void>;
  updateUser: (data: any) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUserDetails: Partial<User> | null) => {
    set((state) => {
      if (newUserDetails === null) {
        return { ...state, user: null };
      }
      // Ensure existing user data is maintained unless explicitly overridden
      const existingUser = state.user || {};
      return {
        ...state,
        user: {
          ...existingUser,
          ...newUserDetails,
        },
      };
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
