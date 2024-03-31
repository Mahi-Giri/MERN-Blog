import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        error: null,
        loading: false,
    },
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signinSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },

        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },

        updateSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },

        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signinStart, signinSuccess, signinFailure, updateStart, updateSuccess, updateFailure } =
    userSlice.actions;

export default userSlice.reducer;
