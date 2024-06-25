import { Slider } from "@react-native-assets/slider";
import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export default ({ name, minimum, maximum, onChange }: any) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
    <Slider
      style={styles.slider}
      minimumValue={minimum}
      maximumValue={maximum}
      onValueChange={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingVertical: 5,
    flex: 1,
  },
  text: { textAlign: "center" },
  slider: { width: 150 },
});
