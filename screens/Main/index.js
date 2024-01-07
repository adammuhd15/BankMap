import { useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from 'react-native-maps';

// Local imports
import LocationTextField from "../../components/LocationTextField";
import ResultLists from "../../components/ResultLists";
import {
  onChangeInput,
  onChangeData,
  onChangeError
} from "../../redux/slice";
import { getAutoCompleteData } from "../../api/autocomplete";

function Main() {
  const mapRef = useRef();
  const data = useSelector((state) => state.googlePlace.data);
  const selected = useSelector((state) => state.googlePlace.selected);
  const isError = useSelector((state) => state.googlePlace.isError);
  const dispatch = useDispatch();

  const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: 2
  };

  const focusMap = () => {
    const SelectedDestination = {
      latitude: selected ? parseInt(selected?.lat) : 37.33,
      longitude: selected ? parseInt(selected?.lon) : -122,
      latitudeDelta: 1,
      longitudeDelta: 1
    };
    mapRef.current?.animateToRegion(SelectedDestination);
  }

  const onChangeInnerText = async (text) => {
    dispatch(onChangeInput(text));
    if (text.length === 0) return dispatch(onChangeData([]));
    if (text.length > 2) {
      try {
        let response = await getAutoCompleteData(text);
        if (response) {
          if (isError) {
            dispatch(onChangeError(false));
          }
          dispatch(onChangeData(response));
        }
      }
      catch (error) {
        dispatch(onChangeError(true));
      }
    } else {
      dispatch(onChangeData([]));
    }
  }

  useEffect(() => {
    if (selected) {
      focusMap();
    }
  }, [selected])
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.flexOne}>
        {/* Custom TextField Component */}
        <LocationTextField
          onChangeInnerText={onChangeInnerText}
        />
        {/* Results List */}
        {data.length > 0 && !isError && (
          <ResultLists />
        )}
        {/* Result in Text */}
        {selected && data.length === 0 && (
          <Text style={styles.textLabel}>Searched Result: {selected?.address.name}</Text>
        )}
        {/* Maps */}
        <View style={styles.flexOne}>
          <MapView
            style={StyleSheet.absoluteFill}
            provider="google"
            initialRegion={INITIAL_REGION}
            ref={mapRef}
          >
            {selected && (
              <Marker
                key={selected?.osm_id ?? 0}
                coordinate={{
                  longitude: selected ? parseInt(selected?.lon) : 37.33,
                  latitude: selected ? parseInt(selected?.lat) : -122
                }}
                title={selected ? selected?.address.name : "San Francisco"}
                description={selected ? selected?.address.country : "United States of America"}
              />
            )}
          </MapView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  textLabel: {
    marginLeft: 12,
    marginVertical: 5,
    fontSize: 12,
    fontWeight: "500"
  }
});

export default Main;
