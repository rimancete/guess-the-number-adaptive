import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, useWindowDimensions } from "react-native";

import { getLandscapeLayout } from "../../utils";
import { PageTitle } from "../../components";
import ControlsContainer from "./components/ControlsContainer";
import GuessContainer from "./components/GuessContainer";
import LogRounds from "./components/LogRounds";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randomNumber;
};

let minBoundary = 1;
let maxBoundary = 100;

interface GameScreenProps {
  pickedNumber: number;
  onGameOver: (guessRounds: number) => void;
}

function GameScreen({ pickedNumber, onGameOver }: GameScreenProps) {
  const { height } = useWindowDimensions();
  const isLandscape = getLandscapeLayout(height);

  const initialGuess = generateRandomBetween(1, 100, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < pickedNumber) ||
      (direction === "greater" && currentGuess > pickedNumber)
    ) {
      Alert.alert("Dont't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessRounds((previusGuessRounds) => [
      newRandomNumber,
      ...previusGuessRounds,
    ]);
  };

  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, pickedNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  return isLandscape ? (
    <View style={styles.gameScreenContainer}>
      <PageTitle title="Opponent's Guess" />

      <View style={{ flexDirection: "row", flex: 2, marginTop: 16 }}>
        <GuessContainer currentGuess={currentGuess} />
        <ControlsContainer
          onNextGuess={nextGuessHandler}
        />
      </View>

      <LogRounds
        guessRounds={guessRounds}
        guessRoundsListLength={guessRoundsListLength}
        style={{ marginTop: 16 }}
      />
    </View>
  ) : (
    <View style={styles.gameScreenContainer}>
      <PageTitle title="Opponent's Guess" />
      <GuessContainer currentGuess={currentGuess} />
      <ControlsContainer onNextGuess={nextGuessHandler} />
      <LogRounds
        guessRounds={guessRounds}
        guessRoundsListLength={guessRoundsListLength}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  gameScreenContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
});
