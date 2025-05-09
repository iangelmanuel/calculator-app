import { useEffect, useRef, useState } from "react"

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "×",
  divide = "÷"
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("")

  const [number, setNumber] = useState("0")
  const [prevNumber, setPrevNumber] = useState("0")

  const lastOperation = useRef<Operator | undefined>(undefined)

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0)
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`)
    } else {
      setFormula(number)
    }
  }, [formula, number])

  useEffect(() => {
    const subResult = calculateSubResult()
    setPrevNumber(subResult.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula])

  const clean = () => {
    setNumber("0")
    setPrevNumber("0")
    setFormula("")
  }

  const deleteLastNumber = () => {
    let currentSign = ""
    let temporalNumber = number

    if (number.includes("-")) {
      currentSign = "-"
      temporalNumber = number.substring(1)
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1))
    }
    setNumber("0")
  }

  const toggleSign = () => {
    if (number.includes("-")) {
      return setNumber(number.replace("-", ""))
    }
    setNumber("-" + number)
  }

  const calculateResult = () => {
    const results = calculateSubResult()
    setFormula(results.toString())
    lastOperation.current = undefined
    setPrevNumber("0")
  }

  const buildNumber = (numberString: string) => {
    if (number.includes(".") && numberString === ".") return

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString)
      }

      // Evaluar si es otro cero y no hay punto decimal
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString)
      }

      // Evaluar si es diferente de cero y no hay punto y es el primero número
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString)
      }

      // Evitar el cero a la izquierda
      if (numberString === "0" && !number.includes(".")) {
        return
      }
    }
    setNumber(number + numberString)
  }

  const setLastNumber = () => {
    calculateResult()

    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1))
    }
    setPrevNumber(number)
    setNumber("0")
  }

  const divideOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.divide
  }
  const multiplyOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.multiply
  }
  const subtractOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.subtract
  }
  const addOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.add
  }

  const calculateSubResult = () => {
    const [firstValue, operator, secondValue] = formula.split(" ")

    const num1 = Number(firstValue)
    const num2 = Number(secondValue)

    if (isNaN(num2)) return num1

    switch (operator) {
      case Operator.add:
        return num1 + num2

      case Operator.subtract:
        return num1 - num2

      case Operator.multiply:
        return num1 * num2

      case Operator.divide:
        return num1 / num2

      default:
        throw new Error(`Invalid ${operator} operator`)
    }
  }

  return {
    // Props
    formula,
    number,
    prevNumber,

    // Methods
    buildNumber,
    clean,
    toggleSign,
    deleteLastNumber,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateSubResult,
    calculateResult
  }
}
