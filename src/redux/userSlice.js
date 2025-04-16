import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      state.user.email = email;
      state.user.password = password;
    },
    logout: (state) => {
      state.user = { email: '', password: '' };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
