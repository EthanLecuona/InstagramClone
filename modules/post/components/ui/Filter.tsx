import { Slider } from "@react-native-assets/slider";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

export default function Filter({
  name,
  minimum,
  maximum,
  onChange,
  step,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{capitalizeFirstLetter(name)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={minimum}
        maximumValue={maximum}
        onValueChange={onChange}
      />
    </View>
  );
}

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
