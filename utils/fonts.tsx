import * as Font from "expo-font";

export async function loadFonts() {
  await Font.loadAsync({
    "FiraCode-Light": require("../assets/fonts/FiraCode-Light.ttf"),
    "FiraCode-Bold": require("../assets/fonts/FiraCode-Bold.ttf"),
    "FiraCode-SemiBold": require("../assets/fonts/FiraCode-SemiBold.ttf"),
    "FiraCode-Regular": require("../assets/fonts/FiraCode-Regular.ttf"),
    "FiraCode-Retina": require("../assets/fonts/FiraCode-Retina.ttf"),
    "FiraCode-Medium": require("../assets/fonts/FiraCode-Medium.ttf"),
  });
}
