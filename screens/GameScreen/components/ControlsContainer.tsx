import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../helpers";
import { CustomText, PrimaryButton } from "../../../components";
import CardBox from "../../../components/CardBox";

const { light500 } = Colors;
interface ControlsContainerProps {
  onNextGuess: (direction: "greater" | "lower") => void;
}

function ControlsContainer({ onNextGuess }: ControlsContainerProps) {
  const onNextGuessHandler = (direction: "greater" | "lower") => {
    onNextGuess(direction);
  };

  return (
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
