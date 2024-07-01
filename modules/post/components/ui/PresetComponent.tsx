import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import PresetItem from "./PresetItem";
import Button from "./Button";
import { presets } from "../constants/Presets";
import { useTheme } from "@rneui/themed";

const { height } = Dimensions.get("screen");

interface ImageDimensions {
  width: number;
  height: number;
}

export default function PresetComponent({
  presetSurfaceWidth,
  presetSurfaceHeight,
  imageWidth,
  imageHeight,
  imageUri,
  applyFilter,
  handleEdit,
  handleNext,
}: any) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      maxHeight: height / 4,
    },
    footer: {
      padding: 10,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    editButton: {
      backgroundColor: "grey",
    },
  });
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView horizontal>
          {presets.map((preset) => (
            <PresetItem
              key={preset.name}
              name={preset.name}
              newFilterSettings={preset.filters}
              filterWidth={imageWidth}
              filterHeight={imageHeight}
              surfaceWidth={presetSurfaceWidth}
              surfaceHeight={presetSurfaceHeight}
              onPress={() => applyFilter(preset.filters)}
            >
              {{ uri: imageUri.toString() }}
            </PresetItem>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <Button onPress={handleEdit} style={styles.editButton}>
          Edit
        </Button>
        <Button icon={"arrow-right"} onPress={handleNext}>
          Next
        </Button>
      </View>
    </>
  );
}
