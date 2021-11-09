import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  user_id: null,
  role: null,
  basic_info: null,
  jwt: null,
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateValue,
  reducers: {
    login: (state, action) => {
      return state = action.payload;
    },
    logout: (state) => {
        return state = { user_id: null, role: null, basic_info: null, jwt: null, status: false, };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;