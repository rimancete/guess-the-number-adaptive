import { StyleSheet, Text, View, Dimensions } from "react-native";

import { Colors } from "../../../helpers";

const { secondary500 } = Colors;
interface GuessProps {
  currentGuess: number;
}

function GuessContainer({ currentGuess }: GuessProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{currentGuess}</Text>
    </View>
  );
}

export default GuessContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: secondary500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90%",
    width: 300,
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: secondary500,
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});
