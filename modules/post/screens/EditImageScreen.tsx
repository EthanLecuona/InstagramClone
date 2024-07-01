import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { PostRoutes } from "../../navigation/Routes";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Surface } from "gl-react-expo";
import ImageFilters from "../components/ImageFilters";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Zooming
import Zoom from "react-native-zoom-reanimated";
import PresetComponent from "../components/ui/PresetComponent";
import FilterComponent from "../components/ui/FilterComponent";
import { FilterSettings } from "../../../utils/types";

const { height } = Dimensions.get("screen");
const scale = PixelRatio.get();

/*
------------------------------------------------------------------------------------
https://github.com/GregoryNative/react-native-gl-image-filters/blob/master/src/filters/Sepia.js
------------------------------------------------------------------------------------
*/

export default function EditImageScreen() {
  const route = useRoute<RouteProp<PostRoutes, "EditImage">>();
  const navigation = useNavigation<NativeStackNavigationProp<PostRoutes>>();
  const { theme } = useTheme();
  const [image, setImage] = useState<MediaLibrary.Asset>();
  const [edit, setEdit] = useState(false);
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
  if (params == undefined || params == null) {
    navigation.navigate("SelectImage");
  }
  useEffect(() => {
    if (params) {
      const targetAspect = params.width / params.height;
      const targetHeight = height / 2.3;
      const targetWidth = targetHeight * targetAspect;
      setImageDimensions({
        width: targetWidth * scale,
        height: targetHeight * scale,
      });
      setImage(params);
    }
  }, [route.params]);

  var surfaceRef: any;
  async function handleNext() {
    const uri = await saveImage();
    navigation.navigate("PostImage", {
      imageUri: uri,
      width: imageDimensions.width,
      height: imageDimensions.height,
    });
  }
  async function saveImage() {
    if (surfaceRef && surfaceRef.glView) {
      try {
        const { uri } = await surfaceRef.glView.capture();
        return uri;
      } catch (error) {
        console.error("Capture failed:", error);
      }
    }
  }

  if (!image) {
    return <Text>No Image</Text>;
  }
  const aspect = image.width / image.height;
  const surfaceWidth = (height / 2) * aspect;
  const surfaceHeight = height / 2;
  const presetSurfaceWidth = 100 * aspect;
  const presetSurfaceHeight = 100;

  function handleApplyPreset(filter: any) {
    setFilterSettings(() => {
      return {
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
        ...filter,
      };
    });
  }

  function handleApplyFilter(filter: any, value: any) {
    setFilterSettings((currentSettings) => {
      return {
        ...currentSettings,
        [filter]: value,
      };
    });
  }

  function handleResetFilter(filter: keyof FilterSettings) {
    const defaultValues: FilterSettings = {
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
    };
    setFilterSettings((currentValues) => ({
      ...currentValues,
      [filter]: defaultValues[filter],
    }));
  }

  function handleEdit() {
    setEdit(!edit);
  }

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
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Zoom>
          <Surface style={styles.surface} ref={(ref) => (surfaceRef = ref)}>
            <ImageFilters
              height={imageDimensions.height}
              width={imageDimensions.width}
              {...filterSettings}
            >
              {{ uri: image.uri.toString() }}
            </ImageFilters>
          </Surface>
        </Zoom>
      </GestureHandlerRootView>
      {!edit ? (
        <PresetComponent
          presetSurfaceHeight={presetSurfaceHeight}
          presetSurfaceWidth={presetSurfaceWidth}
          imageUri={image.uri.toString()}
          applyFilter={handleApplyPreset}
          handleEdit={handleEdit}
          imageWidth={imageDimensions.width}
          imageHeight={imageDimensions.height}
          handleNext={handleNext}
        />
      ) : (
        <FilterComponent
          handleEdit={handleEdit}
          applyFilter={handleApplyFilter}
          resetFilter={handleResetFilter}
        />
      )}
    </View>
  );
}
