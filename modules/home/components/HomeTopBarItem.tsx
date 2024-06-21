import { Text, Image } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { TopBaritem } from "../../../utils/types";

export default function HomeTopBarItem({ item }: { item: TopBaritem }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      width: 100,
      height: 125,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      borderRadius: 40,
      width: 80,
      height: 80,
    },
    text: {
      fontSize: 12,
      marginTop: 5,
    },
  });
  return (
    <View style={styles.container}>
      <Image
        containerStyle={styles.image}
        source={
          item.avatarUrl
            ? { uri: item.avatarUrl! }
            : require("../../../assets/images/Profile.png")
        }
      />
      <Text style={styles.text}>{item.username}</Text>
    </View>
  );
}
