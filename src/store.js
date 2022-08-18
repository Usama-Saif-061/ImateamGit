import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/userReducer";
import commonReducer from "./Reducers/CommonReducers/mainLandingReducer"
import sidebarReducer from "./Reducers/sidebarSlice";
import calendarReducer from './Reducers/CommonReducers/calendarSlice'
import chatReducer from './Reducers/CommonReducers/chatSlice'
import { baseApi } from "./Reducers/baseApi";
export const store = configureStore({
  reducer: {
    user: userSlice,
    bottomTab: commonReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    sidebar: sidebarReducer,
    calendar: calendarReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
