import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

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
interface UserState {
  userInfo: UserInfo | null;
}

const authData = localStorage.getItem("authData");

const initialState: UserState = {
  userInfo: authData ? JSON.parse(authData).user : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ userInfo: UserInfo }>) {
      state.userInfo = action.payload.userInfo;
    },

    clearUser(state) {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
