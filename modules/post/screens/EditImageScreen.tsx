import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { Dimensions, Image, View } from "react-native";
import { PostRoutes } from "../../navigation/Routes";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const { width } = Dimensions.get("screen");

export default function EditImageScreen() {
  const route = useRoute<RouteProp<PostRoutes>>();
  const [image, setImage] = useState<MediaLibrary.Asset>();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const params = route.params?.image;
  useEffect(() => {
    async function fetchData() {
      if (params) {
        async function setAspect() {
          setImage(params);
          var aspect = image!.width / image!.height;
          setImageDimensions({
            width: width * 0.8,
            height: (width * 0.8) / aspect,
          });
        }
        await setAspect();
      }
    }
    fetchData();
  }, [route.params?.image]);

  return (
    <View>
      {image ? (
        <Image
          source={{ uri: image.uri.toString() }}
          width={imageDimensions.width}
          height={imageDimensions.height}
        />
      ) : (
        <Text>No Image</Text>
      )}
    </View>
  );
}
