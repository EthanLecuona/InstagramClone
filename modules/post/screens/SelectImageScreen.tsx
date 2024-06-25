import { Text, useTheme } from "@rneui/themed";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { PostRoutes } from "../../navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FlatButton from "../../shared/components/FlatButton";

const { width } = Dimensions.get("screen");

export default function SelectImageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<PostRoutes>>();
  const { theme } = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FlatButton
            onPress={handleNext}
            textStyle={{ color: theme.colors.primary, fontSize: 18 }}
          >
            Next
          </FlatButton>
        );
      },
    });
  });

  function handleNext() {
    if (image) {
      navigation.navigate("EditImage", { image });
    } else if (defaultImage) {
      navigation.navigate("EditImage", { image: defaultImage });
    } else {
      Alert.alert("No Image Selected", "Please select an image to continue", [
        {
          text: "OK",
          style: "default",
        },
      ]);
    }
  }

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [albums, setAlbums] = useState<any[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState<MediaLibrary.Asset>();
  const [defaultImage, setDefaultImage] = useState<MediaLibrary.Asset>();

  useEffect(() => {
    async function fetchData() {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      await getAlbums();
    }
    fetchData();
  }, [permissionResponse, requestPermission]);

  async function getAlbums() {
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);

    if (fetchedAlbums.length > 0) {
      await setAssets(fetchedAlbums[0].id);
    }
  }

  async function setAssets(albumId: string) {
    const fetchDefaultImage = await MediaLibrary.getAssetsAsync({
      first: 1,
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      album: albumId,
      sortBy: MediaLibrary.SortBy.creationTime,
    });
    setDefaultImage(fetchDefaultImage.assets[0]);
    var aspect =
      fetchDefaultImage.assets[0].width / fetchDefaultImage.assets[0].height;
    setImageDimensions({
      height: width * 0.9,
      width: width * 0.9 * aspect,
    });
  }

  function handleImagePress(asset: MediaLibrary.Asset) {
    var aspect = asset.width / asset.height;
    setImageDimensions({
      height: width * 0.9,
      width: width * 0.9 * aspect,
    });
    setImage(asset);
  }

  return (
    <>
      <View style={styles.imageContainer}>
        {image || defaultImage ? (
          <Image
            source={
              image
                ? { uri: image.uri.toString() }
                : { uri: defaultImage?.uri.toString() }
            }
            width={imageDimensions.width}
            height={imageDimensions.height}
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {albums &&
            albums.map((album, index) => (
              <View key={index}>
                <AlbumEntry album={album} onPress={handleImagePress} />
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: width * 0.9,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    height: width * 0.9,
  },
  albumContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

function AlbumEntry({ album, onPress }: any) {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((asset) => (
            <Pressable key={asset.id} onPress={onPress.bind(null, asset)}>
              <Image source={{ uri: asset.uri }} width={50} height={50} />
            </Pressable>
          ))}
      </View>
    </View>
  );
}
