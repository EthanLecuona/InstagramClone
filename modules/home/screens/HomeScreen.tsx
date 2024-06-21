import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import { useState } from "react";
import HomePost from "../components/HomePost";

export default function HomeScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
    },
  });
  return (
    <View style={styles.container}>
      <HomeTopBar />
      <HomePost />
    </View>
  );
}
