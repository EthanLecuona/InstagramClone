import { Text } from "@rneui/themed";
import { Surface } from "gl-react-native";
import { Pressable, StyleSheet } from "react-native";
import ImageFilters from "../ImageFilters";
import { useEffect, useState } from "react";

export default function PresetItem({
  name,
  onPress,
  newFilterSettings,
  filterWidth,
  filterHeight,
  surfaceWidth,
  surfaceHeight,
  children,
}: any) {
  const [filterSettings, setFilterSettings] = useState({
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
  });
  useEffect(() => {
    setFilterSettings((currentSettings) => {
      return {
        ...currentSettings,
        ...newFilterSettings,
      };
    });
  }, [newFilterSettings]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginHorizontal: 10,
      minWidth: 100,
    },
    text: {
      fontSize: 16,
      marginBottom: 4,
    },
    image: {
      width: surfaceWidth,
      height: surfaceHeight,
      borderRadius: 10,
    },
    pressed: {
      opacity: 0.5,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{name}</Text>
      <Surface style={styles.image}>
        <ImageFilters
          width={filterWidth}
          height={filterHeight}
          {...filterSettings}
        >
          {children}
        </ImageFilters>
      </Surface>
    </Pressable>
  );
}
