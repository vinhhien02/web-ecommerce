import React, { useEffect, useState } from "react";
import { apiGetAllProductByAdmin, apiDeleteProduct } from "../../apis/product";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
const ManagerProduct = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const fetchGetAllProduct = async (query) => {
    moment.locale("vi");
    const rs = await apiGetAllProductByAdmin(query);
    setProducts(rs.data);
    setShowSearchResults(true);
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      fetchGetAllProduct("");
      setShowSearchResults(false);
    }
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    fetchGetAllProduct(query);
  };

  useEffect(() => {
    fetchGetAllProduct("");
  }, [query]);
  const handleDeleteProduct = async (_id) => {
    const rs = await apiDeleteProduct(_id);
    if (rs.status === true) {
      alert("Bạn muốn xóa sản phẩm này");
    }
    fetchGetAllProduct(query);
  };

  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-4 pb-2 pl-4 pr-6">
        <h2 className="text-title font-bold flex gap-4 items-center text-2xl">
          Quản lí Tất cả sản phẩm
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <form
              onSubmit={handleSearchButtonClick}
              className="bg-gray-100 flex px-6 rounded h-10  w-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-gray-400 mr-3  cursor-pointer"
                onClick={handleSearchButtonClick}
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="text"
                value={query}
                onChange={handleSearchInputChange}
                placeholder="Tìm kiếm sản phẩm"
                className="w-full outline-none bg-transparent text-[#333] text-sm"
              />
            </form>
          </ol>
        </nav>
      </div>
      <div className="font-[sans-serif] overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                Stt
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Tên bài viết
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Giá
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Trạng thái
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Người đăng
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Thời gian
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Chức năng
              </th>
            </tr>
          </thead>

          {(showSearchResults || (!showSearchResults && !query)) && (
            <tbody className="whitespace-nowrap">
              {products &&
                products.map((product, idx) => (
                  <tr
                    key={idx}
                    className={
                      product?.status === true ? "bg-white" : "bg-blue-50"
                    }
                  >
                    <td className="p-4 text-sm text-black">{idx + 1}</td>
                    <td
                      onClick={() => handleProductClick(product.slug)}
                      className="p-4 text-sm cursor-pointer text-black"
                    >
                      {product?.name}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {product.price.toLocaleString("vi-VN")}VND
                    </td>
                    <td className="p-4 text-sm text-black">
                      {product?.status === true ? "Còn hàng" : "Hết hàng"}
                    </td>
                    <td
                      onClick={() =>
                        navigate(`/profile/${product.createdBy._id}`)
                      }
                      className="p-4 text-sm cursor-pointer text-black"
                    >
                      {product?.createdBy?.userName}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {" "}
                      {moment(product.createdAt).fromNow()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="mr-4"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 fill-red-500 hover:fill-red-700"
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
          )}
        </table>
      </div>
    </div>
  );
};

export default ManagerProduct;
