import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: !!localStorage.getItem('token'),
	token: localStorage.getItem('token'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
		},
		setIsAuth(state, action) {
			state.isAuth = action.payload;
		},
		logout(state) {
			state.isAuth = false;
			state.token = null;
			localStorage.removeItem('token');
		},
	},
});

export const { setIsAuth, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
