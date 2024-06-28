import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asynAction";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    message: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    clearMessage: (state, action) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(action.getCurrent.pending, (state) => {
      //   // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(action.getCurrent.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(action.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      // state.isLoading = false;
      // state.current = null;
      // state.isLoggedIn = false;
      // state.token = null;
      // state.message = "Phiên đăng nhập đã hết hạn hãy đăng nhập lại";
    });
  },
});
export const { login, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
