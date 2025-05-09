import { Colors } from "@/constants/Colors"
import { globalStyles } from "@/styles/global"
import * as Haptics from "expo-haptics"
import { Pressable, Text } from "react-native"

interface Props {
  label: string
  color?: string
  blackText?: boolean
  dobleSize?: boolean

  onPress: () => void
}

const CalculatorButton = ({
  label,
  color = Colors.darkGray,
  blackText = false,
  dobleSize = false,
  onPress
}: Props) => {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync()
        onPress()
      }}
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.5 : 1,
        width: dobleSize ? 180 : 80
      })}
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? "black" : "white"
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default CalculatorButton
