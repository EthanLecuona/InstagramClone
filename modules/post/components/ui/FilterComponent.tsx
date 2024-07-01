import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Button from "./Button";
import { settings } from "../constants/Settings";
import FilterItem from "./FilterItem";
import { useState } from "react";
import Filter from "./Filter";

interface Filter {
  name: string;
  step?: number;
  minValue: number;
  maxValue: number;
  iconName: string;
}

const { height } = Dimensions.get("screen");

export default function FilterComponent({
  handleEdit,
  applyFilter,
  resetFilter,
}: any) {
  const [selectedFilter, setSelectedFilter] = useState<Filter>();
  const [showSlider, setShowSlider] = useState(false);

  function handleSelectedFilter(filter: any) {
    setSelectedFilter(filter);
    setShowSlider(true);
  }

  function handleCancel() {
    setSelectedFilter(undefined);
    setShowSlider(false);
    resetFilter();
  }

  function handleConfirm() {
    setSelectedFilter(undefined);
    setShowSlider(false);
  }

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      maxHeight: height / 4,
    },
    scrollView: {
      alignItems: "center",
      justifyContent: "center",
    },
    footer: {
      padding: 10,
      flexDirection: "row",
      width: "100%",
      justifyContent: !showSlider ? "center" : "space-between",
    },
    buttonDone: {
      backgroundColor: "grey",
    },
  });

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView} horizontal>
          {!showSlider && !selectedFilter ? (
            settings.map((setting) => (
              <FilterItem
                key={setting.name}
                name={setting.name}
                icon={setting.iconName}
                onPress={() => handleSelectedFilter(setting)}
              />
            ))
          ) : (
            <Filter
              onChange={(value: any) =>
                applyFilter(selectedFilter?.name, value)
              }
              name={selectedFilter?.name}
              minValue={selectedFilter?.minValue}
              maxValue={selectedFilter?.maxValue}
              step={selectedFilter?.step}
            />
          )}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        {!showSlider ? (
          <Button onPress={handleEdit} style={styles.buttonDone}>
            Done
          </Button>
        ) : (
          <>
            <Button
              onPress={handleConfirm}
              style={styles.buttonDone}
              icon={"check"}
            ></Button>
            <Button
              onPress={handleCancel}
              style={styles.buttonDone}
              icon={"x"}
            ></Button>
          </>
        )}
      </View>
    </>
  );
}
