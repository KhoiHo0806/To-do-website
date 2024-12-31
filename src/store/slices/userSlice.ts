import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";



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
    setUser(state, action: PayloadAction<{ userInfo: UserInfo,welcomeMessage:string }>) {
      state.userInfo = action.payload.userInfo;
      toast(action.payload.welcomeMessage, {
        duration: 1500,
        className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
      });
    },

    clearUser(state) {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
