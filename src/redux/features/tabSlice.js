import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        mainTab: 'Home',
        calendarTab: 'Events'
    },
    reducers: {
        setMainTab: (state, action) => {
            state.mainTab = action.payload;
        },
        setCalendarTab: (state, action) => {
            state.calendarTab = action.payload;
        },
    },
});

export const { setMainTab, setCalendarTab } = tabSlice.actions;
export default tabSlice.reducer;

// selectors
export const selectMainTab = (state) => state.tab.mainTab;
export const selectCalendarTab = (state) => state.tab.activeTab.calendarTab;