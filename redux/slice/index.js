import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  input: "",
  data: [],
  selected: null,
  isError: false
}

export const googlePlaceSlice = createSlice({
  name: "GOOGLE_PLACE",
  initialState,
  reducers: {
    onChangeInput: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.input = action.payload;
    },
    onChangeData: (state, action) => {
      state.data = action.payload;
    },
    onSelected: (state, action) => {
      state.selected = action.payload;
    },
    onChangeError: (state, action) => {
      state.isError = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { onChangeInput, onChangeData, onSelected, onChangeError } = googlePlaceSlice.actions

export default googlePlaceSlice.reducer
