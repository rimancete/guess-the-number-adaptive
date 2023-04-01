import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { getLandscapeLayout } from "../../utils";
import { Colors } from "../../helpers";
import { PageTitle, PrimaryButton } from "../../components";

const { primary900, primary500 } = Colors;

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

function GameOverScreen({
  roundsNumber,
  userNumber,
  onStartNewGame,
}: GameOverScreenProps) {
  const { height } = useWindowDimensions();
  const isLandscape = getLandscapeLayout(height);

  return isLandscape ? (
    <View style={[styles.gameOverScreenContainer, { marginHorizontal: 48 }]}>
      <PageTitle title="GAME OVER" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 2,
          margin: 8,
        }}
      >
        <View
          style={[
            styles.imageContainer,
            { width: 150, height: 150, margin: 0, borderRadius: 75 },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../../assets/images/success.png")}
          />
        </View>
        <View style={{ justifyContent: "center", margin: 8 }}>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlightText}>{userNumber}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  ) : (
    <View style={[styles.gameOverScreenContainer, {paddingVertical: 0, paddingHorizontal: 16}]}>
      <PageTitle title="GAME OVER" />
      <View
        style={[
          styles.imageContainer,
          {
            width: isLandscape ? 150 : 300,
            height: isLandscape ? 150 : 300,
            borderRadius: isLandscape ? 75 : 150,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={require("../../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{" "}
        <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess
        the number <Text style={styles.highlightText}>{userNumber}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  gameOverScreenContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 75 ? 150 : 300,
    borderWidth: 3,
    borderColor: primary900,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: primary500,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
