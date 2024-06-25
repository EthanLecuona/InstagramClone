import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import {
  Dimensions,
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { PostRoutes } from "../../navigation/Routes";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Surface } from "gl-react-native";
import ImageFilters from "../components/ImageFilters";
import Filter from "../components/Filter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../components/ui/Button";

const { width, height } = Dimensions.get("screen");
const scale = PixelRatio.get();

/*
---------------------------------------------------
To Do: Implement gl-react and OpenGL for image filters.
example
https://github.com/GregoryNative/react-native-gl-image-filters/blob/master/src/filters/Sepia.js
---------------------------------------------------
*/
const settings = [
  {
    name: "hue",
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: "blur",
    minValue: 0,
    maxValue: 30,
  },
  {
    name: "sepia",
    minValue: -5,
    maxValue: 5,
  },
  {
    name: "sharpen",
    minValue: 0,
    maxValue: 15,
  },
  {
    name: "negative",
    minValue: -2.0,
    maxValue: 2.0,
  },
  {
    name: "contrast",
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: "saturation",
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: "brightness",
    minValue: 0,
    maxValue: 5,
  },
  {
    name: "temperature",
    minValue: 0.0,
    maxValue: 40000.0,
  },
  {
    name: "exposure",
    step: 0.05,
    minValue: -1.0,
    maxValue: 1.0,
  },
];

export default function EditImageScreen() {
  const route = useRoute<RouteProp<PostRoutes, "EditImage">>();
  const navigation = useNavigation<NativeStackNavigationProp<PostRoutes>>();
  const { theme } = useTheme();
  const [image, setImage] = useState<MediaLibrary.Asset>();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
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
  const params = route.params?.image;

  useEffect(() => {
    console.log(params);
    if (params) {
      const targetAspect = params.width / params.height;
      const targetHeight = height / 2.3;
      const targetWidth = targetHeight * targetAspect;
      setImageDimensions({
        width: targetWidth * scale,
        height: targetHeight * scale,
      });
      setImage(params);
    } else {
      navigation.navigate("SelectImage");
    }
  }, [route.params]);

  var surfaceRef: any;
  function handleNext() {
    async function saveImage() {
      return await surfaceRef.glView.capture();
    }
    // navigation.navigate("PostImage", { image: saveImage() };
  }

  if (!image) {
    return <Text>No Image</Text>;
  }

  function handleValueChanges(filterName: any, value: any) {
    setFilterSettings((currentSettings) => {
      return {
        ...currentSettings,
        [filterName]: value,
      };
    });
  }
  const aspect = image.width / image.height;
  const surfaceWidth = (height / 2) * aspect;
  const surfaceHeight = height / 2;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
    },
    surface: {
      width: surfaceWidth,
      height: surfaceHeight,
    },
    safeArea: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
      flex: 1,
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
    <View style={styles.container}>
      <Surface style={styles.surface} ref={(ref) => (surfaceRef = ref)}>
        <ImageFilters
          height={imageDimensions.height}
          width={imageDimensions.width}
          {...filterSettings}
        >
          {{ uri: image.uri.toString() }}
        </ImageFilters>
      </Surface>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          {settings.map((filter) => (
            <Filter
              key={filter.name}
              name={filter.name}
              minimum={filter.minValue}
              maximum={filter.maxValue}
              onChange={handleValueChanges.bind(null, filter.name)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <Button style={styles.editButton}>Edit</Button>
        <Button icon={"arrowright"} onPress={handleNext}>
          Next
        </Button>
      </View>
    </View>
  );
}
