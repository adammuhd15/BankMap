import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Local imports
import ResultListCell from "../ResultListCell";
import {
  onSelected,
  onChangeData,
  onChangeInput
} from "../../redux/slice";

function ResultLists() {
  const data = useSelector((state) => state.googlePlace.data);
  const dispatch = useDispatch();
  const resetData = () => {
    dispatch(onChangeData([]));
    dispatch(onChangeInput(""));
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ResultListCell
          item={item}
          dispatch={dispatch}
          onSelected={onSelected}
          resetData={resetData}
        />
      )}
      keyExtractor={item => item.osm_id}
      showsVerticalScrollIndicator={false}
      style={styles.flexOne}
    />
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  }
});

export default ResultLists;
