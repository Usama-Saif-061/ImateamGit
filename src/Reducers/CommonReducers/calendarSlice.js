import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  eventsList: [],
  currentCalendar: {},
  activeCalendars: [],
  timezone: '',
  navFromLanding: false
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    allCalendarsList: (state, action) => {
      state.list = action.payload
    },
    allEventsList: (state, action) => {
      console.log("all events call ",action.payload)
      state.eventsList = action.payload
    },
    currentCalendar: (state, action) => {
      state.currentCalendar = action.payload
    },
    activeCalendars: (state, action) => {
      state.activeCalendars = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setNavFromLanding: (state, action) => {
      state.navFromLanding = action.payload
    }
  },
});

export const {
  allCalendarsList,
  currentCalendar,
  allEventsList,
  activeCalendars,
  setTimezone,
  setNavFromLanding
} = calendarSlice.actions;

export default calendarSlice.reducer
