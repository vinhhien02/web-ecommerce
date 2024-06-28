import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {
  apiDetailproduct,
  apiGetProductCategory,
  apiInterestedProduct,
} from "../../apis/product";
import { apiAddFavorite } from "../../apis/favorite";
import { Report } from "../../component/index";
import DOMPurify from "dompurify";
import Icon from "../../assets/image/icon.png";
import "moment/locale/vi";
import icons from "../../ultils/icon";
import moment from "moment";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "../../store/favorite/asynAction";
import path from "../../ultils/path";

import "moment/locale/vi";
const ProductDetailt = () => {
  const navigate = useNavigate();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    FiMapPin,
    MdOutlineAccessTime,
    CiHeart,
    CiWarning,
    HiOutlineCheckBadge,
  } = icons;
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setSelectedImageIndex(next);
      setProduct((prevProduct) => ({
        ...prevProduct,
        thumb: prevProduct.images[next],
      }));
    },
  };
  const settingsProducts = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: products?.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiDetailproduct(slug);
      setProduct(response.data);
      if (response?.data?.category?.slug) {
        fetchRelatedProducts(
          response?.data?.category?.slug,
          response?.data?._id
        );
      }
    };
    fetchProduct();
  }, [slug]);
  const handleFavoriteClick = async (productId) => {
    const respone = await apiAddFavorite({ productId });
    alert(respone.message);
    dispatch(getFavorite());
  };
  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  const fetchRelatedProducts = async (slug, currentProductId) => {
    const response = await apiGetProductCategory(slug);
    const filteredProducts = response.products.filter(
      (product) => product._id !== currentProductId
    );
    setProducts(filteredProducts);
  };

  const handleInterestedProduct = async (productId, reportedUserId) => {
    if (productId && reportedUserId) {
      const formInterested = {
        reportedUserId: reportedUserId,
        productId: productId,
        

      };
      const response = await apiInterestedProduct(formInterested);
      alert(response.message);
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };
  return (
    <div class="grid items-start grid-cols-1  ">
      <div class="p-4 lg:max-w-5xl max-w-lg mx-auto">
        <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12 ">
          <div class="w-full lg:sticky top-0 lg:flex lg:flex-col bg-white lg:rounded-lg lg: py-5 lg:px-5 ">
            <div className=" gap-2 border-b pb-4  flex flex-col">
              <div className="flex items-center gap-4 w-full  border-b">
                <span
                  onClick={handleReportClick}
                  className="inline-flex items-center border-box w-1/6 border mb-[2px] border-red-500 rounded-md gap-2  cursor-pointer     "
                >
                  <CiWarning color="red" />
                  <p className="text-[12px] text-red-500 italic"> Tố cáo</p>
                </span>
                <div className="relative w-max group  cursor-pointer ">
                  <span
                    onClick={() =>
                      handleInterestedProduct(
                        product._id,
                        product.createdBy._id
                      )
                    }
                    className="inline-flex items-center  border-box px-2 border border-green-500 rounded-md gap-2  cursor-pointer     "
                  >
                    <HiOutlineCheckBadge color="green" />
                    <p className="text-[12px] text-green-00 italic">Quan tâm</p>
                  </span>
                  <div class="absolute  hidden group-hover:block  text-green-500 font-semibold px-3 pt-[6px] text-[10px] italic right-[10px] left-0 mx-auto w-max -top-[26px] rounded before:w-4 before:h-4 before:rotate-45  before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-[10px] before:mx-auto">
                    <span className="flex items-center gap-1">
                      <CiWarning />
                      Người đăng sẽ nhận được thông báo này
                    </span>
                  </div>
                </div>
              </div>
              {showReport && (
                <Report
                  productId={product?._id}
                  showReport={showReport}
                  setShowReport={setShowReport}
                />
              )}
              <div className="flex justify-center ">
                <img
                  src={product?.thumb}
                  alt="Product"
                  class="w-4/5 rounded-md object-cover"
                />
              </div>
              <div class=" mt-3">
                <Slider {...settings}>
                  {product?.images?.map((el, index) => (
                    <div className="px-2" key={index}>
                      <img
                        src={el}
                        alt=""
                        className={`w-full cursor-pointer rounded-md ${
                          index === selectedImageIndex
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="px-5">
              <div class="mt-8 border-b pb-6">
                <h3 class="text-xl font-bold text-gray-800">{product?.name}</h3>
                <div className="flex items-center justify-between ">
                  <h2 className="font-bold text-red-500">
                    {product?.price.toLocaleString("vi-VN")} VND
                  </h2>
                  {isLoggedIn && current ? (
                    <button
                      onClick={(e) => {
                        handleFavoriteClick(product._id);
                      }}
                      type="button"
                      class="px-5 py-1.5 flex items-center  gap-1 rounded-md text-sm tracking-wider font-medium border border-red-700 outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
                    >
                      Lưu tin
                      <span>
                        <CiHeart size="20px" />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/${path.LOGIN}`)}
                      type="button"
                      class="px-5 py-1.5 flex items-center  gap-1 rounded-md text-sm tracking-wider font-medium border border-red-700 outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
                    >
                      Lưu tin
                      <span>
                        <CiHeart size="20px" />
                      </span>
                    </button>
                  )}
                </div>
                {product && product.quantity && (
                  <div class="space-y-3 list-disc mt-4  text-sm text-gray-800">
                    <h3 class="text-lg font-bold text-gray-800">Số Lượng</h3>

                    <div>{product?.quantity}</div>
                  </div>
                )}
                <div class="space-y-3 list-disc mt-4  text-sm text-gray-800">
                  <h3 class="text-lg font-bold text-gray-800">
                    Mô tả chi tiết
                  </h3>
                  {product?.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.description),
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white lg:px-10 lg: py-5  lg: rounded-lg flex flex-col items-center ">
            <div className="w-4/5 ">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="flex ">
                  <img
                    src={product?.createdBy?.imageUser}
                    class="w-14 h-14 object-cover rounded-full border-2 border-blue-600 p-0.5"
                  />

                  <p className="font-main ml-2  font-bold top-1">
                    {product?.createdBy?.userName}
                  </p>
                </div>

                {product?.createdBy?._id && (
                  <NavLink to={`/profile/${product.createdBy._id}`}>
                    <button
                      type="button"
                      className="px-3 float-right py-2.5 rounded-lg text-white text-sm  font-main border border-current outline-none bg-blue-600 "
                    >
                      Xem trang
                    </button>
                  </NavLink>
                )}
              </div>
              <div className="mt-4 space-y-4 ">
                <span className="flex items-center gap-3">
                  <FiMapPin />
                  {product?.createdBy?.address}
                </span>
                <p className=" flex items-center text-sm italic gap-3">
                  <MdOutlineAccessTime /> Đã đăng{" "}
                  {moment(product?.createdAt).fromNow()}
                </p>
              </div>
              <button
                type="button"
                class="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
              >
                0{product?.createdBy?.phone}
              </button>

              <div className=" mt-6">
                <img src={Icon} alt="" className="" />
                <p className="italic text-sm ">
                  Kiểm tra đầy đủ đủ thông tin rồi mới giao dịch bạn nhé !!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4  lg:max-w-5xl max-w-lg  mx-14">
        <div className="grid items-start grid-cols-1   p-5 ">
          <div className="w-full lg:sticky top-0 lg:flex lg:flex-col  rounded-lg   mx-5 ">
            <div className="bg-white px-5 py-5">
              <h2 class="text-xl px-3 font-main font-bold text-gray-800 mb-8">
                Sản phẩm tương tự
              </h2>
              {products?.length > 0 ? (
                <div className="grid grid-cols-1   gap-6">
                  <Slider {...settingsProducts}>
                    {products &&
                      products.map((product) => (
                        <div
                          key={product.slug}
                          class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:shadow-gray-600 hover:-translate-y-2  transition-all relative"
                        >
                          <div
                            onClick={() => handleProductClick(product.slug)}
                            className=""
                          >
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
                        </div>
                      ))}
                  </Slider>
                </div>
              ) : (
                <div className="text-red-500 px-5 py-5">
                  Rất tiếc không tìm thấy sản phẩm nào tương tự{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailt;
