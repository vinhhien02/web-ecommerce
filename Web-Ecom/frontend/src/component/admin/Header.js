import React, { useState, useEffect } from "react";
import icons from "../../ultils/icon";
import path from "../../ultils/path";
import { useNavigate } from "react-router-dom";
import { apiGetAllReport, apiUpdateReport } from "../../apis/product";
const Header = () => {
  const [showNotifi, setShowNotifi] = useState(false);
  const navigate = useNavigate();
  const {
    IoMdNotificationsOutline,
    MdReportGmailerrorred,
    BiSupport,
    TbHomeStats,
  } = icons;
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    const rs = await apiGetAllReport();
    setReports(rs.getReport);
  };
  useEffect(() => {
    fetchReports();
  }, []);
  const viewedReportsCount = reports.filter(
    (report) => report.view === false
  ).length;
  const handleClick = async (id) => {
    await apiUpdateReport(id, { view: true });
    fetchReports();
  };
  const handleProductClick = (slug) => {
    navigate(`/productdetails/${slug}`);
  };
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };
  return (
    <div onMouseLeave={() => setShowNotifi(false)}>
      <header class="flex shadow-md py-4 px-4 sm:px-10w-full items-center bg-white font-sans min-h-[70px] tracking-wide relative z-50">
        <div class="flex flex-wrap lg:px-10 items-center justify-between gap-4 lg:w-main">
          <div
            onClick={() => navigate(`/${path.HOME}`)}
            class="lg:flex cursor-pointer lg:flex-col lg:items-center  "
          >
            <h1 className="text-3xl font-bold text-main italic">
              LH MarketPlace
            </h1>
            <p className="text-xxs text-black">CHỢ SINH VIÊN LH</p>
          </div>

          <div class="flex items-center max-lg:ml-auto gap-4  space-x-5">
            <div
              onClick={() => navigate(`/${path.HOME}`)}
              className="cursor-pointer hover:text-blue-600 flex items-center"
            >
              <span width="20px">
                <TbHomeStats size="1.4rem" />
              </span>
              <p>Trang chủ</p>
            </div>
            <div
              onMouseEnter={() => setShowNotifi(true)}
              onClick={() => setShowNotifi(!showNotifi)}
              className="relative inline-block   mr-10  "
            >
              <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-sm text-white">
                {viewedReportsCount}
              </div>
              <div>
                <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer" />
              </div>
            </div>

            {showNotifi && (
              <div className=" ">
                <ul class="absolute shadow-lg bg-white py-2 px-2 z-[1000] flex flex-col lg:top-14 gap-1  min-w-1/4 w-1/4 rounded right-[100px] max-h-96 overflow-auto">
                  {reports &&
                    reports.map((report) => (
                      <li
                        onClick={() => handleClick(report._id)}
                        key={report._id}
                        className={
                          report?.view === false
                            ? "py-2.5 px-4 hover:shadow-md bg-blue-300  text-black text-sm cursor-pointer"
                            : "py-2.5 px-4 hover:shadow-md bg-white  text-black text-sm cursor-pointer"
                        }
                      >
                        <div>
                          {report?.productId ? (
                            <span
                              class="flex items-center gap-2"
                              onClick={() =>
                                handleProductClick(report?.productId?.slug)
                              }
                            >
                              <MdReportGmailerrorred size="40px" color="red" />
                              {`${report?.userId?.userName} đã báo cáo bài viết ${report?.productId?.name} lí do: ${report?.reason} `}
                            </span>
                          ) : (
                            <span
                              onClick={() =>
                                handleUserClick(report?.userId?._id)
                              }
                              class="flex items-center gap-2"
                            >
                              <BiSupport size="40px" color="green" />
                              {`${report?.userId?.userName} đã  gửi một yêu cầu hỗ trợ : ${report?.reason} `}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
