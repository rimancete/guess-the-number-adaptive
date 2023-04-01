import { useState } from "react";
import { StyleSheet, TextInput, View, Alert } from "react-native";

import { Colors } from "../../helpers";
import {
  CardBox,
  CustomText,
  PageTitle,
  PrimaryButton,
} from "../../components";
import RootView from "./components/RootView";

const { secondary500 } = Colors;

interface StartGameScreenProps {
  onPickNumber: (chosenNumber: number) => void;
}
function StartGameScreen({ onPickNumber }: StartGameScreenProps) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (enteredText: string) => {
    const numberValue = enteredText.replace(/[^\d]/g, "");
    setEnteredNumber(numberValue);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmButtonHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Ok", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
  };

  return (
    <RootView>
      <PageTitle title="Guess My Number" />
      <CardBox>
        <CustomText>Enter a Number</CustomText>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          <PrimaryButton onPress={confirmButtonHandler}>Confirm</PrimaryButton>
        </View>
      </CardBox>
    </RootView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  input: {
    fontFamily: "open-sans-bold",
    height: 50,
    width: 45,
    fontSize: 32,
    borderBottomColor: secondary500,
    borderBottomWidth: 2,
    color: secondary500,
    marginVertical: 8,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
