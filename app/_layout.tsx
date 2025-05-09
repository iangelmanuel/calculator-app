import { globalStyles } from "@/styles/global"
import { useFonts } from "expo-font"
import * as NavigationBar from "expo-navigation-bar"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, View } from "react-native"

const isAndroid = Platform.OS === "android"

if (isAndroid) {
  NavigationBar.setButtonStyleAsync("dark")
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={globalStyles.background}>
      <Slot />

      <StatusBar style="light" />
    </View>
  )
}
