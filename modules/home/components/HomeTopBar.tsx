import { FlatList, StyleSheet, View } from "react-native";
import HomeTopBarItem from "./HomeTopBarItem";
import { useCallback, useEffect, useState } from "react";
import { TopBaritem } from "../../../utils/types";
import { supabase } from "../../../lib/SupaBase";

export default function HomeTopBar() {
  const [topBarItems, setTopBarItems] = useState<TopBaritem[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("username, avatarurl");
      if (profileError) {
        setTopBarItems([]);
      }
      if (profileData) {
        profileData.forEach((item) => {
          setTopBarItems((previousItems) => {
            return [
              ...previousItems,
              {
                username: item.username,
                avatarUrl: item.avatarurl,
              },
            ];
          });
        });
      }
    };
    fetchUsers();
  }, []);
  const renderItem = useCallback(
    ({ item }: { item: TopBaritem }) => <HomeTopBarItem item={item} />,
    []
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: 125,
    },
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={topBarItems}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        windowSize={10}
        horizontal={true}
      />
    </View>
  );
}
