import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asynAction";
export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(action.getFavorite.pending, (state) => {
      //   // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(action.getFavorite.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.favorite = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(action.getFavorite.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const {} = favoriteSlice.actions;

export default favoriteSlice.reducer;
