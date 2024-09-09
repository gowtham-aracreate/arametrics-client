import { combineReducers } from '@reduxjs/toolkit';
import tabReducer from '../features/tabSlice';

const rootReducer = combineReducers({
    tab: tabReducer,
});

export default rootReducer;
