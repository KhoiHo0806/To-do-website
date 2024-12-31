import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

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
    addItem(state, action: PayloadAction<{ todoItem: TodoItemState, message:string }>) {
      state.todoList.push(action.payload.todoItem);
      toast.success(action.payload.message, {
        duration: 1500,
        className: "bg-cyan-500 text-white p-4 rounded-md shadow-lg",
      });
    },

    removeItem(state, action: PayloadAction<{ todoItem: TodoItemState, message:string }>) {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.todoItem.id,
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
      toast(action.payload.message, {
        duration: 1500,
        className: "bg-red-500 text-white p-4 rounded-md shadow-lg",
      });
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
