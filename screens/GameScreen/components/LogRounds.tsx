import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { Colors } from "../../../helpers";

const { primary900, secondary500 } = Colors;

interface LogRoundsProps extends ViewProps {
  guessRounds: number[];
  guessRoundsListLength: number;
}

function LogRounds({ guessRounds, guessRoundsListLength, style }: LogRoundsProps) {
  const renderItem = (itemData: ListRenderItemInfo<number>) => {
    const { item, index } = itemData;
    return (
      <View style={styles.listItems}>
        <Text style={styles.itemText}>#{guessRoundsListLength - index}</Text>
        <Text style={styles.itemText}>Opponent's Guess: {item}</Text>
      </View>
    );
  };

  const keyExtractor = (item: number) => String(item);

  return (
    <View style={[styles.roundsContainer, style]}>
      <FlatList
        data={guessRounds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export default LogRounds;

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  roundsContainer: {
    flex: 1,
    marginTop: 30,
  },
  listItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: deviceWidth < 380 ? 0 : 8,
    marginBottom: deviceWidth < 380 ? 4 : 8,
    borderColor: primary900,
    borderWidth: 2,
    borderRadius: 40,
    padding: 12,
    backgroundColor: secondary500,

    //android shadow styles
    elevation: 4,

    //ios shadow styles
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
});
