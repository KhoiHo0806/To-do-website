import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import todoListReducer from "./slices/todoListSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    todoList: todoListReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
