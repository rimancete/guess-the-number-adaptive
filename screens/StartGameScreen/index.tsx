import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  useWindowDimensions,
} from "react-native";

import { Colors } from "../../helpers";
import {
  CardBox,
  CustomText,
  PageTitle,
  PrimaryButton,
} from "../../components";
import { getLandscapeLayout } from "../../utils";

const { secondary500 } = Colors;

interface StartGameScreenProps {
  onPickNumber: (chosenNumber: number) => void;
}
function StartGameScreen({ onPickNumber }: StartGameScreenProps) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { height } = useWindowDimensions();
  const isLandscape = getLandscapeLayout(height);

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

  const rootContainerMarginTopUpdated = isLandscape ? 30 : 50;

  return (
    <View
      style={[
        styles.rootContainer,
        { marginTop: rootContainerMarginTopUpdated },
      ]}
    >
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
    </View>
  );
}

export default StartGameScreen;

// const deviceHeigth = Dimensions.get('window').height

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeigth < 380 ? 30: 50,
    alignItems: "center",
  },
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
