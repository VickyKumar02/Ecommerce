import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user info like email, name, etc.
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // payload = { email, name }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
