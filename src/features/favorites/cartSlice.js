import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: "favorites",
    initialState: {
        fav: []
    },
    reducers: {
        getFavorites: (state, action) => {
            state.fav.push(action.payload)
        }
    }
});
export const {getFavorites} = cartSlice.actions;
export default cartSlice.reducer;