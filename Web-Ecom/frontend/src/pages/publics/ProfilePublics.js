import React, { useEffect, useState } from "react";
import { apiGetDetailUserById } from "../../apis/user";
import { apiGetProductUser } from "../../apis/product";
import { useNavigate } from "react-router-dom";
import { apiAddFavorite } from "../../apis/favorite";
import moment from "moment";
import "moment/locale/vi";
import logoSold from "../../assets/image/LOGO_DABAN.png";
import { useParams } from "react-router-dom";
import icons from "../../ultils/icon";
import { useSelector } from "react-redux";
const ProfilePublics = () => {
  const { current } = useSelector((state) => state.user);
  const { _id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);

  const { FaPhoneVolume, FiMapPin } = icons;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiGetDetailUserById(_id);
      setCurrentUser(response.detailUser);
    };
    fetchUser();
  }, [_id]);
  useEffect(() => {
    moment.locale("vi");
    const fetchProduct = async () => {
      try {
        const response = await apiGetProductUser(_id);
        setProducts(response.products);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };
    fetchProduct();
  }, [_id]);
  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };
  const handleFavoriteClick = async (productId) => {
    const respone = await apiAddFavorite({ productId });
    alert(respone.message);
  };
  return (
    <div className="flex w-full gap-5 ">
      <div class="bg-white sticky max-h-[500px] w-2/7  mt-[25px] left-0 py-4  px-4 font-[sans-serif] flex flex-col overflow-auto">
        <div class="flex items-center justify-cente text-center flex-col">
          <img
            src={currentUser?.imageUser && currentUser.imageUser}
            class="w-28 h-28 rounded-full object-cover"
          />
          <div class="mt-5">
            <h4 class="text-lg text-black font-bold">
              {currentUser?.userName}
            </h4>
          </div>
          {current?.role === "manager" ||
            (current?.role === "admin" && (
              <div class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                <span>{currentUser?.email}</span>
              </div>
            ))}
        </div>
        <div class="mt-6 pl-6">
          <h6 class="text-blue-600 text-sm font-bold px-4">
            Thông tin cá nhân
          </h6>
          <ul class="mt-3">
            <li>
              <a
                href="javascript:void(0)"
                class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <FaPhoneVolume className="w-[18px] h-[18px] mr-4" />
                <span>0{currentUser?.phone}</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <FiMapPin className="w-[18px] h-[18px] mr-4" />
                <span>{currentUser?.address}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-4/5   gap-x-5 justify-center mt-6 bg-white ">
        <div>
          <div class="font-[sans-serif] bg-white px-3">
            <div class="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
              <h2 class="text-xl px-3 font-main font-bold text-gray-800 mb-8">
                Tất cả sản phẩm
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products &&
                  products.map((product) => (
                    <div
                      key={product.slug}
                      class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:shadow-gray-600 hover:-translate-y-2  transition-all relative"
                    >
                      {product.status === true && (
                        <div onClick={() => handleProductClick(product.slug)}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteClick(product._id);
                            }}
                            class="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16px"
                              class="fill-red-700 inline-block"
                              viewBox="0 0 64 64"
                            >
                              <path
                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </div>

                          <div class="w-8/9 h-[180px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                            <img
                              src={product.thumb}
                              alt="Product 1"
                              class="h-full w-full object-contain"
                            />
                          </div>

                          <div class="p-6 bg-white">
                            <h3 class="text-md font-bold text-gray-800">
                              {product.name}
                            </h3>
                            <h4 class="text-md text-red-600 font-bold mt-2">
                              {product.price.toLocaleString("vi-VN")} VND
                            </h4>

                            <div class="flex space-x-2 mt-4">
                              <div>
                                <p class="text-xs text-gray-500 mt-0.5">
                                  {moment(product.createdAt).fromNow()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {product.status === false && (
                        <div className="hover:bg-slate-300">
                          <div class=" w-20 h-20 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                            <img
                              src={logoSold}
                              className="logo-sold rounded-full"
                            />
                          </div>

                          <div class="w-8/9 h-[180px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                            <img
                              src={product.thumb}
                              alt="Product 1"
                              class="h-full w-full  object-contain hover:bg-slate-300"
                            />
                          </div>

                          <div class="p-6 bg-white hover:bg-slate-300">
                            <h3 class="text-md font-bold text-gray-800">
                              {product.name}
                            </h3>
                            <h4 class="text-md text-red-600 font-bold mt-2">
                              {product.price.toLocaleString("vi-VN")} VND
                            </h4>

                            <div class="flex space-x-2 mt-4">
                              <div>
                                <p class="text-xs text-gray-500 mt-0.5">
                                  {moment(product.createdAt).fromNow()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePublics;
