import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItemState {
  id: string;
  description: string;
  isFinished: boolean;
}
interface TodoListState {
  todoList: TodoItemState[];
}

const todoList = localStorage.getItem("todoItemList");
const initialState: TodoListState = {
  todoList: todoList ? JSON.parse(todoList) : [],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ todoItem: TodoItemState }>) {
      state.todoList.push(action.payload.todoItem);
    },

    removeItem(state, action: PayloadAction<{ todoItem: TodoItemState }>) {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.todoItem.id,
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
    },

    updateTodoItem(state, action: PayloadAction<{ todoItem: TodoItemState }>) {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.todoItem.id,
      );
      if (index !== -1) {
        state.todoList[index] = action.payload.todoItem;
      }
    },
  },
});

export const { addItem, removeItem, updateTodoItem } = todoListSlice.actions;
export default todoListSlice.reducer;
