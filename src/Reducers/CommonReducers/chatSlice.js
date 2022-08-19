import { createSlice } from "@reduxjs/toolkit";
import { any } from "prop-types";

const initialState = {
  isLoaderStart: false,
  existingChats: [],
  updateChat: "",
  updateList: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },

    setExistingChats: (state, action) => {
      state.existingChats = action.payload;
    },
    setChatUpdate: (state, action) => {
      state.updateChat = action.payload;
    },
    updateChatList: (state, action) => {
      state.updateList = action.payload;
    },
  },
});

export const { startLoader, setExistingChats, setChatUpdate, updateChatList } =
  chatSlice.actions;

export default chatSlice.reducer;
