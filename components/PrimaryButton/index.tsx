import { ReactNode } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  PressableProps,
} from "react-native";

import { Colors } from "../../helpers";

const { primary500, primary600, light500 } = Colors;
interface PrimaryButtonProps extends PressableProps {
  children: ReactNode;
}
function PrimaryButton({ children, onPress }: PrimaryButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1, // an alternative implementation is set this in each button view
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    fontFamily: "open-sans",
    color: light500,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
