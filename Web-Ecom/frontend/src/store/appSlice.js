import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    category: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(action.getCategory.pending, (state) => {
      //   // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(action.getCategory.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.category = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(action.getCategory.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { logout } = appSlice.actions;

export default appSlice.reducer;
