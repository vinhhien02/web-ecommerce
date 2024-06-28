import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";
export const getCategory = createAsyncThunk(
  "app/category",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllCategories();
    if (!response.status) return rejectWithValue(response);

    return response.data;
  }
);
