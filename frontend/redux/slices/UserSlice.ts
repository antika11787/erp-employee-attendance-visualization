import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/interface";

const initialState: UserState = {
  username: "",
  email: "",
  token: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveVerification: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    saveLogin: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        token: string;
        role: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    removeLogin: (state) => {
      state.username = "";
      state.email = "";
      state.token = "";
      state.role = "";

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { saveVerification, saveLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;
