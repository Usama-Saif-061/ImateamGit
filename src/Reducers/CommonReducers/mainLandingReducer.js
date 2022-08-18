import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelected: "",
  tabColor: "",
};

export const bottomTabSlice = createSlice({
  name: "bottomTab",
  initialState,
  reducers: {
    tabSelection: (state, action) => {
      state.isSelected = action.payload;
    },
    tabDeselection: (state) => {
      state.isSelected = "";
    },
    tabColor: (state, action) => {
      state.isSelected = action.payload;
    }
  },
});

export const { tabSelection, tabDeselection, tabColor } =
  bottomTabSlice.actions;

export default bottomTabSlice.reducer;
