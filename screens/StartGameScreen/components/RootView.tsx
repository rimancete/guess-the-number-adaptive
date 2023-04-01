import {
    KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
  useWindowDimensions,
} from "react-native";
import { getLandscapeLayout } from "../../../utils";

function RootView({ children }: ViewProps) {
  const { height } = useWindowDimensions();
  const isLandscape = getLandscapeLayout(height);

  const rootContainerMarginTopUpdated = isLandscape ? 30 : 50;

  const renderRootContainer = () =>
    Platform.OS === "ios" ? (
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior="position"
        >{children}</KeyboardAvoidingView>
      </ScrollView>
    ) : (
      <View
        style={[
          styles.rootContainer,
          { marginTop: rootContainerMarginTopUpdated },
        ]}
      >
        {children}
      </View>
    );

    return renderRootContainer();
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default RootView;
