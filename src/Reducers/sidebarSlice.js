import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer