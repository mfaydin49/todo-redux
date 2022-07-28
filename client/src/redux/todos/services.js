import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (data) => {
    const res = await axios.post(
      `${env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(`${env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);

    return id;
  }
);
