const path = {
  PUBLICS: "/",
  HOME: "",
  LOGIN: "login",
  ALL: "*",
  PRODUCT: "products",
  BLOG: "blog",
  FINALREDISTER: "finalregister/:status",
  FORGOTPASSWORD: "forgotpassword",
  FRESETPASSWORD: "reset-password/:token",
  PRODUCTDETAIL: "productdetails/:slug",
  PRODUCTCATEGORY: "/:slug",
  PROFILEPUBLICS: "profile/:_id",

  // member
  MEMBER: "",
  CREATEPRODUCT: "createproduct",
  PROFILE: "profile",
  FAVORITE: "favorite",
  HOMEMEMBER: "user",
  UPDADEPRODUCT: "updateproduct/:slug",

  // admin
  ADMIN: "admin",
  DASBOARD: "",
  MANAGERUSER: "manageruser",
  MANAGERCATEGORY: "managercategory",
  ADDCATEGORY: "addcategory",
  EDITCATEGORY: "editcategory/:id",
  MANAGERPRODUCT: "managerproduct",
};

export default path;
