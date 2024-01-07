import { configureStore } from "@reduxjs/toolkit"
import googlePlaceReducer from "../slice";

export const store = configureStore({
  reducer: {
    googlePlace: googlePlaceReducer,
    // Can add more reducers from different files from below onwards here
  },
})