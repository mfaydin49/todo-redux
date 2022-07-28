import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`https://todo-aydin.herokuapp.com/api/todos`);
    return res.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (data) => {
    const res = await axios.post(
      `https://todo-aydin.herokuapp.com/api/todos`,
      data
    );
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `https://todo-aydin.herokuapp.com/api/todos/${id}`,
      data
    );
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(`https://todo-aydin.herokuapp.com/api/todos/${id}`);

    return id;
  }
);
