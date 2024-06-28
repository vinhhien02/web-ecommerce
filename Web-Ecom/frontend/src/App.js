import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Publics,
  Home,
  Login,
  FinallRegister,
  ForgotPassword,
  ResetPassword,
  ProductDetailt,
  ProductCategory,
  ProfilePublics,
} from "./pages/publics";
import {
  Member,
  CreateProduct,
  Profile,
  Favorite,
  HomeMember,
  UpdateProduct,
} from "./pages/member";
import {
  Admin,
  Dasboard,
  ManagerCategory,
  ManagerUser,
  AddCategory,
  EditCategory,
  ManagerProduct,
} from "./pages/admin";
import path from "./ultils/path";
import { getCategory } from "./store/asyncAction";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLICS} element={<Publics />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FINALREDISTER} element={<FinallRegister />} />
          <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={path.FRESETPASSWORD} element={<ResetPassword />} />
          <Route path={path.PRODUCTDETAIL} element={<ProductDetailt />} />
          <Route path={path.PRODUCTCATEGORY} element={<ProductCategory />} />
          <Route path={path.PROFILEPUBLICS} element={<ProfilePublics />} />
        </Route>
        <Route path={path.MEMBER} element={<Member />}>
          <Route path={path.HOMEMEMBER} element={<HomeMember />} />
          <Route path={path.CREATEPRODUCT} element={<CreateProduct />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.FAVORITE} element={<Favorite />} />
          <Route path={path.UPDADEPRODUCT} element={<UpdateProduct />} />
        </Route>
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.DASBOARD} element={<Dasboard />} />
          <Route path={path.MANAGERUSER} element={<ManagerUser />} />
          <Route path={path.MANAGERCATEGORY} element={<ManagerCategory />} />
          <Route path={path.ADDCATEGORY} element={<AddCategory />} />
          <Route path={path.EDITCATEGORY} element={<EditCategory />} />
          <Route path={path.MANAGERPRODUCT} element={<ManagerProduct />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
