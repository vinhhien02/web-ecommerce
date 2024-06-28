import React, { useEffect, useState } from "react";
import {
  apiGetAllUser,
  apiUpdateByAdmin,
  apiDeleteUser,
} from "../../apis/user";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ManagerUser = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const fetchUser = async () => {
    const response = await apiGetAllUser(query);
    setUser(response.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUser();
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleSaveEdit = async () => {
    const rs = await apiUpdateByAdmin(editedUser._id, editedUser);
    if (rs.status === true) {
      toast.success(rs.message);
    }
    setUser(user.map((u) => (u._id === editedUser._id ? editedUser : u)));

    handleCancelEdit();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUser();
  }, [query]);

  const handleDeleteUser = async (_id) => {
    const rs = await apiDeleteUser(_id);
    if (rs.status === true) {
      alert(`Bạn chắc chắn muốn xóa người dùng này`);
      fetchUser();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-4 pb-2 pl-4 pr-6">
        <h2 className="text-title font-bold flex gap-4 items-center text-2xl">
          Quản lí người dùng
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="bg-gray-100 flex px-6 rounded h-10 w-full"
            >
              <svg
                type="submit"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="fill-gray-400 mr-3 "
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm người dùng"
                className="w-full outline-none bg-transparent text-[#333] text-sm"
              />
            </form>
          </ol>
        </nav>
      </div>
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="font-[sans-serif] overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Stt
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Tên
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Email
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Trạng thái
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Quyền
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Hình ảnh
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {user.map((el, idx) => (
                  <tr key={el._id} className="bg-blue-50">
                    <td className="p-4 text-sm text-black">{idx + 1}</td>
                    {editingUserId === el._id ? (
                      <>
                        <td className="p-4 text-sm  text-black">
                          {editedUser.userName}
                        </td>
                        <td className="p-4 text-sm text-black">
                          {editedUser.email}
                        </td>
                        <td className="p-4 text-sm text-black">
                          <select
                            name="status"
                            value={editedUser.status}
                            onChange={handleInputChange}
                            className="w-full outline-none bg-gray-100 text-black"
                          >
                            <option value="active">Mở</option>
                            <option value="pending">Khóa</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-black">
                          <select
                            name="role"
                            value={editedUser.role}
                            onChange={handleInputChange}
                            className="w-full outline-none bg-gray-100 text-black"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-black">
                          <img src={el.imageUser} alt="" className="size-10" />
                        </td>
                        <td className="p-4 gap-3 flex   ">
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            class="px-2 py-1 w-1/2 rounded text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            class="px-2 py-1 rounded w-1/2 text-sm tracking-wider font-medium border border-red-700 outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11px"
                              fill="currentColor"
                              class="inline"
                              viewBox="0 0 320.591 320.591"
                            >
                              <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                              />
                              <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                              />
                            </svg>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 cursor-pointer text-sm text-black">
                          <NavLink to={`/profile/${el._id}`}>
                            {el.userName}
                          </NavLink>
                        </td>
                        <td className="p-4 text-sm text-black">{el.email}</td>
                        <td>
                          <span
                            className={
                              el?.status === "active"
                                ? "w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs"
                                : "w-[68px] block text-center py-1 border border-red-500 text-red-600 rounded text-xs"
                            }
                          >
                            {el?.status === "active" ? "Đang Mở" : "Đang Khóa"}
                          </span>
                        </td>

                        <td className="p-4 text-sm text-black">{el.role}</td>
                        <td className="p-4 text-sm text-black">
                          <img src={el.imageUser} alt="" className="size-10" />
                        </td>
                        <td className="p-4">
                          <button
                            className="mr-4"
                            title="Edit"
                            onClick={() => handleEditClick(el)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 fill-blue-500 hover:fill-blue-700"
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
                            onClick={() => handleDeleteUser(el._id)}
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
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerUser;
