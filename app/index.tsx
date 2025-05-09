import CalculatorButton from "@/components/CalculatorButton"
import ThemeText from "@/components/ThemeText"
import { Colors } from "@/constants/Colors"
import { globalStyles } from "@/styles/global"
import { View } from "react-native"
import { useCalculator } from "./hooks/useCalculator"

export default function CalculatorApp() {
  const {
    formula,
    prevNumber,
    buildNumber,
    clean,
    toggleSign,
    deleteLastNumber,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    // calculateSubResult,
    calculateResult
  } = useCalculator()

  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
        <ThemeText variant="h1">{formula}</ThemeText>

        {formula === prevNumber ? (
          <ThemeText variant="h2"></ThemeText>
        ) : (
          <ThemeText variant="h2">{prevNumber}</ThemeText>
        )}
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="AC"
          blackText
          color={Colors.lightGray}
          onPress={clean}
        />
        <CalculatorButton
          label="+/-"
          blackText
          color={Colors.lightGray}
          onPress={toggleSign}
        />
        <CalculatorButton
          label="DEL"
          blackText
          color={Colors.lightGray}
          onPress={deleteLastNumber}
        />
        <CalculatorButton
          label="÷"
          color={Colors.orange}
          onPress={divideOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="7"
          onPress={() => buildNumber("7")}
        />
        <CalculatorButton
          label="8"
          onPress={() => buildNumber("8")}
        />
        <CalculatorButton
          label="9"
          onPress={() => buildNumber("9")}
        />
        <CalculatorButton
          label="×"
          color={Colors.orange}
          onPress={multiplyOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="4"
          onPress={() => buildNumber("4")}
        />
        <CalculatorButton
          label="5"
          onPress={() => buildNumber("5")}
        />
        <CalculatorButton
          label="6"
          onPress={() => buildNumber("6")}
        />
        <CalculatorButton
          label="-"
          color={Colors.orange}
          onPress={subtractOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="1"
          onPress={() => buildNumber("1")}
        />
        <CalculatorButton
          label="2"
          onPress={() => buildNumber("2")}
        />
        <CalculatorButton
          label="3"
          onPress={() => buildNumber("3")}
        />
        <CalculatorButton
          label="+"
          color={Colors.orange}
          onPress={addOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="0"
          dobleSize
          onPress={() => buildNumber("0")}
        />
        <CalculatorButton
          label="."
          onPress={() => buildNumber(".")}
        />
        <CalculatorButton
          label="="
          color={Colors.orange}
          onPress={calculateResult}
        />
      </View>
    </View>
  )
}
