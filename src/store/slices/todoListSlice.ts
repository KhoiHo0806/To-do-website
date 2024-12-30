import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface todoItemState {
  id: string;
  description: string;
  isFinished: boolean;
}
interface todoListState {
  todoList: todoItemState[];
}

const todoList = localStorage.getItem("todoItemList");
console.log("slice todo list" + todoList)
const initialState: todoListState = {
  todoList: todoList ? JSON.parse(todoList) : [],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ todoItem: todoItemState }>) {
      state.todoList.push(action.payload.todoItem);
    },

    removeItem(state, action: PayloadAction<{ todoItem: todoItemState }>) {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.todoItem.id
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = todoListSlice.actions;
export default todoListSlice.reducer;
