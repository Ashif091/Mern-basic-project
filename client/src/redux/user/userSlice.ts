import { createSlice } from '@reduxjs/toolkit';

interface Err {
    message: string | null;
}
class ErrorClass implements Err {
    message: string | null;

    constructor(message: string | null) {
        this.message = message;
    }
}
const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    errorMsg: new ErrorClass(null),
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;

