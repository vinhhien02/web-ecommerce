import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../../component/index";
import { ProductContext } from "../../hook/ProductContex";
import { apiGetAllproduct } from "../../apis/product";
import { apiAddFavorite } from "../../apis/favorite";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { useSelector } from "react-redux";
import path from "../../ultils/path";
const Home = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { searchQuery } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    moment.locale("vi");
    const fetchProducts = async () => {
      const response = await apiGetAllproduct(searchQuery);
     
      setProducts(response.data);
    };
    fetchProducts();
  }, [searchQuery]);

  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };

  const handleFavoriteClick = async (productId) => {
    const response = await apiAddFavorite({ productId });
    alert(response.message);
  };

  return (
    <div className="w-main flex flex-col h-auto mt-6 gap-4">
      <div className="bg-white px-2">
        <Sidebar />
      </div>
      <div>
        <div className="font-sans bg-white px-2">
          <div className="py-2 mx-auto max-w-7xl sm:max-w-full">
            <h2 className="text-lg px-2 font-main font-bold text-gray-800 mb-4">
              Tất cả sản phẩm
            </h2>
            <div className="grid grid-cols-6 h-auto flex-wrap lg:grid-cols-4 gap-4">
              {products &&
                products.map((product) => (
                  <div
                    key={product.slug}
                    onClick={() => handleProductClick(product.slug)}
                    className="bg-gray-50 shadow-md rounded-lg cursor-pointer hover:shadow-gray-600 hover:-translate-y-1 transition-all relative p-2"
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        isLoggedIn && current?.email
                          ? handleFavoriteClick(product._id)
                          : navigate(`/${path.LOGIN}`);
                      }}
                      className="bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full absolute top-2 right-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 64 64"
                        className="fill-red-700"
                      >
                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                      </svg>
                    </div>

                    <div className="w-full h-[200px] overflow-hidden mx-auto aspect-w-16 aspect-h-9">
                      <img
                        src={product.thumb}
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-4 bg-white">
                      <h3 className="text-md font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <h4 className="text-sm text-red-600 font-bold mt-1">
                        {product.price.toLocaleString("vi-VN")} VND
                      </h4>

                      <div className="flex space-x-1 mt-2">
                        <img
                          src={
                            product?.createdBy?.imageUser &&
                            product.createdBy.imageUser
                          }
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-[#333] font-bold">
                            {product?.createdBy?.userName &&
                              product?.createdBy?.userName}
                          </p>
                          <p className="text-xs text-gray-500 italic mt-0.5">
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

export default Home;
