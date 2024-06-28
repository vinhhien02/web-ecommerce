import React, { useEffect, useState } from "react";
import {
  apiGetProductCurrent,
  apiDeleteProduct,
  apiUpdateStatusProduct,
} from "../../apis/product";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import icons from "../../ultils/icon";
import { toast } from "react-toastify";

const HomeMember = () => {
  const [query, setQuery] = useState("");
  const { BsBox2 } = icons;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    moment.locale("vi");
    const response = await apiGetProductCurrent(query);
    if (response && response.products) {
      setProducts(response.products);
    }
    console.log("checkQuery", query);
  };
  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleSearch = () => {
    fetchProduct();
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleEditProduct = (slug) => {
    navigate(`/updateproduct/${slug}`);
  };

  const handleDeleteProduct = async (_id) => {
    const rs = await apiDeleteProduct(_id);
    if (rs.status === true) {
      toast.success(rs.message);
      fetchProduct();
    }
  };

  return (
    <div className=" p-4 bg-white  ">
      <div class=" flex flex-col w-full  right-0 gap-3 border-b  sm:flex-row sm:items-center px-4 sm:justify-between">
        <h2 class="text-title font-bold flex p-4 gap-4 items-center text-2xl">
          Quản lí bài đăng
        </h2>
        <nav>
          <ol class="flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              class="bg-gray-100 flex px-6 rounded h-10  w-full "
            >
              <svg
                type="submit"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                class="fill-gray-400 mr-3 rotate-90"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm"
                class="w-full outline-none bg-transparent text-[#333] text-sm"
              />
            </form>
          </ol>
        </nav>
      </div>

      <div class="font-[sans-serif] overflow-x-auto ">
        {products?.length > 0 ? (
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 whitespace-nowrap">
              <tr>
                <th class="p-4 text-left text-sm font-medium text-white">
                  Tên sản phẩm
                </th>
                <th class="p-4 text-left text-sm font-medium text-white">
                  Hình Ảnh
                </th>
                <th class="p-4 text-left text-sm font-medium text-white">
                  Giá{" "}
                </th>
                <th class="p-4 text-left text-sm font-medium text-white">
                  Trạng thái
                </th>
                <th class="p-4 text-left text-sm font-medium text-white">
                  Quản lí
                </th>
              </tr>
            </thead>

            <tbody class="whitespace-nowrap">
              {products &&
                products.map((product) => (
                  <tr
                    key={product.slug}
                    className={
                      product?.status === true
                        ? "bg-blue-50 border-b border "
                        : "bg-red-50 border-b border"
                    }
                  >
                    <td class="p-4 text-sm text-black">{product.name}</td>
                    <td class="p-4 text-sm text-black">
                      <img
                        src={product.thumb}
                        alt=""
                        class="w-14 h-14 rounded"
                      />
                    </td>
                    <td class="p-4 text-sm text-black">
                      {product.price.toLocaleString("vi-VN")}VND
                    </td>
                    <td class="p-4 text-sm text-black">
                     
                      {product?.status === true ? "Chưa Bán" : "Đã bán"}
                    </td>
                    <td class="p-4">
                      <button
                        onClick={() => handleEditProduct(product.slug)}
                        class="mr-4"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 fill-blue-500 hover:fill-blue-700"
                          viewBox="0 0 348.882 348.882"
                        >
                          <path
                            d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                            data-original="#000000"
                          />
                          <path
                            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        class="mr-4"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 fill-red-500 hover:fill-red-700"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          />
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center mt-[90px] w-full lg:before:h-[400px]">
            <h2 className="text-sm gap-6 flex flex-col items-center  italic text-red-500">
              Bạn chưa có sản phẩm nào!!! <BsBox2 size="50px" />
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeMember;
