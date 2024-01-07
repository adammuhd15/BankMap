import axios, { getData } from "../axios";

export const getAutoCompleteData = async (textInput = "") => {
    return axios.get(`/autocomplete?key=${process.env.EXPO_PUBLIC_LOCATION_IQ_API_KEY}&q=${textInput}&limit=5&dedupe=1&`).then(getData);
};
