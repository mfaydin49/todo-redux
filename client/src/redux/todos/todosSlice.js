import { createSlice } from "@reduxjs/toolkit";
import {
  getTodoAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: localStorage.getItem("activeFilter") || "all",
    isLoading: false,
    error: null,
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearComplated: (state, action) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    // get todo
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    //add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.messasge;
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { _id, completed } = action.payload;
      const index = state.items.findIndex((item) => item._id === _id);
      state.items[index].completed = completed;
    },
    [removeTodoAsync.fulfilled]: (state, action) => {
      const _id = action.payload;
      const filtered = state.items.filter((item) => item._id !== _id);
      state.items = filtered;
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectAktiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const { changeActiveFilter, clearComplated } = todosSlice.actions;
export default todosSlice.reducer;
