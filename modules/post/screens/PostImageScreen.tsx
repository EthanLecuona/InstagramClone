import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { Dimensions, Image, PixelRatio, StyleSheet, View } from "react-native";
import { PostRoutes } from "../../navigation/Routes";
import { useEffect, useState } from "react";

const { height } = Dimensions.get("screen");
const scale = PixelRatio.get();

export default function PostImageScreen() {
  const route = useRoute<RouteProp<PostRoutes, "PostImage">>();

  const params = route.params;
  if (params == undefined || params == null) {
    return <Text>No Image</Text>;
  }
  const [imageUri, setImageUri] = useState();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (params) {
      const targetAspect = params.width / params.height;
      const targetHeight = height / 2.3;
      const targetWidth = targetHeight * targetAspect;
      setImageDimensions({
        width: targetWidth * scale,
        height: targetHeight * scale,
      });
      setImageUri(params.imageUri);
    }
  }, [route.params]);

  const stylse = StyleSheet.create({
    image: {
      width: imageDimensions.width,
      height: imageDimensions.height,
    },
  });
  return (
    <View>
      <Image style={stylse.image} source={{ uri: imageUri }} />
      <Text>Post Image</Text>
    </View>
  );
}
