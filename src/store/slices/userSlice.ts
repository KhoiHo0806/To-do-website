import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}
export interface UserState {
  accessToken: string | null;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  accessToken: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ accessToken: string; userInfo: UserInfo }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
    },

    clearUser(state) {
      state.accessToken = null;
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
