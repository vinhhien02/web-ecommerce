import React, { useEffect, useState } from "react";
import { apiGetProductCategory } from "../../apis/product";
import { apiAddFavorite } from "../../apis/favorite";
import { Sidebar } from "../../component/index";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
const ProductCategory = () => {
  const { slug } = useParams();
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    moment.locale("vi");
    const fetchProduct = async () => {
      const response = await apiGetProductCategory(slug);
      setProduct(response.products);
    };
    fetchProduct();
  }, [slug]);
  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };
  const handleFavoriteClick = async (productId) => {
    const respone = await apiAddFavorite({ productId });
    alert(respone.message);
  };
  return (
    <div className="w-main flex flex-col mt-6 gap-6">
      <div className="bg-white px-3">
        <Sidebar />
      </div>
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
                    onClick={() => handleProductClick(product.slug)}
                    class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:shadow-gray-600 hover:-translate-y-2  transition-all relative"
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

                    <div class="w-8/9 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
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
                        <img
                          src={product.createdBy.imageUser}
                          class="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p class="text-[15px] text-[#333] font-bold">
                            {product.createdBy.userName &&
                              product.createdBy.userName}
                          </p>
                          <p class="text-xs text-gray-500 mt-0.5">
                            {moment(product.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
