import { StyleSheet, useWindowDimensions, View, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getLandscapeLayout } from "../../../utils";
import { Colors } from "../../../helpers";
import { CustomText, PrimaryButton } from "../../../components";
import CardBox from "../../../components/CardBox";

const { light500 } = Colors;
interface ControlsContainerProps {
  onNextGuess: (direction: "greater" | "lower") => void;
  GuessContainerComponent?: () => JSX.Element;
}

function ControlsContainer({
  onNextGuess,
  GuessContainerComponent,
}: ControlsContainerProps) {
  const { height } = useWindowDimensions();
  const isLandscape = getLandscapeLayout(height);

  const onNextGuessHandler = (direction: "greater" | "lower") => {
    onNextGuess(direction);
  };

  const renderControlsContainer = () =>
    isLandscape ? (
      <CardBox style={{ width: "100%", marginTop: 8 }}>
        <CustomText>Higher or Lower?</CustomText>
        <View style={[styles.buttonsContainer, { alignItems: 'center'}]}>
          <PrimaryButton onPress={() => onNextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} style={styles.icon} />
          </PrimaryButton>
          {GuessContainerComponent && GuessContainerComponent()}
          <PrimaryButton onPress={() => onNextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} style={styles.icon} />
          </PrimaryButton>
        </View>
      </CardBox>
    ) : (
      <CardBox>
        <CustomText>Higher or Lower?</CustomText>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={() => onNextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} style={styles.icon} />
          </PrimaryButton>
          <PrimaryButton onPress={() => onNextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} style={styles.icon} />
          </PrimaryButton>
        </View>
      </CardBox>
    );

  return renderControlsContainer();
}

export default ControlsContainer;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  icon: {
    color: light500,
  },
});
