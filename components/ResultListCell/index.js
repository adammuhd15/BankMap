import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function ResultListCell({
  item,
  dispatch,
  onSelected = (item) => null,
  resetData = () => null,
}) {

  let mainText = item.address.name;
  if (item.type === "city" && item.address.state)
    mainText += ", " + item.address.state;
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(onSelected(item));
        Keyboard.dismiss();
        resetData();
      }}
      style={styles.container}
    >
      <MaterialIcons
        name={item.type === "city" ? "location-city" : "location-on"}
        color={"#000000"}
        size={30}
      />
      <View style={styles.subContainer}>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.country}>{item.address.country}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  subContainer: {
    marginLeft: 10,
    flexShrink: 1
  },
  mainText: {
    fontWeight: "700"
  },
  country: {
    fontSize: 12
  }
});

export default ResultListCell;
