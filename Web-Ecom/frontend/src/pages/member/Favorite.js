import React, { useEffect, useState } from "react";
import { apiDeleteFavorite } from "../../apis/favorite";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import icons from "../../ultils/icon";

import { getFavorite } from "../../store/favorite/asynAction";
import { BsBox2 } from "react-icons/bs";
const Favorite = () => {
  const { MdOutlineHideImage, IoWarningOutline } = icons;
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorite.favorite);
  console.log("favorite", favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale("vi");
    dispatch(getFavorite());
  }, [dispatch]);

  const handleDeleteFavorite = async (_id) => {
    const rs = await apiDeleteFavorite(_id);
    if (rs.status === true) {
      alert(rs.message);
      dispatch(getFavorite());
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };
  return (
    <div class="font-sans  max-w-6xl max-lg:max-w-2xl mx-auto bg-white p-4">
      <div class="grid lg:grid-cols-1    ">
        <div class="flex flex-col w-full  right-0 gap-3 border-b  sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-title font-bold flex p-4 gap-4 items-center text-2xl">
            Sản phẩm đã lưu
          </h2>
        </div>
        {favorites?.length > 0 ? (
          <div className="w-3/4 ml-12 ">
            <div class=" p-6 rounded-md">
              <div class="space-y-4 mt-8">
                {favorites &&
                  favorites.map((product) => (
                    <div
                      key={product._id}
                      onClick={() =>
                        product?.productId
                          ? handleProductClick(product?.productId?.slug)
                          : alert("Sản phẩm không tồn tại ")
                      }
                      className={
                        product?.productId
                          ? "flex items-center gap-4  border-b border-gray-300 justify-center cursor-pointer p-3"
                          : "flex items-center gap-4  border-b border-gray-300 bg-red-200  p-3"
                      }
                    >
                      <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                        <img
                          src={
                            product?.productId?.thumb || <MdOutlineHideImage />
                          }
                          class="w-full h-full object-contain"
                        />
                      </div>

                      {product.productId ? (
                        <div class="w-full">
                          <h3 class="text-base font-semibold text-gray-800">
                            {product?.productId?.name}
                          </h3>
                          <h6 class="text-sm text-red-500 font-bold cursor-pointer mt-0.5">
                            {product?.productId?.price?.toLocaleString("vi-VN")}
                            VND
                          </h6>
                          {product?.productId?.status === false && (
                            <span className="flex text-red-500 gap-3 font-bold items-center">
                              <IoWarningOutline color="red" />
                              Rất tiếc phẩm này đã được bán !
                            </span>
                          )}
                          <div class="flex gap-4 mt-4">
                            <div class="ml-auto">
                              <svg
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFavorite(product._id);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 fill-red-500 inline cursor-pointer"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                  data-original="#000000"
                                ></path>
                                <path
                                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div class="w-full ">
                          <h6 class="text-sm text-red-500 font-bold cursor-pointer italic mt-0.5">
                            sản phẩm đã bị xóa khỏi hệ thống
                          </h6>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10  animate-spin fill-red-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                              data-original="#000000"
                            />
                          </svg>

                          <div class="flex gap-4 mt-4">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFavorite(product._id);
                              }}
                              class="ml-auto"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 fill-red-500 inline cursor-pointer"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                  data-original="#000000"
                                ></path>
                                <path
                                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex mt-[100px] justify-center w-full lg:before:h-[400px]">
            <h2 className="text-sm gap-6 flex flex-col items-center  italic text-red-500">
              Bạn chưa lưu sản phẩm nào!!! <BsBox2 size="50px" />
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
