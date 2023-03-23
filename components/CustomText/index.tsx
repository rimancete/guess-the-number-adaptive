import { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { Colors } from "../../helpers";

const { secondary500 } = Colors;

interface CustomTextProps extends TextProps {
  children: ReactNode;
}
function CustomText({ children, style }: CustomTextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-bold",
    color: secondary500,
    fontSize: 24,
  },
});
