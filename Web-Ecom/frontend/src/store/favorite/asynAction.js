import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getFavorite = createAsyncThunk(
  "favorite/favorite",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetFavorite();

    if (!response.status) return rejectWithValue(response);
    return response.favorites;
  }
);
